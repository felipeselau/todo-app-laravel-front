import { CheckCircle, PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { iTask } from "../utils/interfaces";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../context/TasksContext";
import { CircularProgress } from "@mui/material";

interface iProps {
  task: iTask;
}

export const Task = ({ task }: iProps) => {
  const { toggleTaskCompleted } = useContext(TasksContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleCompleteCheck = async (e: React.MouseEvent) => {
    setIsLoading(true);
    await toggleTaskCompleted(task);
    setIsLoading(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    console.log(e);
  };

  const handleDelete = (e: React.MouseEvent) => {
    console.log(e);
  };

  return (
    <div
      key={task.id}
      className="w-1/2 flex flex-col border-2 border-purple-700 rounded-lg"
    >
      <div className="task-header bg-purple-600 w-100 px-2 py-1 text-white font-semibold text-sm">
        <span>id: {task.id}</span>
      </div>
      <div className="task-body py-4 px-6 flex justify-between text-lg">
        <div
          style={{ textDecoration: task.is_completed ? "line-through" : "" }}
        >
          {task.name}
        </div>
        <div className="text-purple-700">
        {isLoading? <CircularProgress color="inherit" size={26}/> : 
        <CheckCircle
          size={32}
          weight={task.is_completed ? "fill" : "regular"}
          className="hover:opacity-70 cursor-pointer"
          onClick={(e) => {
              handleCompleteCheck(e);
            }}
        />
        }
        </div>
      </div>
      <div className="task-footer"></div>
    </div>
  );
};
