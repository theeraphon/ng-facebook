import { Component } from '@angular/core';
import { FacebookService, ApiMethod } from './services/facebook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private facebookService: FacebookService) {

    this.facebookService.init(true).subscribe((isCompleted) => {
      console.log(isCompleted);
      this.facebookService.getLoginStatus().subscribe((response) => {
        console.log(response);
        this.facebookService.getUserPicture().subscribe((res) => {
          console.log(res);
        });
      });
    });
  }
  title = 'ng-facebook';
}
