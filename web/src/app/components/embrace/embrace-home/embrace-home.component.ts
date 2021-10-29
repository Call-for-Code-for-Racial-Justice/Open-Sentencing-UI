import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-embrace-home',
  templateUrl: './embrace-home.component.html',
  styleUrls: ['./embrace-home.component.scss']
})
export class EmbraceHomeComponent implements OnInit {
  //mockData
  insights:boolean;
  sentencing:boolean;
  constructor() {
  
   }

  ngOnInit() {
    this.showInsights();
    this.showSentencing();
  }

  showInsights() {
    this.insights = true;
    this.sentencing = false;
    
  }
  showSentencing() {
    this.insights = false;
    this.sentencing = true;
 
  }
}
