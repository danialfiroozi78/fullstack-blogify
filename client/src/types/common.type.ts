export type ApiRes<T = never> = {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  data: T;
};
