import React, { useState, useEffect } from "react";

//Disculpen el código spaghetti. Sé que debo componentizar esto...

let apiUrl = "https://playground.4geeks.com/apis/fake/todos/user/carloscopes";

const Home = () => {
  const [taskList, setTaskLIst] = useState([]);

  const [task, setTask] = useState({
    label: "",
    done: false,
  });

  const getTaskList = async () => {
    try {
      let response = await fetch(apiUrl);

      let data = await response.json();

      if (response.ok) {
        setTaskLIst(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const addTask = async (event) => {
    if (event.key == "Enter") {
      try {
        let response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify([...taskList, task]),
        });

        if (response.ok) {
          getTaskList();
        }
      } catch (error) {
        console.log("error");
      }
      setTask({ label: "", done: false });
    }
  };

  const deleteTask = async (id) => {
    let updatedList = taskList.filter((item, index) => id != index);

    try {
      let response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedList),
      });

      if (response.ok) {
        getTaskList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //función para borrar todas las tareas. Aún no funciona...
  const deleteAllList = async (taskList) => {
    let emptyList = taskList.splice(0, taskList.length);

    try {
      let response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(emptyList),
      });
      if (response.ok) {
        getTaskList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen h-full text-gray flex justify-center py-20 px-5">
      <div className="container flex flex-col max-w-xl">
        <h1 className="text-white text-2xl text-center font-bold mb-3">
          To Do List
        </h1>
        <input
          type="text"
          placeholder="Agrega tu tarea"
          name="label"
          value={task.label}
          className="pl-3 w-full py-2 bg-gray-700 rounded-lg outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-white"
          onChange={handleChange}
          onKeyDown={addTask}
        />
        <ul>
          {taskList.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center text-white border-b border-solid border-gray-800 group "
              >
                <li className="py-3">{item.label}</li>
                <svg
                  onClick={() => deleteTask(index)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 hidden group-hover:block hover:cursor-pointer hover:fill-current hover:text-red-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            );
          })}
        </ul>
        <p className="text-xs text-white pt-2 mt-2">
          Te quedan {taskList.length} tareas{" "}
        </p>
        <button
          type="subtmit"
          onClick={() => deleteAllList(taskList)}
          className="w-full bg-red-500 py-2 rounded-lg mt-4 text-white font-bold hover:bg-red-600"
        >
          Eliminar todas las tareas
        </button>
      </div>
    </div>
  );
};

export default Home;
