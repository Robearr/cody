export type ClassType = {
  className: string;
  classSource: string;
};

export type TestType = {
  className: string;
  classSource: string;
  testDescription: string;
  methodToCall: string;
  methodParams: Record<string, any>;
  timingTest: boolean;
};

export type TaskForLanguageType = {
  language: string;
  classes: ClassType[];
  tests: TestType[];
};

export type Task = {
  uuid: string;
  taskName: string;
  taskDescription: string;
  taskForLanguages: TaskForLanguageType[];
};