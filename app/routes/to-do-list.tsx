import type { Route } from "./+types/to-do-list";
import { tasks } from "~/lib/tasks";
import { ToDoApp } from "../components/to-do-app/to-do-app";
import { data } from "react-router";

// FakeDB
const taskList = tasks;
let taskIndex = taskList.length;

export function loader() {
    return { taskList };
}

export async function action({request}: Route.ActionArgs) {
    const body = await request.formData();
    const action = body.get("_action");

    if (action !== "create" && action !== "delete" && action !== "check") {
        return data(
            { message: "Invalid Action" },
            { status: 405 } // Method Not Allowed
        );
    }

    if (action==="check"){

        const taskId = body.get("id");
        const taskIsChecked = body.get("isChecked")

        if (typeof taskId !== "string") {
            return data(
                { message: "Invalid Id" },
                { status: 400 }
            );
        }

        if (typeof taskIsChecked !== "string") {
            return data(
                { message: "Invalid Check" },
                { status: 400 }
            );
        }

        if (taskIsChecked!=="false" && taskIsChecked!=="true"){
            return data(
                { message: "Invalid Check value" },
                { status: 400 }
            );
        }

        const isChecked = taskIsChecked === "true"; //True or False it is "false"

        const id = parseInt(taskId);

        //Search the task with the id in the array
        const taskToCheck = taskList.find(task => task.id === id);

        if (taskToCheck) {
            // Change the value, "taskToCheck" is a refference of the object in array
            taskToCheck.isChecked = isChecked;
            return data(
                { message: "Task checked successfully" },
                { status: 200 }
            );
        }

        return data(
            { message: "Task with ID " + id + " not found" },
            { status: 404 }
        );
    }

    if (action==="create"){

        const taskText = body.get("taskText")

        if (typeof taskText !== "string") {
            return data(
                { message: "Invalid task Text" },
                { status: 400 }
            );
        }
    
        taskIndex++;

        const taskObject = {
            id: taskIndex,
            task: taskText,
            isChecked: false
        };

        taskList.push(taskObject);
        
        return data(
            { message: "Task added successfully" },
            { status: 201 }
        );
    }  

    if (action==="delete"){

        const taskId = body.get("id");

        if (typeof taskId !== "string") {
            return data(
                { message: "Invalid Id" },
                { status: 400 }
            );
        }

        const id = parseInt(taskId);
        const taskToDelete = taskList.findIndex(task => task.id === id);

        if (taskToDelete !== -1) {
            taskList.splice(taskToDelete, 1);

            return data(
                { message: "Task with Id : " + id + "deleted" },
                { status: 200 }
            );
        }

        return data(
            { message: "Task with ID " + id + " not found" },
            { status: 404 }
        );
    }
}



export default function ToDoList({loaderData}: Route.ComponentProps) {
    return <ToDoApp tasks={loaderData.taskList}></ToDoApp>;
}