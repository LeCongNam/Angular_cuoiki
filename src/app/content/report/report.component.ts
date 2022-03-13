import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { ProjectServices } from '../../services/projectServices';
import { GoogleChartComponent } from './google-chart/google-chart.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  data: any
  dataRes: any = []

  public pie_ChartData:any = [];

  public pie_ChartOptions  = {
    title: 'H1. Tiến độ công việc',
    width: 600,
    height: 600
  };


  constructor(private projectServices: ProjectServices) { }

  ngOnInit(): void {
    this.loadProject()

  }


  loadProject() {
    this.projectServices.getProject({})
      .then((res: any) => {
        this.data = res
        // tổng: trễ hạn, đang làm, hoàn thành
        var complete = this.data.reduce((total: number, item: { state: string; }) => {
          if (item.state == 'complete') {
            return total += 1
          }
          return total

        }, 0)
        var inProgress = this.data.reduce((total: number, item: { state: string; }) => {
          if (item.state.lastIndexOf('in progress') != -1) {
            return total += 1
          }
          return total

        }, 0)
        var late = this.data.reduce((total: number, item: { state: string; }) => {
          if (item.state.lastIndexOf('late') != -1) {
            return total += 1
          }
          return total

        }, 0)

        this.dataRes = [
          ["Tình trạng", "Total"],
          ['hoàn thành', complete],
          ['Đang thi công', inProgress],
          ['trễ', late],
        ]
        this.dataRes.map((item:any)=>this.pie_ChartData.push(item))
       
      })
      
      .catch(err => console.log(err))
  }






}