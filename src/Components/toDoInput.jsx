import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook } from "@fortawesome/free-solid-svg-icons";
library.add(faBook);
function Input({ setToDo, toDo }) {
  const [newToDo, setNewToDo] = useState("");
  
  const handleChange = (e) => {
    setNewToDo(e.target.value);
  };
  const handleToDo = () => {
    if (newToDo.trim()) {
      setToDo([...toDo, { text: newToDo, completed: false }]);
      setNewToDo("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleToDo();
    }
  };
  return (
    <>
      <div className="Input">
        <h2>ToDo Input</h2>
        <div>
          <div className="boook">
            <span>
              <FontAwesomeIcon
                icon="fa-solid fa-book"
                style={{ color: "white" }}
                className="book"
              />
            </span>
          </div>

          <input
            type="text"
            placeholder="New ToDo"
            value={newToDo}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            className="input"
          />
        </div>
        <div>
          <button onClick={handleToDo} className="add">
            Add New Task
          </button>
        </div>
      </div>
    </>
  );
}

export default Input;
