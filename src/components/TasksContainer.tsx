import { useContext, useEffect, useState } from "react";
import { Task } from "./Task";
import { iTask } from "../utils/interfaces";
import { TasksContext } from "../context/TasksContext";
import { CircularProgress, Skeleton } from "@mui/material";

export const TasksContainer = () => {
  const { fetchTasks, taskData } = useContext(TasksContext);

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <section className="w-screen flex flex-col items-center gap-4 mt-8">
      {taskData.length > 0? 
        taskData.map((task: iTask)=>(
            <Task task={task} key={task.id}/>
        )) :
        <>
        <Skeleton variant="rounded" height={96} width={956} sx={{ bgcolor: "rgba(107, 33, 168, 0.4)"}}/>
        <Skeleton variant="rounded" height={96} width={956} sx={{ bgcolor: "rgba(107, 33, 168, 0.4)"}}/>
        <Skeleton variant="rounded" height={96} width={956} sx={{ bgcolor: "rgba(107, 33, 168, 0.4)"}}/>
        <Skeleton variant="rounded" height={96} width={956} sx={{ bgcolor: "rgba(107, 33, 168, 0.4)"}}/>
        <Skeleton variant="rounded" height={96} width={956} sx={{ bgcolor: "rgba(107, 33, 168, 0.4)"}}/>
        </>
      }
    </section>
  );
};
