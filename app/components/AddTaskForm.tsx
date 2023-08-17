import { FormEventHandler, useState } from "react";
import { addTask } from "../api/task";

interface AddTaskFormProps {
  onSubmit: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSubmit }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    await addTask({
      title: newTaskTitle,
    });
    setNewTaskTitle("");
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmitNewTodo}>
      <h3 className="font-bold text-lg">Add new task</h3>
      <div className="modal-action">
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn">
          Create
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
