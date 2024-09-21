import { Component, OnInit } from '@angular/core';
import { StockTrackerService } from 'src/app/services/stock-tracker.service';
import { ITickerRequest } from './shared/interfaces/ticker-request.interface';
import { IMatches } from './shared/interfaces/ticker.interface';
import { RouterOutlet } from '@angular/router';
import { sharedImports } from './shared/utilities/shared-imports';
import { materialImports } from './shared/utilities/material-imports';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, ...sharedImports, ...materialImports],
})
export class AppComponent implements OnInit {

  constructor(
    private stockTrackerService: StockTrackerService,
    private matIconReg: MatIconRegistry,
  ) { }

  public ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }

  public search(): void {
    const element = document.getElementById('input') as any;
    const request: ITickerRequest = { function: 'SYMBOL_SEARCH', keywords: element.value };
    this.stockTrackerService.getTicker(request).subscribe((matches: IMatches) => {
      console.log(matches.bestMatches[0]["1. symbol"]);
    });
  }
}
