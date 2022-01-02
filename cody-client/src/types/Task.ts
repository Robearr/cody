type ClassType = {
  className: string;
  classSource: string;
};

type TestType = {
  className: string;
  classSource: string;
  testDescription: string;
  methodToCall: string;
  methodParams: any; // TODO
  timingTest: boolean;
};

type TaskForLanguageType = {
  language: 'JAVA' | 'KOTLIN' | 'JAVASCRIPT';
  classes: ClassType[];
  tests: TestType[];
};

export type Task = {
  uuid: string;
  taskName: string;
  taskDescription: string;
  taskForLanguages: TaskForLanguageType[];
};