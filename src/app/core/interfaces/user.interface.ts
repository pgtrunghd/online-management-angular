import { Meta } from './meta.interface';

export interface User {
  data: Daum[];
  meta: Meta;
}

export interface Daum {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  code: string;
  firstName: string;
  middleName: any;
  lastName: string;
  gender: string;
  birthday: string;
  nameOther?: string;
  nation?: string;
  religion?: string;
  address?: string;
  role: string;
  phone: string;
  email: string;
  preJoinDate: string;
  joinDate: string;
  leaveDate?: string;
  salePosition?: number;
  saleStatus: string;
  isDeleted: boolean;
  isPrivate: boolean;
  avatar?: string;
  company: Company;
  department: Department;
  position: Position;
  parent?: Parent;
}

interface Company {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  code: string;
  name: string;
  taxIdentificationNumber: string;
  officeCity: any;
  officeDistrict: any;
  officeWards: any;
  officeStreet: string;
  city: any;
  district: any;
  wards: any;
  street: string;
  phone?: string;
  email?: string;
  active: boolean;
}

interface Department {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  code: string;
  name: string;
  description: any;
  telNumber: string;
  faxNumber: string;
  email: string;
  active: boolean;
  companyId: string;
}

interface Position {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  code: string;
  name: string;
  description: any;
  active: boolean;
  companyId: string;
  departmentId: string;
  level?: number;
}

interface Parent {
  id: string;
  createdDate: string;
  lastModifiedDate: string;
  code: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  birthday: string;
  nameOther: any;
  birthPlace?: string;
  nation?: string;
  religion?: string;
  address?: string;
  identityCardNumber?: string;
  identityCardDate: string;
  identityCardPlace?: string;
  idCardFrontImage?: string;
  idCardBacksideImage?: string;
  role: string;
  phone?: string;
  email: string;
  avatar?: string;
  preJoinDate: string;
  joinDate: string;
  leaveDate: any;
  isDeleted: boolean;
  isPrivate: boolean;
  status: string;
  formOfWork: any;
  salePosition: number;
  saleStatus: string;
  rejectReason: any;
  companyId: string;
  departmentId: string;
  teamId: any;
  positionId: string;
  timekeepingId: string;
  permissionActives: any[];
  permissionProcessActives: any[];
}
