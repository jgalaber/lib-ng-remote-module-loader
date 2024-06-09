import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'remote-loader',
  template: '<router-outlet></router-outlet>',
  imports: [RouterModule],
})
export class RouterInitializerComponent {}
