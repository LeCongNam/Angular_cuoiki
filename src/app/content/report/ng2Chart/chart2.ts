import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';

@Directive({
    selector: '[GoogleChart]'
})

export class chart2 implements OnInit {
    public pieChartOptions: ChartOptions = {
        responsive: true,
    };
  

    constructor() {
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
    }

    @Input('chartLabel')  public pieChartLabels: Label[] | any;
    @Input('chartOptions') public pieChartData: SingleDataSet | any;
    @Input('type')   public pieChartType: ChartType | any | undefined;
    @Input('legend')   public pieChartLegend :boolean | any | undefined;
    @Input('plugin')    public pieChartPlugins:any | undefined;

    ngOnInit() {

    }

}