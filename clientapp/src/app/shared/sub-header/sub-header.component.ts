import { Component } from '@angular/core';
import { sharedImports } from '../utilities/shared-imports';
import { materialImports } from '../utilities/material-imports';
import { TickerSearchComponent } from '../ticker-search/ticker-search.component';

@Component({
  selector: 'app-sub-header',
  standalone: true,
  imports: [...sharedImports, ...materialImports, TickerSearchComponent],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent {

}
