import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { sharedImports } from './shared/utilities/shared-imports';
import { materialImports } from './shared/utilities/material-imports';
import { MatIconRegistry } from '@angular/material/icon';
import { SubHeaderComponent } from './shared/sub-header/sub-header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ...sharedImports, ...materialImports, SubHeaderComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private matIconReg: MatIconRegistry) { }

  public ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }
}
