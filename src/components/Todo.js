import React, { useState, useEffect } from "react";
import "../styles/style.css";

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
function Todo() {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(getLocalData());
  const [isEdit, setIsEdit] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the item function
  const addItem = () => {
    if (!inputData) {
      alert("plz fill the data");
    } else if (inputData && toggleButton) {
      setItem(
        item.map((currId) => {
          if (currId.id === isEdit) {
            return { ...currId, name: inputData };
          }
          return currId;
        })
      );
      setInputData("");
      setIsEdit(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItem([...item, myNewInputData]);
      setInputData("");
    }
  };

  // edit the item

  const editItem = (index) => {
    const item_todo_edited = item.find((currId) => {
      return currId.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEdit(index);
    setToggleButton(true);
  };

  // delete item
  const deleteItem = (id) => {
    const updateItem = item.filter((curr) => {
      return curr.id !== id;
    });
    setItem(updateItem);
  };

  // remove all itemm
  const removeAllItem = () => {
    setItem([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(item));
  }, [item]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Item "
              className="from-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show our item */}
          <div className="showItems">
            {item.map((res) => {
              return (
                <div className="eachItem" key={res.id}>
                  <h3>{res.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(res.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(res.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAllItem}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
