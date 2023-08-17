export enum TaskStatus {
  TODO = "TODO",
  InProgress = "InProgress",
  Finished = "Finished",
}

export interface ITask {
  _id: string;
  title: string;
  status: TaskStatus;
  createdDate: string;
  user: string;
}

export interface CreateTaskDto {
  title: string;
}

export interface UpdateTaskDto {
  title: string;
  status: string;
}
