import { useContext, useState } from "react"
import { TasksContext } from "../context/TasksContext";
import { CircularProgress } from "@mui/material";

export const Header = () => {
    const { postTask } = useContext(TasksContext);

    const [taskInput, setTaskInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e: React.FormEvent) => {
        const el: any = e.target;
        setTaskInput(el.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await postTask(taskInput);
        setTaskInput("");
        setIsLoading(false);
    }

    return(
        <header
            className="bg-purple-800 w-screen p-32 text-white flex flex-col items-center gap-4"
        >
            <h1
            className="text-5xl font-bold"
            >Todo App</h1>
            <form 
            action="#"
            className="input-wrapper flex items-center gap-4"
            onSubmit={(e)=>{handleSubmit(e)}}
            >
                <input 
                type="text"
                name="name"
                className="p-2 rounded text-black"
                placeholder="Add Your Task..." 
                value={taskInput}
                onInput={(e)=>{handleInput(e)}}
                required
                />
                <button
                type="submit"
                className="bg-purple-400 hover:bg-purple-600 p-2 rounded"
                >{
                    isLoading? <CircularProgress color="inherit" sx={{
                        height: "20px !important",
                        width: "20px !important"
                    }}/> : "Add Task"
                }
                </button>
            </form>


        </header>
    )
}