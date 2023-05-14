import { ApexAxisChartSeries, ApexChart, ApexFill, ApexLegend, ApexPlotOptions, ApexXAxis } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | undefined;
  chart: ApexChart | undefined;
  fill: ApexFill | undefined;
  legend: ApexLegend | undefined;
  xaxis: ApexXAxis | undefined;
  plotOptions: ApexPlotOptions | undefined;

};