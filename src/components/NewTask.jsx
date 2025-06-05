import { useRef, useState } from "react";

const NewTask = ({ addTask }) => {
  //const [title, setTitle] = useState("");
  const title = useRef(); // Use useRef to create a reference for the input field
  const form = useRef(); // Create a ref to access the form element

  const submitForm = (e) => {
    e.preventDefault(); // Prevent default form submission behavior, Do not refresh the page

    const task = {
      title: title.current.value, // Get the value from the input field using ref
      date: new Date().toLocaleString(), // Get current date in locale format
    };
    addTask(task); // Call the addTask function with the new task object
    form.current.reset(); // Reset the form after submission
  };
  return (
    <form ref={form} onSubmit={submitForm}>
      <label htmlFor="title" className="text-lg text-gray-400">
        Add New Task
      </label>
      <div className="flex gap-x-2 bg-white rounded-md shadow-sm p-2 pl-3 mt-2">
        <input
          id="title"
          type="text"
          className="focus:outline-none w-full"
          maxLength="30" // Limit input to 30 characters
          placeholder="Enter some string here"
          autoFocus
          required
          ref={title} // Use ref to access the input value
          //value={title}
          //onChange={(e) => setTitle(e.target.value)} // Update title state
        />
        <button
          type="submit"
          className="w-40 px-3 py-2 rounded font-semibold bg-blue-500 text-white hover:bg-blue-600"
        >
          + New Task
        </button>
      </div>
    </form>
  );
};

export default NewTask;
