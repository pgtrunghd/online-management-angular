import { Routes } from '@angular/router';
import { HomeComponent } from '../../features/dashboard/home/home.component';
import { ProjectComponent } from '../../features/dashboard/project/project.component';
import { TaskComponent } from '../../features/dashboard/task/task.component';
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { DashboardLayoutComponent } from './dashboard-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: HomeComponent,
        title: 'Dashboard',
        data: {
          group: 'Dashboard',
          icon: 'icons/home.svg',
        },
      },
      {
        path: 'workplace',
        component: MainLayoutComponent,
        data: {
          group: 'Workplace',
          icon: 'icons/briefcase.svg',
        },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'task' },
          {
            path: 'task',
            title: 'Quản lý công việc',
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'all' },
              {
                path: 'all',
                component: TaskComponent,
                title: 'Tất cả',
              },
              {
                path: 'assign',
                component: TaskComponent,
                title: 'Bạn thực hiện',
              },
              {
                path: 'created',
                component: TaskComponent,
                title: 'Bạn đã giao',
              },
              {
                path: 'follower',
                component: TaskComponent,
                title: 'Bạn theo dõi',
              },
              {
                path: 'expected',
                component: TaskComponent,
                title: 'Dự kiến',
              },
            ],
          },
          {
            path: 'project',
            title: 'Quản lý dự án',
            children: [
              { path: '', pathMatch: 'full', redirectTo: 'all' },
              { path: 'all', component: ProjectComponent, title: 'Tất cả' },
              {
                path: 'assign',
                component: ProjectComponent,
                title: 'Bạn thực hiện',
              },
              {
                path: 'manager',
                component: ProjectComponent,
                title: 'Bạn quản trị',
              },
              {
                path: 'follower',
                component: ProjectComponent,
                title: 'Bạn theo dõi',
              },
            ],
          },
        ],
      },
    ],
  },
];
