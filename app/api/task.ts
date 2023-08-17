import { ITask, CreateTaskDto, UpdateTaskDto } from "../../types/tasks";

export const baseUrl = "http://localhost:8000";

export const getAllTasks = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks/all`);
  const tasks = await res.json();
  return tasks;
};

export const getUserTasks = async (): Promise<{
  success: boolean;
  message: string;
  data: ITask[];
}> => {
  const res = await fetch(`${baseUrl}/tasks/byUserId`, {
    credentials: "include",
  });
  const result = await res.json();

  return {
    success: res.ok,
    message: result.message,
    data: result,
  };
};

export const getUserTasksByTitle = async (
  title: string
): Promise<{
  success: boolean;
  message: string;
  data: ITask[];
}> => {
  const res = await fetch(`${baseUrl}/tasks/byTitleFragment?title=${title}`, {
    credentials: "include",
  });
  const result = await res.json();

  return {
    success: res.ok,
    message: result.message,
    data: result,
  };
};

export const addTask = async (task: CreateTaskDto): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
    credentials: "include",
  });
  const newTask = await res.json();
  return newTask;
};

export const editTask = async (
  id: string,
  task: UpdateTaskDto
): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const updatedTask = await res.json();
  return updatedTask;
};

export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
};
