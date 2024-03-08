import React, { useEffect, useRef, useState } from "react";
import Tasks from "../../data.js";
import Task from "./Task.jsx";

const AddTask = () => {
  const [idxVal, setValue] = useState(-1);
  const taskRef = useRef(null);
  const descRef = useRef(null);
  const dueDateRef = useRef(null);
  const priorityRef = useRef(null);

  const [addBtn, setAddBtn] = useState(true);
  const [TasksArray, setTasks] = useState(
    window.localStorage.getItem("Tasks")
      ? JSON.parse(window.localStorage.getItem("Tasks"))
      : Tasks
  );

  const [search, setSearch] = useState("");

  const handleClick = async () => {
    setAddBtn(true);
    const taskValue = taskRef.current.value;
    const descvalue = descRef.current.value;
    const dueDateValue = dueDateRef.current.value;
    const priorityValue = priorityRef.current.value;
    const doneValue = false;

    if (!taskValue) return alert("Task Name is required");
    if (!descvalue) return alert("Description is required");
    if (!dueDateValue) return alert("Due Date is required");

    setTasks([
      ...TasksArray,
      {
        task: taskValue,
        desc: descvalue,
        dueDate: dueDateValue,
        priority: priorityValue,
        done: doneValue,
      },
    ]);

    taskRef.current.value = "";
    descRef.current.value = "";
    dueDateRef.current.value = "";
    priorityRef.current.value = "Low";
  };

  const deleteClick = (idx) => {
    setTasks(TasksArray.filter((item, index) => index !== idx));
  };

  const editClick = async (idx) => {
    setValue(idx);
    setAddBtn(false);
    taskRef.current.value = TasksArray[idx].task;
    descRef.current.value = TasksArray[idx].desc;
    dueDateRef.current.value = TasksArray[idx].dueDate;
    priorityRef.current.value = TasksArray[idx].priority;
  };

  const editClickFunction = async () => {
    setAddBtn(true);
    const taskValue = taskRef.current.value;
    const descvalue = descRef.current.value;
    const dueDateValue = dueDateRef.current.value;
    const priorityValue = priorityRef.current.value;

    const newArray = TasksArray.map((item, index) => {
      if (idxVal === index) {
        return {
          task: taskValue ? taskValue : "No Task Name",
          desc: descvalue ? descvalue : "No Description",
          dueDate: dueDateValue ? dueDateValue : "No Due Date",
          priority: priorityValue ? priorityValue : "No Priority",
          done: item.done,
        };
      }
      return item;
    });
    setTasks(newArray);
    taskRef.current.value = "";
    descRef.current.value = "";
    dueDateRef.current.value = "";
    priorityRef.current.value = "Low";
    setValue(-1);
  };

  const doneClick = (idx) => {
    console.log(TasksArray[idx].done, idx)
    TasksArray[idx].done = !TasksArray[idx].done;
    setTasks([...TasksArray]);
  };

  useEffect(() => {
    window.localStorage.setItem("Tasks", JSON.stringify(TasksArray));
  }, [TasksArray]);

  

  return (
    <div className="flex flex-col gap-4 bg-black rounded-lg p-2 w-full">
      <div className="flex gap-5 justify-center sticky top-20 bg-black p-4">
        <input
          ref={taskRef}
          type="text"
          placeholder="Enter Task"
          className="text-center p-1 rounded-lg h-12 bg-slate-700 text-slate-300 placeholder:text-slate-300  text-xl outline-0 w-56 font-medium"
        />
        <input
          ref={descRef}
          type="text"
          placeholder="Enter Description"
          className="text-center p-1 rounded-lg h-12 bg-slate-700 text-slate-300 placeholder:text-slate-300  text-xl outline-0 w-56 font-medium"
        />
        <input
          ref={dueDateRef}
          placeholder="Due Date"
          type="date"
          className="text-center p-1 rounded-lg h-12 bg-slate-700 text-slate-300 placeholder:text-slate-300 text-xl outline-0 w-56 font-medium cursor-pointer"
        />
        <select
          ref={priorityRef}
          placeholder="Priority"
          className="text-center p-1 rounded-lg h-12 bg-slate-700 text-slate-300 placeholder:text-slate-300 text-xl outline-0 w-56 font-medium border-none"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          className="text-center h-12 rounded-lg bg-slate-800 text-teal-400 font-semibold text-xl outline-0 w-44 hover:bg-slate-900"
          onClick={addBtn ? handleClick : editClickFunction}
        >
          {addBtn ? "Add Task" : "Update"}
        </button>
      </div>
      <div className="flex flex-col p-2 bg-black rounded-lg gap-2">
      <input
        type="text"
        placeholder="Search"
        className="text-white text-3xl font-bold text-center p-2 bg-slate-600 rounded-lg w-full"
        onChange={(e) => setSearch(e.target.value)}
      />
      {
        TasksArray
          .filter((single) => single.task.toLowerCase().includes(search.toLowerCase()) && search !== "")
          .map((single, idx) => (
            <Task
              task={single.task}
              desc={single.desc}
              dueDate={single.dueDate}
              priority={single.priority}
              done={single.done}
              key={idx}
              idx={idx}
              deleteClick={deleteClick}
              editClick={editClick}
              doneClick={doneClick}
            />
          ))
      } 
        {/* <h1 className="text-white text-3xl font-bold text-center p-2 bg-slate-800 rounded-lg w-full">
          All Tasks
        </h1>
        {
          TasksArray.map((single, idx) => (
            <Task
              task={single.task}
              desc={single.desc}
              dueDate={single.dueDate}
              priority={single.priority}
              done={single.done}
              key={idx}
              idx={idx}
              deleteClick={deleteClick}
              editClick={editClick}
              doneClick={doneClick}
            />
          ))
        } */}
        <h1 className="text-white text-3xl font-bold text-center p-2 bg-slate-800 rounded-lg w-full">
          Upcoming
        </h1>
        {TasksArray.map((single, idx) => (
          !single.done && new Date(single.dueDate) >= new Date()) && (
          <Task
            task={single.task}
            desc={single.desc}
            dueDate={single.dueDate}
            priority={single.priority}
            done={single.done}
            key={idx}
            idx={idx}
            deleteClick={deleteClick}
            editClick={editClick}
            doneClick={doneClick}
          />
        ))}

        <h1 className="text-white text-3xl font-bold text-center p-2 bg-slate-800 rounded-lg w-full">
          Overdue
        </h1>
        {TasksArray
        .map((single, idx) => (!single.done && new Date(single.dueDate) < new Date()) && (
          <Task
            task={single.task}
            desc={single.desc}
            dueDate={single.dueDate}
            priority={single.priority}
            done={single.done}
            key={idx}
            idx={idx}
            deleteClick={deleteClick}
            editClick={editClick}
            doneClick={doneClick}
          />
        ))}

        <h1 className="text-white text-3xl font-bold text-center p-2 bg-slate-800 rounded-lg w-full">
          Completed
        </h1>
        {TasksArray
          .map((single, idx) => (single.done) && (
          <Task
            task={single.task}
            desc={single.desc}
            dueDate={single.dueDate}
            priority={single.priority}
            done={single.done}
            key={idx}
            idx={idx}
            deleteClick={deleteClick}
            editClick={editClick}
            doneClick={doneClick}
          />
        ))}
      </div>
    </div>
  );
};

export default AddTask;
