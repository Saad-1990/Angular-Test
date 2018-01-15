import { Component } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data: Array<any>;

  constructor(private _testServer : TestService){

    // Access the Data Service's getUsers() method we defined
      _testServer.getData().subscribe(res => this.data = res);
  }
}
