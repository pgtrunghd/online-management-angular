import { DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDatePicker } from '@core/constants/date.constants';
import {
  PRIORITY_LABELS,
  PriorityLevel,
  Status,
  STATUS_LABELS,
} from '@core/constants/options.constants';
import { SelectOptions } from '@core/interfaces/select-options.interface';
import { TaskPost } from '@core/interfaces/task.interface';
import { AuthService } from '@core/services/auth.service';
import { PermissionAssignService } from '@core/services/permission-assign.service';
import { ProjectService } from '@core/services/project.service';
import { TaskOptionsService, TaskService } from '@core/services/task.service';
import { UserService } from '@core/services/user.service';
import { getFullName, getFullNameAndPosition } from '@core/utils/string';
import { SharedModule } from '@shared/shared';
import { SelectFilterEvent } from 'primeng/select';

@Component({
  selector: 'app-create-task',
  imports: [SharedModule],
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent implements OnInit {
  formatDatePicker = formatDatePicker;
  permissionAssignUserService = inject(PermissionAssignService);
  userService = inject(UserService);
  authService = inject(AuthService);
  projectService = inject(ProjectService);
  taskOptionsService = inject(TaskOptionsService);
  taskService = inject(TaskService);
  datePipe = inject(DatePipe);
  startTime = new Date();
  endTime = new Date();
  taskId = input<string>();

  userOptions: SelectOptions<string>[] = [];
  permissionAssignUserOptions: SelectOptions<string>[] = [];
  projectOptions: SelectOptions<string>[] = [];
  taskOptions: SelectOptions<string>[] = [];
  getFullNameAndPosition = getFullNameAndPosition;
  selectedUsers: SelectOptions<string>[] = [];
  closeModal = output<void>();

  createTaskForm: FormGroup = new FormGroup({
    followers: new FormControl(null),
    assignees: new FormControl(null),
    project: new FormControl(null),
    parent: new FormControl(null),
    name: new FormControl(''),
    startTime: new FormControl(this.startTime),
    endTime: new FormControl(this.endTime),
    startDate: new FormControl(new Date()),
    endDate: new FormControl(new Date()),
    priority: new FormControl(null),
    status: new FormControl(null),
    description: new FormControl(''),
  });

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

  statusOptions: SelectOptions<Status>[] = [
    {
      name: STATUS_LABELS.PROCESSING,
      code: 'PROCESSING',
    },
    {
      name: STATUS_LABELS.COMPLETED,
      code: 'COMPLETED',
    },
  ];

  constructor() {
    this.startTime.setHours(8, 0, 0, 0);
    this.endTime.setHours(17, 30, 0, 0);
  }

  private fetchUser(params?: Record<string, any>) {
    this.userService.getPublicInfo(params).subscribe((res) => {
      this.userService.loading.set(false);
      const mappedFromAPI = res.data.map((item) => ({
        name: getFullName(item.firstName, item.lastName),
        code: item.id,
      }));

      const selectedCodes = this.createTaskForm.get('followers')?.value ?? [];

      const missingSelected = selectedCodes.filter(
        (sel: SelectOptions<string>) =>
          !mappedFromAPI.some((opt) => opt.code === sel.code)
      );

      this.userOptions = [...mappedFromAPI, ...missingSelected];
    });
  }

  private fetchPermissionAssignUser(params?: Record<string, any>) {
    this.permissionAssignUserService.getUser(params).subscribe((res) => {
      this.permissionAssignUserService.loading.set(false);
      const mappedFromAPI = res.data.map((item) => ({
        name: getFullName(item.firstName, item.lastName),
        code: item.id,
      }));

      const selectedCodes = this.createTaskForm.get('assignees')?.value ?? [];

      const missingSelected = selectedCodes.filter(
        (sel: SelectOptions<string>) =>
          !mappedFromAPI.some((opt) => opt.code === sel.code)
      );
      this.permissionAssignUserOptions = [...mappedFromAPI, ...missingSelected];
    });
  }

  private fetchProjectOptions(params?: Record<string, any>): void {
    this.projectService.getProjects(params).subscribe((res) => {
      this.projectService.loading.set(false);
      this.projectOptions = res.data.map((item) => ({
        name: item.name,
        code: item.id,
      }));
    });
  }

  private fetchTaskOptions(params?: Record<string, any>): void {
    this.taskOptionsService.getTaskOptions(params).subscribe((res) => {
      this.taskOptionsService.loading.set(false);
      this.taskOptions = res.data.map((item) => ({
        name: item.name,
        code: item.id,
      }));
    });
  }

  filterUser(event: SelectFilterEvent) {
    this.fetchUser({ q: event.filter });
  }

  filterPermissionAssignUser(event: SelectFilterEvent) {
    this.fetchPermissionAssignUser({ q: event.filter });
  }

  filterProjects(event: SelectFilterEvent) {
    this.fetchProjectOptions({ q: event.filter });
  }

  filterTasks(event: SelectFilterEvent) {
    this.fetchTaskOptions({ q: event.filter });
  }

  onClose() {
    this.closeModal.emit();
  }

  onSubmit() {
    const data = this.createTaskForm.value;
    const startEstimateTime = new Date(
      `${this.datePipe.transform(
        data.startDate,
        'yyyy-MM-dd'
      )!} ${this.datePipe.transform(data.startTime, 'HH:mm')}`
    ).toISOString();
    const endEstimateTime = new Date(
      `${this.datePipe.transform(
        data.endDate,
        'yyyy-MM-dd'
      )!} ${this.datePipe.transform(data.endTime, 'HH:mm')}`
    ).toISOString();
    const body: TaskPost = {
      assignees: data.assignees?.map(
        (item: SelectOptions<string>) => item.code
      ),
      followers: data.followers?.map(
        (item: SelectOptions<string>) => item.code
      ),
      project: data.project?.code,
      parent: data.parent?.code,
      priority: data.priority?.code.toLowerCase(),
      status: data.status?.code.toLowerCase(),
      startEstimateTime,
      endEstimateTime,
      name: data.name,
      description: data.description,
    };
    if (!this.taskId()) {
      this.taskService.postTask(body).subscribe(() => {
        this.onClose();
      });
    } else {
      this.taskService.putTask(this.taskId()!, body).subscribe(() => {
        this.onClose();
      });
    }
  }

  ngOnInit(): void {
    this.fetchUser();
    this.fetchPermissionAssignUser();
    this.fetchProjectOptions();
    this.fetchTaskOptions();

    if (this.taskId()) {
      this.taskService.getTaskById(this.taskId()!).subscribe((res) => {
        this.createTaskForm.patchValue({
          name: res?.name,
          description: res?.description,
          assignees: res?.assignees?.map((item) => ({
            name: getFullName(item.firstName, item.lastName),
            code: item.id,
          })),
          followers: res?.followers?.map((item) => ({
            name: getFullName(item.firstName, item.lastName),
            code: item.id,
          })),
          project: {
            name: res?.project?.name,
            code: res?.project?.id,
          },
          parent: res?.parent
            ? {
                name: res?.parent?.name,
                code: res?.parent?.id,
              }
            : null,
          priority: this.priorityOptions.find(
            (item) => item.code === res?.priority?.toUpperCase()
          ),
          status: this.statusOptions.find(
            (item) => item.code === res?.status?.toUpperCase()
          ),
          startDate: new Date(res?.startEstimateTime),
          endDate: new Date(res?.endEstimateTime),
          startTime: new Date(res?.startEstimateTime),
          endTime: new Date(res?.endEstimateTime),
        });
      });
    }
  }
}
