import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StockTrackerService } from '../../services/stock-tracker.service';
import { ISearchRequest } from '../../shared/interfaces/search-request.interface';
import { IGlobalQuote, ITickerSummary } from '../../shared/interfaces/common-interfaces';
import { forkJoin, Observable } from 'rxjs';
import { sharedImports } from '../../shared/utilities/shared-imports';
import { materialImports } from '../../shared/utilities/material-imports';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  imports: [...sharedImports, ...materialImports],
})
export class OverviewComponent implements OnInit, AfterViewInit {
  public currentETFs: Array<IGlobalQuote> = [];
  public currentETFsSummaries: Array<ITickerSummary> = [];

  private commonETFs: Array<string> = ['DIA', 'SPY', 'QQQ', 'IWM', 'SCHD', 'VTI'];

  constructor(
    private stockTrackerService: StockTrackerService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) { }

  public ngOnInit() {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.getGlobalQuotes();
    });
  }

  public openETF(ticker: string): void {
    this.router.navigate([`/summary/${ticker}`]);
  }

  private shuffleETFs(): Array<string> {
    const shuffled = this.commonETFs.sort(() => 0.5 - Math.random());
    // return shuffled.slice(0, 1);
    return shuffled.slice();
  }

  private getGlobalQuotes(): void {
    const shuffledETFs = this.shuffleETFs();
    const searchRequests: Array<Observable<IGlobalQuote>> = [];
    shuffledETFs.forEach((symbol) => {
      const request: ISearchRequest = { function: 'GLOBAL_QUOTE', symbol: symbol};
      searchRequests.push(this.stockTrackerService.getGlobalQuote(request));
    });

    if (this.mockData && this.mockData.length) {
      this.currentETFs = this.mockData;
          this.currentETFsSummaries = this.mockData.map((response) => {
            const quote = response['Global Quote'];
            const open = +quote['02. open'];
            const high = +quote['03. high'];
            const low  = +quote['04. low'];
            const price = +quote['05. price'];
            const previousClose = +quote['08. previous close'];
            const change = +quote['09. change'];
            const summary: ITickerSummary = {
                symbol: quote['01. symbol'],
                open: +open.toFixed(2),
                high: +high.toFixed(2),
                low: +low.toFixed(2),
                price: +price.toFixed(2),
                volume: +quote['06. volume'],
                latestTradingDay: quote['07. latest trading day'],
                previousClose: +previousClose.toFixed(2),
                change: +change.toFixed(2),
                changePercent: quote['10. change percent'],
            };
            return summary;
          });
    }

    // forkJoin(searchRequests).subscribe({
    //   next: (responses: Array<IGlobalQuote>) => {
    //     console.log(responses);
    //     if (responses[0].hasOwnProperty('Information')) {
    //       this.snackbar.open(`Alpha Vantage API's daily request limit of 25 has been reached`, 'DISMISS');
    //       return;
    //     }

    //     if (responses && responses.length) {
    //       this.currentETFs = responses;
    //       this.currentETFsSummaries = responses.map((response) => {
    //         const quote = response['Global Quote'];
    //         const open = +quote['02. open'];
    //         const high = +quote['03. high'];
    //         const low  = +quote['04. low'];
    //         const price = +quote['05. price'];
    //         const previousClose = +quote['08. previous close'];
    //         const change = +quote['09. change'];
    //         const summary: ITickerSummary = {
    //             symbol: quote['01. symbol'],
    //             open: +open.toFixed(2),
    //             high: +high.toFixed(2),
    //             low: +low.toFixed(2),
    //             price: +price.toFixed(2),
    //             volume: +quote['06. volume'],
    //             latestTradingDay: quote['07. latest trading day'],
    //             previousClose: +previousClose.toFixed(2),
    //             change: +change.toFixed(2),
    //             changePercent: quote['10. change percent'],
    //         };
    //         return summary;
    //       });
    //     }
    //   },
    //   error: (error) => {
    //     this.snackbar.open('Something went wrong...', 'DISMISS', { duration: 3000 });
    //   },
    // });
  }

  // use this instead of using api calls
  public mockData: Array<IGlobalQuote> = [
    {
        "Global Quote": {
            "01. symbol": "IBM",
            "02. open": "218.0000",
            "03. high": "218.1250",
            "04. low": "214.6100",
            "05. price": "217.7500",
            "06. volume": "3484824",
            "07. latest trading day": "2025-01-14",
            "08. previous close": "217.4000",
            "09. change": "0.3500",
            "10. change percent": "0.1610%"
        },
    },
    {
        "Global Quote": {
            "01. symbol": "CRWD",
            "02. open": "218.0000",
            "03. high": "218.1250",
            "04. low": "214.6100",
            "05. price": "217.7500",
            "06. volume": "3484824",
            "07. latest trading day": "2025-01-14",
            "08. previous close": "217.4000",
            "09. change": "0.3500",
            "10. change percent": "0.1610%"
        },
    },
    {
        "Global Quote": {
            "01. symbol": "APLD",
            "02. open": "218.0000",
            "03. high": "218.1250",
            "04. low": "214.6100",
            "05. price": "217.7500",
            "06. volume": "3484824",
            "07. latest trading day": "2025-01-14",
            "08. previous close": "217.4000",
            "09. change": "0.3500",
            "10. change percent": "0.1610%"
        },
    },
    {
        "Global Quote": {
            "01. symbol": "SP500",
            "02. open": "218.0000",
            "03. high": "218.1250",
            "04. low": "214.6100",
            "05. price": "217.7500",
            "06. volume": "3484824",
            "07. latest trading day": "2025-01-14",
            "08. previous close": "217.4000",
            "09. change": "0.3500",
            "10. change percent": "0.1610%"
        },
    },
    {
        "Global Quote": {
            "01. symbol": "SPY",
            "02. open": "218.0000",
            "03. high": "218.1250",
            "04. low": "214.6100",
            "05. price": "217.7500",
            "06. volume": "3484824",
            "07. latest trading day": "2025-01-14",
            "08. previous close": "217.4000",
            "09. change": "0.3500",
            "10. change percent": "0.1610%"
        },
    },
    {
        "Global Quote": {
            "01. symbol": "VTI",
            "02. open": "218.0000",
            "03. high": "218.1250",
            "04. low": "214.6100",
            "05. price": "217.7500",
            "06. volume": "3484824",
            "07. latest trading day": "2025-01-14",
            "08. previous close": "217.4000",
            "09. change": "0.3500",
            "10. change percent": "0.1610%"
        },
    },
  ];

}
