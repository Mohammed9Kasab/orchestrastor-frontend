import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/components/shared/chart-options.type';
import { IJob } from 'src/app/core/models/job.model';
import { IWorker } from 'src/app/core/models/worker.model';

@Component({
  selector: 'app-mmr-chart',
  templateUrl: './mmr-chart.component.html',
  styleUrls: ['./mmr-chart.component.css']
})
export class MmrChartComponent implements OnInit {
  @Input() jobs !: IJob[] ;
  
  @Input() workers !: IWorker[] ;
  
  @Input() data: any;

  @ViewChild("chartMMR") chartMMR: ChartComponent | undefined;
  
  public chartMMROptions: Partial<ChartOptions> | any;
  constructor() { this.chartMMROptions = {
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
      type: "gradient",
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
  };}

  ngOnInit(): void {
    for (let job of this.jobs) {
      this.chartMMROptions.series.push({name: job.name, data: []})
    }

    //MMR CHART
    for (let series of this.chartMMROptions.series) {
      for (let row of this.data.mmr_Output) {
        if (this.data.mmr_Output.indexOf(row) == this.chartMMROptions.series.indexOf(series)) {
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
