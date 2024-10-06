import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StockTrackerService } from '../services/stock-tracker.service';
import { ISearchRequest } from '../shared/interfaces/search-request.interface';
import { IIntradayResponse } from '../shared/interfaces/common-interfaces';
import { forkJoin, Observable } from 'rxjs';
import { sharedImports } from '../shared/utilities/shared-imports';
import { materialImports } from '../shared/utilities/material-imports';
import { ChartConfiguration } from 'chart.js';
import { DateTime } from 'luxon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  imports: [...sharedImports, ...materialImports],
})
export class OverviewComponent implements OnInit, AfterViewInit {
  public chartsData: Array<ChartConfiguration['data']> = [];
  public chartOptions?: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: false },
    },
  };
  // private commonETFs: Array<string> = ['DIA', 'SPY', 'QQQ', 'IWM', 'SCHD', 'VTI'];
  private commonETFs: Array<string> = ["DIA"];

  constructor(
    private stockTrackerService: StockTrackerService,
    private snackbar: MatSnackBar,
  ) { }

  public ngOnInit() {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.getIntraday();
    });
  }

  private getIntraday(): void {
    const searchRequests: Array<Observable<IIntradayResponse>> = [];
    this.commonETFs.forEach((symbol) => {
      const request: ISearchRequest = { function: 'TIME_SERIES_INTRADAY', symbol: symbol, interval: '5min'};
      searchRequests.push(this.stockTrackerService.getTimeSeriesIntraday(request));
    });

    forkJoin(searchRequests).subscribe({
      next: (responses: Array<IIntradayResponse>) => {
        if (responses && !responses[0].hasOwnProperty('Information')) {
          console.log(responses);
          responses?.forEach((response) => {
            this.configureChart(response);
          });
        } else {
          this.snackbar.open('The request limit for Alpha Vantage API has been reached', 'DISMISS');
        }
      },
      error: (error) => {
        this.chartsData = [];
        this.snackbar.open('Something went wrong...', 'DISMISS', { duration: 3000 });
      },
    });
  }

  private configureChart(response: IIntradayResponse): void {
    let keys: Array<string> = [];
    const data: Array<number> = [];

    if (response) {
      keys = Object.keys(response['Time Series (5min)']);
      keys.forEach((key) => {
        data.push(+response['Time Series (5min)'][key]['1. open']);
      });

      keys = this.formatDates(keys);
    }
    
    this.chartsData.push({
      labels: [...keys],
      datasets: [
        {
          data: [...data],
          label: '',
          borderColor: '#ffffff',
          fill: false,
        }
      ],
    });
  }

  private formatDates(dates: Array<string>): Array<string> {
    const sortedDates = dates.sort((a, b) => {
      const dateA = DateTime.fromFormat(a, 'yyyy-MM-dd HH:mm:ss');
      const dateB = DateTime.fromFormat(b, 'yyyy-MM-dd HH:mm:ss');
      return dateA.toMillis() - dateB.toMillis();
    });

    return sortedDates.map((date) => {
      const newDate = DateTime.fromFormat(date, 'yyyy-MM-dd HH:mm:ss', { zone: 'UTC' }).setZone('local');
      return newDate.toFormat('MM/dd/yyyy hh:mm a');
    })
  }

}
