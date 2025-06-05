import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDatePicker } from '@core/constants/date.constants';
import { ProjectPost } from '@core/interfaces/project.interface';
import { SelectOptions } from '@core/interfaces/select-options.interface';
import { ProjectService } from '@core/services/project.service';
import { UserService } from '@core/services/user.service';
import { getFullName } from '@core/utils/string';
import { SharedModule } from '@shared/shared';
import { SelectFilterEvent } from 'primeng/select';

@Component({
  selector: 'app-create-project',
  imports: [SharedModule],
  templateUrl: './create-project.component.html',
})
export class CreateProjectComponent implements OnInit {
  projectService = inject(ProjectService);
  userService = inject(UserService);

  mappedFromAPI = signal<SelectOptions<string>[]>([]);
  managerOptions: SelectOptions<string>[] = [];
  joinerOptions: SelectOptions<string>[] = [];
  followerOptions: SelectOptions<string>[] = [];
  closeModal = output();
  projectId = input<string>();
  createProjectForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    timeStart: new FormControl(null),
    timeEnd: new FormControl(null),
    managers: new FormControl(null),
    joiners: new FormControl(null),
    followers: new FormControl(null),
  });
  private initialize = false;
  formatDatePicker = formatDatePicker;

  constructor() {
    effect(() => {
      if (!this.initialize && this.mappedFromAPI().length > 0) {
        this.initialize = true;
        this.getOptions('managers');
        this.getOptions('joiners');
        this.getOptions('followers');
      }
    });
  }

  private fetchUser(params?: Record<string, any>) {
    this.userService.getPublicInfo(params).subscribe((res) => {
      this.mappedFromAPI.set(
        res.data.map((item) => ({
          name: getFullName(item.firstName, item.lastName),
          code: item.id,
        }))
      );
    });
  }

  getOptions(type: 'managers' | 'joiners' | 'followers') {
    const selectedCodes = this.createProjectForm.get(type)?.value ?? [];

    const missingSelected = selectedCodes.filter(
      (sel: SelectOptions<string>) =>
        !this.mappedFromAPI().some((opt) => opt.code === sel.code)
    );

    switch (type) {
      case 'managers':
        this.managerOptions = [...this.mappedFromAPI(), ...missingSelected];
        break;
      case 'joiners':
        this.joinerOptions = [...this.mappedFromAPI(), ...missingSelected];
        break;
      case 'followers':
        this.followerOptions = [...this.mappedFromAPI(), ...missingSelected];
        break;
    }
  }

  onClose() {
    this.closeModal.emit();
  }

  onSubmit() {
    const data = this.createProjectForm.value;
    const body: ProjectPost = {
      ...data,
      timeStart: data.timeStart ? new Date(data.timeStart).toISOString() : null,
      timeEnd: data.timeEnd ? new Date(data.timeEnd).toISOString() : null,
      managers: data.managers?.map((item: SelectOptions<string>) => item.code),
      joiners: data.joiners?.map((item: SelectOptions<string>) => item.code),
      followers: data.followers?.map(
        (item: SelectOptions<string>) => item.code
      ),
    };
    if (!this.projectId()) {
      this.projectService.postProject(body).subscribe(() => {
        this.onClose();
      });
    } else {
      this.projectService.putProject(this.projectId()!, body).subscribe(() => {
        this.onClose();
      });
    }
  }

  filterUsers(
    event: SelectFilterEvent,
    type: 'managers' | 'joiners' | 'followers'
  ) {
    this.fetchUser({ q: event.filter });
    this.getOptions(type);
  }

  ngOnInit(): void {
    this.fetchUser();

    if (this.projectId()) {
      this.projectService.getProjectById(this.projectId()!).subscribe((res) => {
        const project = res.data;
        this.createProjectForm.patchValue({
          name: project.name,
          description: project.description,
          timeStart: new Date(project?.timeStart),
          timeEnd: new Date(project?.timeEnd),
          followers: project?.followers?.map((item) => ({
            name: getFullName(item.firstName, item.lastName),
            code: item.id,
          })),
          joiners: project?.joiners?.map((item) => ({
            name: getFullName(item.firstName, item.lastName),
            code: item.id,
          })),
          managers: project?.managers?.map((item) => ({
            name: getFullName(item.firstName, item.lastName),
            code: item.id,
          })),
        });
      });
    }
  }
}
