import { Component, OnInit } from '@angular/core';
import { StockTrackerService } from 'src/app/services/stock-tracker.service';
import { ITickerRequest } from './shared/interfaces/ticker-request.interface';
import { IMatches } from './shared/interfaces/ticker.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'clientapp';
  constructor(private stockTrackerService: StockTrackerService) { }

  public ngOnInit(): void {
    // this.stockTrackerService.getTicker().subscribe((x) => {
    //   console.log(x);
    // });
  }

  public search(): void {
    const element = document.getElementById('input') as any;
    const request: ITickerRequest = { function: 'SYMBOL_SEARCH', keywords: element.value };
    this.stockTrackerService.getTicker(request).subscribe((matches: IMatches) => {
      console.log(matches.bestMatches[0]["1. symbol"]);
    });
  }
}
