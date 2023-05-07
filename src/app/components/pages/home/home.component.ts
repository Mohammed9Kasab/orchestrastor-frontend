import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HomeService} from "./home.service";
import {Account} from "../../../authentication/account.model";
import {AccountService} from "../../../authentication/service/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITask, Task} from "../../../core/models/task.model";
import {IJob, Job} from "../../../core/models/job.model";
import {IWorker, Worker} from "../../../core/models/worker.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskService} from "../../../core/services/task.service";
import {WorkerService} from "../../../core/services/worker.service";
import {JobService} from "../../../core/services/job.service";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {finalize} from "rxjs/operators";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | undefined;
  chart: ApexChart | undefined;
  fill: ApexFill | undefined;
  legend: ApexLegend | undefined;
  xaxis: ApexXAxis | undefined;
  plotOptions: ApexPlotOptions | undefined;
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;
  @ViewChild("chartFCFS") chartFCFS: ChartComponent | undefined;
  public chartFCFSOptions: Partial<ChartOptions> | any;
  @ViewChild("chartFCFS") chartMMR: ChartComponent | undefined;
  public chartMMROptions: Partial<ChartOptions> | any;
  result: any
  @ViewChild('AddJobModal', {static: false})
  AddJobModal!: TemplateRef<any>;
  @ViewChild('AddTaskModal', {static: false})
  AddTaskModal!: TemplateRef<any>;
  @ViewChild('AddWorkerModal', {static: false})
  AddWorkerModal!: TemplateRef<any>;
  addTask!: FormGroup;
  addJob!: FormGroup;
  addWorker!: FormGroup;
  knowingNumberOfWorker!: FormGroup;
  taskModalRef: any
  jobModalRef: any
  workerModalRef: any
  tasks: ITask[] | null = []
  jobs: IJob[] | null = []
  workers: IWorker[] | null = []
  isSaving = false;
  success = false
  successUpdate = false
  unique = false;
  job: IJob | null | undefined
  isDataSent = false

  constructor(private modalService: NgbModal, private taskService: TaskService, private workerService: WorkerService,
              private jobService: JobService) {
  }

  ngOnInit(): void {
    this.chartOptions = {
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
    };
    this.chartFCFSOptions = {
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
    };
    this.chartMMROptions = {
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
    };
    this.addTask = new FormGroup({
      task_id: new FormControl(),
      task_worker: new FormControl('', [Validators.required]),
      task_job: new FormControl('', [Validators.required]),
      task_duration: new FormControl('', [Validators.required]),
    });
    this.addWorker = new FormGroup({
      worker_id: new FormControl(),
      worker_name: new FormControl('', [Validators.required]),
    });
    this.addJob = new FormGroup({
      job_id: new FormControl(),
      job_name: new FormControl('', [Validators.required]),
    });
    this.knowingNumberOfWorker = new FormGroup({
      total_worker: new FormControl('', [Validators.required]),
      total_jobs: new FormControl('', [Validators.required]),
    });
    this.workerService.query().subscribe(data => {
      this.workers = data.body

    })
    this.jobService.query().subscribe(data => {
      this.jobs = data.body
    })
    this.taskService.query().subscribe(data => {
      this.tasks = data.body
    })

  }

  openJobModal(job: IJob | null) {
    this.jobModalRef = this.modalService.open(this.AddJobModal, {
      centered: true,
      backdrop: 'static',
      size: 'sm'
    })
    if (job != null) {
      this.updateJobForm(job);
    }
  }

  openWorkerModal(worker: IWorker | null) {
    this.workerModalRef = this.modalService.open(this.AddWorkerModal, {
      centered: true,
      backdrop: 'static',
      size: 'sm'
    })
    if (worker != null) {
      this.updateWorkerForm(worker);
    }
  }

  openTaskModal(task: ITask | null, job: IJob) {
    this.job = job;
    this.taskModalRef = this.modalService.open(this.AddTaskModal, {
      centered: true,
      backdrop: 'static',
      size: 'sm',
    })
    if (task != null) {
      this.updateTaskForm(task);
    }
  }

  protected updateTaskForm(task: ITask): void {
    this.addTask?.patchValue({
      task_id: task.id,
      task_worker: task.worker,
      task_job: task.job,
      task_duration: task.duration,
    });
  }

  protected updateWorkerForm(worker: IWorker): void {
    this.addWorker?.patchValue({
      worker_id: worker.id,
      worker_name: worker.name,
    });
  }

  protected updateJobForm(job: IJob): void {
    this.addJob?.patchValue({
      job_id: job.id,
      job_name: job.name,
    });
  }

  closeTaskModal() {
    this.taskModalRef.close();
    this.ngOnInit();
  }

  closeJobModal() {
    this.jobModalRef.close();
    this.ngOnInit();
  }

  closeWorkerModal() {
    this.workerModalRef.close();
    this.ngOnInit();
  }

  saveTask() {
    const task = this.createFromFormTask();
    if (task.id !== null) {
      this.subscribeToSaveResponseTask(this.taskService.update(task), 'update');
    } else {
      this.subscribeToSaveResponseTask(this.taskService.create(task), 'create');
    }
  }

  protected createFromFormTask(): ITask {
    return {
      ...new Task(),
      id: this.addTask?.get(['task_id'])!.value,
      worker: this.addTask?.get(['task_worker'])!.value,
      job: this.job,
      duration: this.addTask?.get(['task_duration'])!.value,
    };
  }

  protected subscribeToSaveResponseTask(result: Observable<HttpResponse<ITask>>, value: string): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => {
        if (value === 'create') {
          this.onSaveSuccessTask()
        }
        if (value === 'update') {
          this.onSaveSuccessUpdateTask()
        }
      },
      error: () => this.onSaveErrorTask(),
    });
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected onSaveSuccessTask(): void {
    this.success = true;
    setTimeout(() => {
      this.success = false;
      this.modalService.dismissAll()
      this.addTask?.reset()
      this.taskService.query().subscribe(data => {
        this.tasks = data.body
      })
    }, 2500)
  }

  protected onSaveSuccessUpdateTask(): void {
    this.successUpdate = true;
    setTimeout(() => {
      this.successUpdate = false;
      this.modalService.dismissAll()
      this.addTask?.reset()
      this.taskService.query().subscribe(data => {
        this.tasks = data.body
      })
    }, 2500)
  }

  protected onSaveErrorTask(): void {
    this.unique = true;
    setTimeout(() => {
      this.unique = false;
    }, 2500)
  }

  saveWorker(): void {
    this.isSaving = true;
    const worker = this.createFromFormWorker();

    if (worker.id !== null) {
      this.subscribeToSaveWorkerResponse(this.workerService.update(worker), 'update');
    } else {
      this.subscribeToSaveWorkerResponse(this.workerService.create(worker), 'create');
    }
  }

  protected createFromFormWorker(): IWorker {
    return {
      ...new Worker(),
      id: this.addWorker?.get(['worker_id'])?.value,
      name: this.addWorker?.get(['worker_name'])?.value,

    };
  }

  protected subscribeToSaveWorkerResponse(result: Observable<HttpResponse<IWorker>>, value: string): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => {
        if (value === 'create') {
          this.onSaveWorkerSuccess()
        }
        if (value === 'update') {
          this.onSaveWorkerSuccessUpdate()
        }
      },
      error: () => this.onSaveWorkerError(),
    });
  }

  protected onSaveWorkerSuccess(): void {
    this.success = true;
    setTimeout(() => {
      this.success = false;
      this.modalService.dismissAll()
      this.addWorker?.reset()
      this.workerService.query().subscribe(data => {
        this.workers = data.body

      })
    }, 2500)
  }

  protected onSaveWorkerSuccessUpdate(): void {
    this.successUpdate = true;
    setTimeout(() => {
      this.successUpdate = false;
      this.modalService.dismissAll()
      this.addWorker?.reset()
      this.workerService.query().subscribe(data => {
        this.workers = data.body

      })
    }, 2500)
  }

  protected onSaveWorkerError(): void {
    this.unique = true;
    setTimeout(() => {
      this.unique = false;
    }, 2500)
  }

  saveJob(): void {
    const job = this.createFromFormJobr();
    if (job.id !== null) {
      this.subscribeToSaveJobResponse(this.jobService.update(job), 'update');
    } else {
      this.subscribeToSaveJobResponse(this.jobService.create(job), 'create');
    }
  }

  protected createFromFormJobr(): IJob {
    return {
      ...new Job(),
      id: this.addJob?.get(['job_id'])?.value,
      name: this.addJob?.get(['job_name'])?.value,

    };
  }

  protected subscribeToSaveJobResponse(result: Observable<HttpResponse<IJob>>, value: string): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => {
        if (value === 'create') {
          this.onSaveJobSuccess()
        }
        if (value === 'update') {
          this.onSaveJobSuccessUpdate()
        }
      },
      error: () => this.onSaveJobError(),
    });
  }

  protected onSaveJobSuccess(): void {
    this.success = true;
    setTimeout(() => {
      this.success = false;
      this.modalService.dismissAll()
      this.addJob?.reset()
      this.jobService.query().subscribe(data => {
        this.jobs = data.body
      })
    }, 2500)
  }

  protected onSaveJobSuccessUpdate(): void {
    this.successUpdate = true;
    setTimeout(() => {
      this.successUpdate = false;
      this.modalService.dismissAll()
      this.addJob?.reset()
      this.jobService.query().subscribe(data => {
        this.jobs = data.body
      })
    }, 2500)
  }

  protected onSaveJobError(): void {
    this.unique = true;
    setTimeout(() => {
      this.unique = false;
    }, 2500)
  }

  deleteWorker(worker: IWorker): void {
    this.workerService.delete(worker.id).subscribe()
    this.workerService.query().subscribe(data => {
      this.workers = data.body
    })
  }

  deleteJob(job: IJob): void {
    this.jobService.delete(job.id).subscribe()
    this.jobService.query().subscribe(data => {
      this.jobs = data.body
    })
  }

  deleteTask(task: ITask): void {
    this.taskService.delete(task.id).subscribe()
    this.taskService.query().subscribe(data => {
      this.tasks = data.body
    })
  }

  checkingNumberOfWorker() {
    // @ts-ignore
    if (this.workers?.length < this.knowingNumberOfWorker?.get(['total_worker'])?.value) {
      return true
    } else {
      return false
    }
  }

  checkingNumberOfJob() {
    // @ts-ignore
    if (this.jobs?.length < this.knowingNumberOfWorker?.get(['total_jobs'])?.value) {
      return true
    } else {
      return false
    }
  }

  filterTasks(job: IJob) {
    let filteredTasks = this.tasks?.filter(task =>
      JSON.stringify(task.job) === JSON.stringify(job)
    )
    return filteredTasks
  }

  sendData() {

    this.jobService.getOptimizedSchedule(this.tasks).subscribe(data => {
      console.log(data)
      // @ts-ignore
      for (let job of this.jobs) {
        this.chartOptions.series.push({name: job.name, data: []})
        this.chartFCFSOptions.series.push({name: job.name, data: []})
        this.chartMMROptions.series.push({name: job.name, data: []})
      }
      for (let series of this.chartOptions.series) {
        // @ts-ignore
        for (let worker of this.workers) {
          series.data.push({x: worker.name, y: []})
        }
      }
      let count1 = 1
      let count2 = 1
      for (let work of this.chartOptions.series) {
        // @ts-ignore
        for (let row of data.outputMap) {
          if (count1 === count1) {
            for (let element of row) {
              // @ts-ignore
              this.chartOptions.series[element[0]].data[data.outputMap.indexOf(row)].y = [element[2], element[3]]
            }
          }
          count2++
        }
        count1++
      }

      //FCFS CHART
      for (let series of this.chartFCFSOptions.series) {
        for (let row of data.fcfs_Output) {
          if (data.fcfs_Output.indexOf(row) == this.chartFCFSOptions.series.indexOf(series)) {
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
      //MMR CHART
      for (let series of this.chartMMROptions.series) {
        for (let row of data.mmr_Output) {
          if (data.mmr_Output.indexOf(row) == this.chartMMROptions.series.indexOf(series)) {
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

      console.log("this.chartFCFSOptions",this.chartFCFSOptions)
      console.log("this.chartMMROptions",this.chartMMROptions)
      console.log("this.chartOptions",this.chartOptions)
      this.isDataSent = true
    })

  }

}
