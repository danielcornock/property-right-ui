import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/api/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public properties;
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.get('properties').subscribe(data => {
      console.log(data);
      this.properties = data.data.properties;
    });
  }
}
