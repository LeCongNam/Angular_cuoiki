import {Directive,ElementRef,Input,OnInit} from '@angular/core';

declare var google:any;
@Directive({
  selector: '[GoogleChart]'
})
export class GoogleChartComponent implements OnInit {
  public _element:any;
  @Input('chartType') public chartType:string|any | undefined;
  @Input('chartOptions') public chartOptions: Object|any | undefined;
  @Input('chartData') public chartData: Object |any| undefined;
  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }
  ngOnInit() {
    setTimeout(() =>{
      google.charts.load('current', {'packages':['corechart']});
        setTimeout(() =>{
          this.drawGraph(this.chartOptions,this.chartType,this.chartData,this._element)
        },1000);
      },1000);
  }
  drawGraph (chartOptions: Object,chartType: string,chartData: Object,ele: { id: any; }) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var wrapper;
      wrapper = new google.visualization.ChartWrapper({
        chartType: chartType,
        dataTable:chartData ,
        options:chartOptions || {},
        containerId: ele.id
      });
      wrapper.draw();
    }
  }
}``