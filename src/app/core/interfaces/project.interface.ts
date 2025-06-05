import { Meta } from './meta.interface';

export interface Project {
  data: Daum[];
  meta: Meta;
}

interface Daum {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  name: string;
  description?: string;
  status: string;
  timeStart: string;
  timeEnd: string;
  totalTime: number;
  progress: number;
  creatorId: string;
  tasks: number;
  managers: Manager[];
  followers?: Follower[];
  joiners?: Joiner[];
}

interface Manager {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  avatar?: string;
}

interface Follower {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  avatar: any;
}

interface Joiner {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  avatar?: string;
}

export interface ProjectPost {
  managers: string[];
  joiners: string[];
  followers: string[];
  timeStart: string;
  timeEnd: string;
  name: string;
  description: string;
}

export interface ProjectData {
  data: Data;
  statistic: Statistic[];
  totalTask: number;
}

interface Statistic {
  status: string;
  total: number;
}

interface Data {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  name: string;
  description: string;
  status: string;
  timeStart: string;
  timeEnd: string;
  totalTime: number;
  progress: number;
  creatorId: string;
  tasks: number;
  managers: Manager[];
  joiners: Joiner[];
  followers: Follower[];
  files: any[];
}
