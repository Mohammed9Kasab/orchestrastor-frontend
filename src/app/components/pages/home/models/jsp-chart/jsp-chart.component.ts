import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/components/shared/chart-options.type';
import { IJob } from 'src/app/core/models/job.model';
import { IWorker } from 'src/app/core/models/worker.model';

@Component({
  selector: 'app-jsp-chart',
  templateUrl: './jsp-chart.component.html',
  styleUrls: ['./jsp-chart.component.css']
})
export class JspChartComponent implements OnInit {
  @Input() jobs !: IJob[] ;
  @Input() workers !: IWorker[] ;
  @Input() data: any; 
  @ViewChild("chartJSP") chartJSP: ChartComponent | undefined;
  public chartJSPOptions: Partial<ChartOptions> | any;
  constructor() {this.chartJSPOptions = {
    series: [],
    chart: {
      height: 450,
      type: "rangeBar"
    },
    plotOptions: {
      bar: {
        rangeBarGroupRows: true,
        horizontal: true,
        barHeight: "80%",
      }
    },
    xaxis: {
      type: "numeric",
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true
      }
    },
    fill: {
      type: "solid",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100]
      }
    },
    legend: {
      position: "top",
      horizontalAlign: "left"
    }
  }; }

  ngOnInit(): void {
    console.log()
    for (let job of this.jobs) {
      this.chartJSPOptions.series.push({name: job.name, data: []})
    }
    //JSP CHART
    for (let series of this.chartJSPOptions.series) {
      for (let row of this.data.jspOutput) {
        if (this.data.jspOutput.indexOf(row) == this.chartJSPOptions.series.indexOf(series)) {
          for (let element of row) {
            // @ts-ignore
            for (let worker of this.workers) {
              if (element[4] == worker.id) {
                series.data.push({x: worker.name, y: [element[2], element[3]]})
              }
            }
          }
        }
      }
    }
  }
}
