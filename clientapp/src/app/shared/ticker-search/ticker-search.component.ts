import { StockTrackerService } from 'src/app/services/stock-tracker.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { sharedImports } from '../utilities/shared-imports';
import { materialImports } from '../utilities/material-imports';
import { ISearchRequest } from '../interfaces/search-request.interface';
import { IMatches, ITicker } from '../interfaces/common-interfaces';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticker-search',
  standalone: true,
  imports: [...sharedImports, ...materialImports],
  templateUrl: './ticker-search.component.html',
  styleUrl: './ticker-search.component.scss',
  encapsulation: ViewEncapsulation.None,
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

  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public search(): void {
    if (this.searchControl.value) {
      const request: ISearchRequest = { function: 'SYMBOL_SEARCH', keywords: this.searchControl.value as string };
      this.subscriptions.add(this.stockTrackerService.getTicker(request).subscribe({
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
  }

  public setCurrentTicker(ticker: ITicker): void {
    console.log(ticker);
  }
}
