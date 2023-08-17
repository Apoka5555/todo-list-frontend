"use client";

import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserTasks, getUserTasksByTitle } from "@/app/api/task";
import { ITask } from "../types/tasks";
import NavBar from "./components/NavBar";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";
import AddTaskForm from "./components/AddTaskForm";
import { getCurrentUser } from "./api/user";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [currentUserLogin, setCurrentUserLogin] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>("");

  const getTasks = async () => {
    const tasksResult = await getUserTasks();

    if (tasksResult.success) {
      setTasks(tasksResult.data);
    } else {
      setTasks([]);
    }
  };

  const getUser = async () => {
    const userResult = await getCurrentUser();

    if (userResult.success) {
      setCurrentUserLogin(userResult.data || null);
    }
  };

  const logOut = () => {
    setCurrentUserLogin(null);
    setTasks([]);
  };

  const findTask = async () => {
    if (taskTitle) {
      const tasksByTitleResult = await getUserTasksByTitle(taskTitle);

      if (tasksByTitleResult.success) {
        setTasks(tasksByTitleResult.data);
      } else {
        setTasks([]);
      }
    } else {
      getTasks();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (currentUserLogin) {
      getTasks();
    }
  }, [currentUserLogin]);

  return (
    <main>
      <NavBar
        currentUserLogin={currentUserLogin}
        onLogin={getUser}
        onLogOut={logOut}
      />

      <div style={{ display: "flex" }}>
        <div
          style={{ display: "flex", gap: "15px", justifyContent: "flex-start" }}
        >
          <Button variant="outlined" color="success" onClick={getTasks}>
            Get My Tasks
          </Button>
          {currentUserLogin && (
            <Button variant="outlined" onClick={() => setModalOpen(true)}>
              Add New Task
            </Button>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>Search Task: </span>
            <TextField
              label="Title"
              variant="outlined"
              margin="normal"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTaskTitle(event.target.value);
              }}
            />
            <Button variant="outlined" onClick={findTask}>
              Find
            </Button>
          </div>
        </div>
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <AddTaskForm
          onSubmit={() => {
            setModalOpen(false);
            getTasks();
          }}
        />
      </Modal>
      <TodoList tasks={tasks} onRefreshTasks={getTasks} />
    </main>
  );
}
