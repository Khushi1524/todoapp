import "./App.css";
import { useState, useRef, useEffect } from "react";
import Todoheader from "./component/Todoheader";

function App() {
  const [arr, setarr] = useState([]);
  const inputref = useRef();
  const logo =
    "https://static.vecteezy.com/system/resources/previews/000/963/090/original/cartoon-man-with-to-do-list-on-clipboard-vector.jpg";

  function Addtask() {
    let val = inputref.current.value;
    setarr([...arr, val]);
    inputref.current.value = "";
  }

  function Deletetask(index) {
    let arr2 = [...arr];
    arr2.splice(index, 1);
    setarr(arr2);
  }

  function Edittask(index) {
    let arr3 = [...arr];
    let oldvalue = arr3[index];
    let newvalue = prompt(
      "Enter the new value that you want to replace with : " + oldvalue
    );
    arr3[index] = newvalue;
    setarr(arr3);
  }

  useEffect(() => {
    if (localStorage.getItem("task") != null) {
      let task = localStorage.getItem("task");
      task = JSON.parse(task);
      setarr(task);
    }
  }, []);

  useEffect(() => {
    if (arr.length != 0) {
      let task = JSON.stringify(arr);
      localStorage.setItem("task", task);
    }
  }, [arr]);

  return (
    <center>
      <div className="header">
        <Todoheader />
        <div className="inputbx">
          <input placeholder="What would you like to do?" ref={inputref} />
          <div className="add">
            <button onClick={Addtask}>Add</button>
          </div>
        </div>
      </div>
      <div className="tasks">
        {arr.length === 0 ? <img src={logo} alt="Logo" /> : null}

        <ul>
          <div className="newtask">
            {arr.map((task, index) => (
              <li key={index}>
                {task}
                <div className="listbtn">
                  <button id="btn1" onClick={() => Edittask(index)}>
                    Edit
                  </button>
                  <button id="btn2" onClick={() => Deletetask(index)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </center>
  );
}

export default App;
