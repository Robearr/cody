type Message = {
  code: string;
};

export type BaseResponse<T> = {
  messages: Message[];
  response: T;
};