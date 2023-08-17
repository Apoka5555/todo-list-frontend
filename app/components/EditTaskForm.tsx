import { FormEventHandler, useState } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ITask, TaskStatus } from "../../types/tasks";
import { editTask } from "../api/task";

interface EditTaskFormProps {
  onSubmit: () => void;
  task: ITask;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSubmit }) => {
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(task.status);

  const handleSubmitEditTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTask(task._id, {
      title: taskTitle,
      status: taskStatus,
    });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmitEditTask}>
      <h3 className="font-bold text-lg">Edit task</h3>
      <div className="modal-action">
        <TextField
          id="taskTitle"
          label="Title"
          value={taskTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTaskTitle(event.target.value);
          }}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              id="taskStatus"
              value={taskStatus}
              label="Status"
              onChange={(event: SelectChangeEvent) => {
                setTaskStatus(event.target.value as TaskStatus);
              }}
            >
              <MenuItem value={TaskStatus.TODO}>ToDo</MenuItem>
              <MenuItem value={TaskStatus.InProgress}>InProgress</MenuItem>
              <MenuItem value={TaskStatus.Finished}>Finished</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <button type="submit" className="btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
