import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PRIORITY_LABELS,
  PriorityLevel,
  Status,
  STATUS_LABELS,
} from '@core/constants/options.constants';
import { Meta } from '@core/interfaces/meta.interface';
import { SelectOptions } from '@core/interfaces/select-options.interface';
import { ProjectService } from '@core/services/project.service';
import { TaskService } from '@core/services/task.service';
import { shortName } from '@core/utils/string';
import { SharedModule } from '@shared/shared';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorState } from 'primeng/paginator';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { SelectFilterEvent } from 'primeng/select';
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from '@core/interfaces/task.interface';
import filterFn from '@shared/utils/filterFn';

@Component({
  selector: 'app-task',
  imports: [SharedModule, ConfirmDialogModule, CreateTaskComponent],
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit, AfterViewInit {
  router = inject(Router);
  projectService = inject(ProjectService);
  taskService = inject(TaskService);
  confirmationService = inject(ConfirmationService);
  route = inject(ActivatedRoute);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);

  $taskData!: any;
  $taskMeta!: Meta | undefined;
  assigneeName = shortName;
  params!: Record<string, any>;
  visible: boolean = false;
  @ViewChild('myElement') myElement!: ElementRef;
  elementWidth: number = 0;
  statusTab: { value: string; total: number; label: string }[] = [];
  projectOptions: SelectOptions<string>[] = [];
  filterForm: FormGroup = new FormGroup({
    q: new FormControl(''),
    priority: new FormControl(null),
    projectId: new FormControl(null),
  });
  taskId: string = '';

  priorityOptions: SelectOptions<PriorityLevel>[] = [
    {
      name: PRIORITY_LABELS.LOWEST,
      code: 'LOWEST',
    },
    {
      name: PRIORITY_LABELS.LOW,
      code: 'LOW',
    },
    {
      name: PRIORITY_LABELS.MEDIUM,
      code: 'MEDIUM',
    },
    {
      name: PRIORITY_LABELS.HIGH,
      code: 'HIGH',
    },
    {
      name: PRIORITY_LABELS.HIGHEST,
      code: 'HIGHEST',
    },
  ];

  columns = [
    'Công việc',
    'Dự án',
    'Người thực hiện',
    'Trạng thái',
    'Tiến độ',
    'Ưu tiên',
    'Bắt đầu dự kiến',
    'Kết thúc dự kiến',
    'Thao tác',
  ];

  activeTab = 'all';
  showFilter = false;

  showDialog(id?: string) {
    this.visible = true;
    if (id) {
      this.taskId = id;
    } else {
      this.taskId = '';
    }
  }

  constructor() {
    effect(() => {
      this.taskService.refreshTrigger();
      this.fetchTasks();
    });
  }

  private fetchTasks(params?: Record<string, any>): void {
    this.taskService
      .getTasks({
        ...this.params,
        ...params,
      })
      .subscribe((res) => {
        this.taskService.tasks.set(res);
      });
  }

  private getProjectOptions(params?: Record<string, any>): void {
    this.projectService.getProjects(params).subscribe((res) => {
      this.projectService.loading.set(false);
      this.projectOptions = res.data.map((item) => ({
        name: item.name,
        code: item.id,
      }));
    });
  }

  filterProjects(event: SelectFilterEvent) {
    this.getProjectOptions({ q: event.filter });
  }

  getPriorityLabel(priority?: string | null): string {
    if (!priority) return '-';

    const key = priority.toUpperCase() as PriorityLevel;

    return PRIORITY_LABELS[key] || '-';
  }

  getStatusLabel(status: string | null): string {
    if (!status) return '-';

    const key = status.toUpperCase() as Status;

    return STATUS_LABELS[key] || '-';
  }

  handleChangeTab(value: string) {
    this.activeTab = value;
    this.fetchTasks({
      status: value === 'all' ? '' : value,
      page: 1,
    });
  }

  handleShowFilter() {
    this.showFilter = !this.showFilter;
  }

  confirm(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Bạn có chắc chắn muốn xóa?',
      icon: 'pi pi-exclamation-triangle',
      header: 'Xóa công việc',
      dismissableMask: true,
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.taskService
          .deleteTask({
            ids: [id],
          })
          .subscribe();
      },
    });
  }

  onPageChange(event: PaginatorState) {
    this.fetchTasks({ page: event.page! + 1 });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: event.page! + 1 },
      queryParamsHandling: 'merge',
    });
  }

  onSubmit() {
    const filter = filterFn(this.filterForm.value);
    this.fetchTasks(filter);
  }

  ngDoCheck(): void {
    this.$taskData = this.taskService.tasks()?.data;
    this.$taskMeta = this.taskService.tasks()?.meta;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
      const type = this.route.routeConfig?.path;
      this.params = {
        ...res,
        type: type === 'all' ? '' : type,
      };
    });

    // this.fetchTasks(this.params);

    this.getProjectOptions();

    this.taskService.getTaskStatus().subscribe((res) => {
      this.statusTab = res.map((item) => ({
        label: STATUS_LABELS[item.status.toUpperCase() as Status],
        total: item.total,
        value: item.status,
      }));
    });
  }

  ngAfterViewInit(): void {
    this.elementWidth = this.myElement?.nativeElement?.clientWidth;
    this.cdRef.detectChanges();
  }
}
