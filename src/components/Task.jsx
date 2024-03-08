import React, { useEffect, useState } from "react";

const Task = (props) => {
  const [item, setitem] = useState(props);
  console.log(item.done)
  useEffect(() => {
    setitem(props);
  }, [props]);
  const deleteIt = () => {
    item.deleteClick(item.idx);
  };
  const editIt = () => {
    item.editClick(item.idx);
  };
  const doneIt = () => {
    item.doneClick(item.idx);
  }

  return (
    <div className="text-xl flex p-2 bg-slate-900 rounded-lg w-max">
      <div className="flex w-20 items-center">
        <div className="text-2xl rounded-lg px-1 text-white font-extrabold">
          #{item.idx + 1}
        </div>
      </div>
      <div className="flex w-max items-center">
        <div className="text-blue-200 font-semibold overflow-hidden w-44 overflow-x-scroll p-2">
          {item.task}
        </div>  
        <div className="text-blue-200 font-semibold overflow-hidden w-56 overflow-x-scroll p-2">
          {item.desc}
        </div>
        <div className="text-blue-200 font-semibold overflow-hidden w-44 overflow-x-scroll p-2">
          {item.dueDate 
            ? new Date(item.dueDate).toUTCString().slice(0, 16)
            : "No Due Date"}
        </div>
        <div className="text-blue-200 font-semibold overflow-hidden w-44 overflow-x-scroll p-2">
          {item.priority === "Low" ? (
            <span className="text-green-400">{item.priority}</span>
          ) : item.priority === "Medium" ? (
            <span className="text-yellow-400">{item.priority}</span>
          ) : (
            <span className="text-red-400">{item.priority}</span>
          )  
          }
        </div>
      </div>
      <div className="flex w-1/3 px-1 justify-end">
        <button
          className="bg-transparent p-1 rounded-lg px-2 text-blue-600 hover:bg-slate-800 gap-2 flex items-center text-2xl"
          onClick={editIt}
        >
          <i className="bx bxs-edit"></i>
          Edit
        </button>
        <button
          className="bg-transparent p-1 rounded-lg px-2 text-rose-500 hover:bg-slate-800 gap-2 flex items-center text-2xl"
          onClick={deleteIt}
        >
          <i className="bx bxs-trash"></i>
          Delete
        </button>
        <button
          className="bg-transparent p-1 rounded-lg px-2 text-green-400 hover:bg-slate-800 gap-2 flex items-center text-2xl"
          onClick={doneIt}
        >
          {
            !item.done
            ? <i className="bx bxs-check-circle"></i>
            : <i className="bx bxs-x-circle"></i>
          }
          {item.done ? "Undo" : "Done"}
        </button>
        
      </div>
    </div>
  );
};

export default Task;
