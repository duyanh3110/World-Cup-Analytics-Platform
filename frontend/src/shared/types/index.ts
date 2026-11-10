export type PageResponse<T> = {
  data: T[];
  page: number;
  size: number;
  totalCounts: number;
  totalPages: number;
};
