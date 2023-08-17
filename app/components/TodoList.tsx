import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ITask } from "@/types/tasks";
import Modal from "./Modal";
import EditTaskForm from "./EditTaskForm";
import DeleteTaskConfirm from "./DeleteTaskConfirm";
import { formatDate } from "../utils/formatDate";

interface TodoListProps {
  tasks: ITask[];
  onRefreshTasks: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onRefreshTasks }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Created Date</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {task.title}
              </TableCell>
              <TableCell align="left">{task.status}</TableCell>
              <TableCell align="left">{formatDate(task.createdDate)}</TableCell>
              <TableCell align="left">
                <div style={{ display: "flex", gap: "15px" }}>
                  <FiEdit
                    onClick={() => setOpenModalEdit(true)}
                    cursor="pointer"
                    className="text-blue-500"
                    size={25}
                  />
                  <FiTrash2
                    onClick={() => setOpenModalDeleted(true)}
                    cursor="pointer"
                    className="text-red-500"
                    size={25}
                  />
                </div>

                <Modal
                  modalOpen={openModalEdit}
                  setModalOpen={setOpenModalEdit}
                >
                  <EditTaskForm
                    task={task}
                    onSubmit={() => {
                      setOpenModalEdit(false);
                      onRefreshTasks();
                    }}
                  />
                </Modal>
                <Modal
                  modalOpen={openModalDeleted}
                  setModalOpen={setOpenModalDeleted}
                >
                  <DeleteTaskConfirm
                    taskId={task._id}
                    onSubmit={() => {
                      setOpenModalDeleted(false);
                      onRefreshTasks();
                    }}
                  />
                </Modal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoList;
