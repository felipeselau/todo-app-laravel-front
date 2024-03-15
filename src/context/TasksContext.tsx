import { createContext, useState } from "react";
import { iChildren, iTask } from "../utils/interfaces";
import { baseURL } from "../utils/api";

interface iTaskContext {
    //Variáveis
    taskData: iTask[];

    //Métodos
    fetchTasks: ()=>{};
    toggleTaskCompleted: (task: iTask)=>{};
    postTask: (taskName: string)=>{};
}

export const TasksContext = createContext({} as iTaskContext);

export const TasksProvider = ({ children }: iChildren)=>{
    const [taskData, setTaskData] = useState<iTask[] | []>([]);

    const fetchTasks = async ()=>{
        try{
            const response = await fetch(baseURL);
            if(response.ok){
                const data = await response.json();
                setTaskData(data.data.reverse());
            }
        }catch(e){
            console.error(e);
        }
    }

    const fetchTask = async (task: iTask) => {
        try{
            const response = await fetch(`${baseURL}/${task.id}`);
            if(response.ok){
                const data = await response.json();
            }
        }catch(e){
            console.error(e);
        }
    }

    const toggleTaskCompleted = async (task: iTask)=> {
        try{
            const response = await fetch(`${baseURL}/${task.id}/complete`,{
                "method": "PATCH",
                "headers": {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({"is_completed": (!task.is_completed)})
            
            })

            if(response.ok){
                const data = await response.json();
                fetchTasks();
            }
        }catch(e){
            console.error(e)
        }
    }

    const postTask = async (taskName: string) => {
        try{
            const response = await fetch(baseURL, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                "body": JSON.stringify({'name' : taskName})
            })
            if(response.ok){
                fetchTasks();
            }
        }catch(e){
            console.error(e);
        }
    }



    return(
        <TasksContext.Provider value={{ taskData ,fetchTasks, toggleTaskCompleted, postTask }}>
            {children}
        </TasksContext.Provider>
    )
}