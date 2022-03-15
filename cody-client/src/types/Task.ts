export enum ProgrammingLanguage {
  KOTLIN = 'Kotlin',
  JAVA = 'Java',
  JAVASCRIPT = 'JavaScript',
};

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
  language: ProgrammingLanguage;
  classes: ClassType[];
  tests: TestType[];
};

export type Task = {
  uuid: string | null;
  taskName: string;
  taskDescription: string;
  taskForLanguages: TaskForLanguageType[];
};