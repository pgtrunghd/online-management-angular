import { Daum, User } from '@core/interfaces/user.interface';

export const shortName = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

export const getFullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
};

export const getFullNameAndPosition = (item: Daum | any) => {
  return `${getFullName(item.firstName, item.lastName)} - ${
    item.position.name
  } - ${item.department.name} - ${item.company.name}`;
};
