import { deleteTask } from "../api/task";
import Modal from "./Modal";

interface DeleteTaskConfirmProps {
  taskId: string;
  onSubmit: () => void;
}

const DeleteTaskConfirm: React.FC<DeleteTaskConfirmProps> = ({
  taskId,
  onSubmit,
}) => {
  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    onSubmit();
  };

  return (
    <>
      <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
      <div className="modal-action">
        <button onClick={() => handleDeleteTask(taskId)} className="btn">
          Yes
        </button>
      </div>
    </>
  );
};

export default DeleteTaskConfirm;
