import NewTask from "../components/NewTask";
import TodoItem from "../components/TodoItem";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useEffect, useState } from "react"; // Import useState hook from React

const Homepage = () => {
  const [todos, setTodos] = useState([]); // Initialize todos state

  const [loading, setLoading] = useState(false);

  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 300)); // Simulate a delay of 1 second
  }

  const addTask = async (task) => {
    setLoading(true); // Set loading to true when adding a task
    setTodos((prevTodos) => [...prevTodos, task]); // Update todos state with the new task
    await delay();
    setLoading(false); // Set loading to false after the task is added
    toast.success("Task added successfully!");
  };

  const deleteTask = (id) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== id));
    toast.success("Task deleted successfully!");
  };
  // Remove task by id,
  //creating a new array without the task at the specified index

  const updateTask = (task, id) => {
    setTodos((prevTodos) => prevTodos.map((t, i) => (i === id ? task : t)));
    toast.success("Task updated successfully!");
  };

  /*const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching data
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await res.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);*/

  return (
    <>
      <NewTask addTask={addTask} />
      {loading ? (
        <Spinner />
      ) : (
        todos.length > 0 && (
          <ul className="bg-gray-200 rounded-md shadow-sm p-4">
            {todos.map((todo, i) => (
              <TodoItem
                key={i}
                id={i}
                todo={todo}
                deleteTask={deleteTask}
                updateTask={updateTask}
              /> // Pass the deleteTask and updateTask functions to TodoItem
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default Homepage;
