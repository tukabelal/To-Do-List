import React, { useState } from "react";
import "./App.css";
import Input from "./Components/toDoInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faPen);

function App() {
  const [toDo, setToDo] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleEdit = (index) => {
    const updatedToDos = toDo.map((task, i) => {
      if (i === index) {
        return { ...task, isEditing: true };
      }
      return task;
    });
    setToDo(updatedToDos);
  };

  const handleSave = (index, newText) => {
    const updatedToDos = toDo.map((task, i) => {
      if (i === index) {
        return { ...task, text: newText, isEditing: false };
      }
      return task;
    });
    setToDo(updatedToDos);
  };

  const handleDelete = (index) => {
    const updatedToDos = toDo.filter((_, i) => i !== index);
    setToDo(updatedToDos);
  };

  const handleCheckboxChange = (index) => {
    const updatedToDos = toDo.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setToDo(updatedToDos);
  };
  const handleDeleteDone = () => {
    const updatedToDos = toDo.filter((task) => !task.completed);
    setToDo(updatedToDos);
  };
  const handleDeleteAll = () => {
    setToDo([]);
  };

  const filteredToDo = toDo.filter((task) => {
    if (filter === "done") return task.completed;
    if (filter === "todo") return !task.completed;
    return true;
  });

  return (
    <>
      <Input setToDo={setToDo} toDo={toDo} />
      <div className="toDo">
        <h2>ToDo List</h2>
        <button className="all" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="done" onClick={() => setFilter("done")}>
          Done
        </button>
        <button className="todo" onClick={() => setFilter("todo")}>
          ToDo
        </button>
        <br />
        <br />

        <table className="table">
          {filteredToDo.map((task, index) => (
            <tr key={index}>
              <td className="task-container">
                {task.isEditing ? (
                  <>
                    <input
                      type="text"
                      defaultValue={task.text}
                      onBlur={(e) => handleSave(index, e.target.value)}
                      className="inpEdit"
                    />
                    <button
                      onClick={() => handleSave(index, task.text)}
                      className="save"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      className="task-text"
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        color: task.completed ? "rgb(164, 115, 115)" : "initial",
                        textDecorationColor: task.completed ? "rgb(233, 14, 14)" : "initial",
                      }}
                    >
                      {task.text}
                    </span>
                    <div className="actions">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleCheckboxChange(index)}
                        className="checkbox"
                      />
                      <button
                        onClick={() => handleEdit(index)}
                        className="edit"
                      >
                        <span>
                          <FontAwesomeIcon
                            icon="fa-solid fa-pen"
                            style={{ color: "#31891f" }}
                          />
                        </span>
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="delete"
                      >
                        <span>
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "rgb(205, 9, 9)" }}
                          />
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </td>
              <hr style={{ border: "1px solid rgb(81, 74, 74)" }} />
            </tr>
          ))}
        </table>
        <button onClick={handleDeleteDone} className="deleteD">
          Delete Done Tasks
        </button>
        <button onClick={handleDeleteAll} className="deleteA">
          Delete All Tasks
        </button>
      </div>
    </>
  );
}

export default App;
