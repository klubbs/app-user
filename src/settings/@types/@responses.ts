export type IResponseMessage<T> = {
  message: T;
  statusCode: number;
};

export type IError = {
  message: string;
  error: { field: string; validation: string }[];
  statusCode: number;
};
