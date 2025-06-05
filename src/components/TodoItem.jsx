import { useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const TodoItem = (props) => {
  const dialog = useRef(); //reference to the dialog element
  // State to manage whether the modal is in edit mode or delete confirmation mode

  const [title, setTitle] = useState(props.todo.title); // State to manage the title input in edit mode
  const [editing, setEditing] = useState(false);

  const openModal = (isEditing) => {
    isEditing ? setEditing(true) : setEditing(false);

    dialog.current.showModal();
  };

  const closeModal = () => {
    dialog.current.close();
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (editing) {
      const task = {
        title: title,
        date: props.todo.date, // Keep the original date
      };
      props.updateTask(task, props.id); // Update the task
    } else {
      props.deleteTask(props.id); // Delete the task
    }
    closeModal();
  };

  const clikOutsideModal = (e) => {
    // Close the modal if clicked outside of it
    if (e.target === dialog.current) {
      closeModal();
    }
  };

  return (
    <>
      <li className="flex bg-white rounded shadow-sm p-4 mt-4 first:mt-0">
        <div className="flex gap-x-4 mr-auto items-center ">
          <div className="h-6 w-6 rounded-full shadow-sm text-white text-sm bg-teal-400 text-center content-center">
            {props.id + 1}
          </div>
          <div>
            <p className="font-semibold">{props.todo.title}</p>
            <p className="text-sm text-gray-400">{props.todo.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => openModal(false)}
            type="button"
            className="todo-btn"
          >
            <MdDelete />
          </button>
          <button
            onClick={() => openModal(true)}
            type="button"
            className="todo-btn"
          >
            <MdEdit />
          </button>
        </div>
      </li>
      <dialog
        ref={dialog}
        className="rounded-md w-[480px] m-auto"
        onClick={clikOutsideModal}
      >
        <form onSubmit={submitForm} className="p-6">
          <h3 className="font-semibold text-xl">
            {editing ? "Edit Task" : "Do yo want to delete?"}
          </h3>
          <div className="mt-2">
            {editing ? (
              <input
                type="text"
                className="focus:outline-none w-full border rounded py-2 px-3"
                maxLength="30" // Limit input to 30 characters
                placeholder="Enter some string here"
                autoFocus
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Update title state
              />
            ) : (
              "This will permanently delete this task."
            )}
          </div>
          <div className="mt-12 text-end space-x-2">
            <button
              type="button"
              className="rounded border border-gray-200 px-3 py-2 hover:bg-gray-50"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="submit"
              className={
                editing
                  ? "rounded bg-teal-500 px-3 py-2 text-white hover:bg-teal-600"
                  : "rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
              }
            >
              {editing ? "Confirm" : "Delete"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default TodoItem;
