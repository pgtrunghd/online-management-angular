import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  effect,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectService } from '@core/services/project.service';
import { SharedModule } from '@shared/shared';
import filterFn from '@shared/utils/filterFn';
import { SelectOptions } from '@core/interfaces/select-options.interface';
import { Status, STATUS_LABELS } from '@core/constants/options.constants';
import { Meta } from '@core/interfaces/meta.interface';
import { shortName } from '@core/utils/string';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { PaginatorState } from 'primeng/paginator';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-project',
  imports: [SharedModule, CreateProjectComponent],
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit, DoCheck, AfterViewInit {
  projectService = inject(ProjectService);
  cdRef = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  router = inject(Router);
  confirmationService = inject(ConfirmationService);

  $projectData!: any;
  $projectMeta!: Meta | undefined;
  showFilter: boolean = false;
  params: Record<string, any> = {};
  filterForm: FormGroup = new FormGroup({
    q: new FormControl(''),
    timeStart: new FormControl(null),
    timeEnd: new FormControl(null),
    status: new FormControl(null),
  });
  @ViewChild('myElement') myElement!: ElementRef;
  elementWidth: number = 0;
  shortName = shortName;
  visible: boolean = false;
  projectId: string = '';

  columns: string[] = [
    'Tên dự án',
    'Người quản trị',
    'Người tham gia',
    'Người theo dõi',
    'Tiến độ',
    'Công việc',
    'Bắt đầu',
    'Kết thúc',
    'Thao tác',
  ];

  statusOptions: SelectOptions<Status>[] = [
    {
      name: STATUS_LABELS.WAITING,
      code: 'WAITING',
    },
    {
      name: STATUS_LABELS.PROCESSING,
      code: 'PROCESSING',
    },
    {
      name: STATUS_LABELS.COMPLETED,
      code: 'COMPLETED',
    },
    {
      name: STATUS_LABELS.PAUSE,
      code: 'PAUSE',
    },
    {
      name: STATUS_LABELS.CANCEL,
      code: 'CANCEL',
    },
  ];

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
        this.projectService
          .deleteProject({
            ids: [id],
          })
          .subscribe();
      },
    });
  }

  showDialog(id?: string) {
    this.visible = true;
    this.projectId = id ?? '';
  }

  handleShowFilter() {
    this.showFilter = !this.showFilter;
  }

  onPageChange(event: PaginatorState) {
    this.fetchProjects({ page: event.page! + 1 });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: event.page! + 1 },
      queryParamsHandling: 'merge',
    });
  }

  onSubmit() {
    const body = {
      ...this.filterForm.value,
      timeStart: this.filterForm.value.timeStart
        ? new Date(this.filterForm.value.timeStart).toISOString()
        : null,
      timeEnd: this.filterForm.value.timeEnd
        ? new Date(this.filterForm.value.timeEnd).toISOString()
        : null,
    };

    const filter = filterFn(body);
    this.fetchProjects(filter);
  }

  constructor() {
    effect(() => {
      this.projectService.refreshTrigger();
      this.fetchProjects();
    });
  }

  private fetchProjects(params?: Record<string, any>) {
    this.projectService
      .getProjects({
        ...this.params,
        ...params,
      })
      .subscribe((res) => {
        this.projectService.projects.set(res);
      });
  }

  ngDoCheck(): void {
    this.$projectData = this.projectService.projects()?.data;
    this.$projectMeta = this.projectService.projects()?.meta;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      const type = this.route.routeConfig?.path;
      this.params = {
        ...res,
        type: type === 'all' ? '' : type,
      };
    });
  }

  ngAfterViewInit(): void {
    this.elementWidth = this.myElement?.nativeElement?.clientWidth;
    this.cdRef.detectChanges();
  }
}
