import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { ProjectServices } from '../../services/projectServices';
import { GoogleChartComponent } from './google-chart/google-chart.component';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { chart2 } from "./ng2Chart/chart2";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  data: any
  dataRes: any = []
  complete: any
  inprogress: any
  late: any

  chartLabel: any
  chartOptions: any
  type: any
  legend: any
  plugin: any
  pieChartData:any



  public pie_ChartData: any = [];

  public pie_ChartOptions = {
    title: 'H1. Tiến độ công việc',
    width: 600,
    height: 600
  };




  constructor(private projectServices: ProjectServices) {

  }

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

        this.complete = complete
        this.inprogress = inProgress
        this.late = late
        let tong, ptcom, ptinpro, ptlate
        tong = complete+ late + this.inprogress
        ptcom = ((complete/tong) * 100).toFixed(2) + '%'
        ptinpro = ((inProgress/tong) * 100).toFixed(2) + '%'
        ptlate = ((late/tong) * 100).toFixed(2) + '%'
        
        

        this.chartLabel = [
          ['Trễ hạn',ptlate],
          ['Hoàn thành',ptcom],
          ['Đang thi công',ptinpro],
        ]
        this.type = 'pie'

        this.chartOptions = {
          responsive: true,
        };
        this.pieChartData =[late,complete,inProgress]

        
        this.legend = true
        console.log(this.pieChartData);

        // Số dự án trễ
        this.sumLateProjects()
      })
      .catch(err => console.log(err))
  }

  lateItems: Array<any> = []
  message: String = ''
  // ="Không có dự án trễ hạn"
  sumLateProjects() {
    // có: trả về danh sách
    let lateItems = Object.assign([], this.data)
    lateItems = lateItems.filter((item: any) => item.state.indexOf('late') != -1)
    if (lateItems.length != 0) {
      return this.lateItems = lateItems
    }
    // Không: trả về dòng thông báo không có
    return this.message = "Không có dự án trễ hạn"
  }







}
