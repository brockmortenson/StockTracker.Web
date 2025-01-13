import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { take } from 'rxjs';
import { StockTrackerService } from 'src/app/services/stock-tracker.service';
import { IIntradayResponse } from 'src/app/shared/interfaces/common-interfaces';
import { ISearchRequest } from 'src/app/shared/interfaces/search-request.interface';
import { materialImports } from 'src/app/shared/utilities/material-imports';
import { sharedImports } from 'src/app/shared/utilities/shared-imports';
import { DefaultChartOptions } from 'src/app/shared/interfaces/common-interfaces';

@Component({
  selector: 'app-ticker-summary',
  standalone: true,
  templateUrl: './ticker-summary.component.html',
  styleUrls: ['./ticker-summary.component.scss'],
  imports: [...sharedImports, ...materialImports],
})
export class TickerSummaryComponent implements OnInit {
  public symbol: string = '';
  public chartData?: ChartConfiguration['data'] | null = null;
  public defaultChartOptions = DefaultChartOptions;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockTrackerService: StockTrackerService,
    private snackbar: MatSnackBar,
  ) {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      this.symbol = params['ticker'];
      this.getIntraday();
    });
  }

  public ngOnInit() {
  }

  private getIntraday(): void {
    const request: ISearchRequest = { function: 'TIME_SERIES_INTRADAY', symbol: this.symbol, interval: '5min'};
    this.stockTrackerService.getTimeSeriesIntraday(request).subscribe({
      next: (response: IIntradayResponse) => {
        if (response.hasOwnProperty('Information')) {
          this.snackbar.open(`Alpha Vantage API's daily request limit of 25 has been reached`, 'DISMISS');
          return;
        }
        if (response) {
          this.chartData = this.stockTrackerService.configureChart(response);
        }
      },
      error: (err) => {
        this.chartData = null;
        this.snackbar.open('Something went wrong...', 'DISMISS', { duration: 3000 });
      },
    })
  }

}
