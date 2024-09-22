import { StockTrackerService } from 'src/app/services/stock-tracker.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { sharedImports } from '../utilities/shared-imports';
import { materialImports } from '../utilities/material-imports';
import { ITickerRequest } from '../interfaces/ticker-request.interface';
import { IMatches, ITicker } from '../interfaces/common-interfaces';
import { FormControl } from '@angular/forms';
import { debounceTime, Subscription, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticker-search',
  standalone: true,
  imports: [...sharedImports, ...materialImports],
  templateUrl: './ticker-search.component.html',
  styleUrl: './ticker-search.component.scss'
})
export class TickerSearchComponent implements OnInit, OnDestroy {
  public searchControl = new FormControl<string>('');
  public bestMatches: Array<ITicker> = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private stockTrackerService: StockTrackerService,
    private snackbar: MatSnackBar,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.add(this.searchControl.valueChanges.pipe(
      debounceTime(400),
      switchMap((value) => {
        const request: ITickerRequest = { function: 'SYMBOL_SEARCH', keywords: value as string };
        return this.stockTrackerService.getTicker(request);
      }),
    ).subscribe({
      next: (matches: IMatches) => {
        if (matches !== null && matches?.bestMatches?.length) {
          console.log(matches);
          this.bestMatches = matches.bestMatches;
        }

        if (matches.hasOwnProperty('Information')) {
          this.snackbar.open('The request limit for Alpha Vantage API has been reached', 'DISMISS');
        }
      },
      error: (error) => {
        this.snackbar.open('An unknown error occurred', "DISMISS", { duration: 3000 });
        this.bestMatches = [];
      },
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public searchTicker(ticker: ITicker): void {
    console.log(ticker);
  }
}
