import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { sharedImports } from './shared/utilities/shared-imports';
import { materialImports } from './shared/utilities/material-imports';
import { MatIconRegistry } from '@angular/material/icon';
import { SubHeaderComponent } from './shared/sub-header/sub-header.component';
import { CurrentsService } from './services/currents.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ...sharedImports, ...materialImports, SubHeaderComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isLoading: boolean = false;
  
  private readonly subscriptions: Subscription = new Subscription();

  constructor(
    private currentsService: CurrentsService,
    private matIconReg: MatIconRegistry,
  ) { }

  public ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');

    this.subscriptions.add(this.currentsService.getIsLoading().subscribe((bool) => {
      this.isLoading = bool;
    }));
  }
}
