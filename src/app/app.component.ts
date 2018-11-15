import { Component } from '@angular/core';
import { FacebookService } from './services/facebook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private facebookService: FacebookService) {
    this.facebookService.init().subscribe((isCompleted) => {
      console.log(isCompleted);
    });
  }
  title = 'ng-facebook';
}
