export type PriorityLevel = 'LOWEST' | 'LOW' | 'MEDIUM' | 'HIGH' | 'HIGHEST';

export const PRIORITY_LABELS: Record<PriorityLevel, string> = {
  LOWEST: 'Rất thấp',
  LOW: 'Thấp',
  MEDIUM: 'Trung bình',
  HIGH: 'Cao',
  HIGHEST: 'Rất cao',
};

export type Status =
  | 'ALL'
  | 'WAITING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'PAUSE'
  | 'CANCEL';

export const STATUS_LABELS: Record<Status, string> = {
  ALL: 'Tất cả',
  WAITING: 'Đang chờ',
  PROCESSING: 'Đang thực hiện',
  COMPLETED: 'Đã hoàn thành',
  PAUSE: 'Tạm dừng',
  CANCEL: 'Đã hủy',
};
