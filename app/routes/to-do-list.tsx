import type { Route } from "./+types/to-do-list";
import { tasks as tasksDb } from "~/lib/tasks";
import { useState } from 'react';
import { data, useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { TaskListItem } from "~/components/to-do-app/task-list-item"

export function loader() {
    // Fake DB
    const taskList = tasksDb;
    let taskIndex = taskList.length;
    return { taskList };
}

export async function action({request}: Route.ActionArgs) {
    // Fake DB
    const taskList = tasksDb;
    let taskIndex = taskList.length;
    const body = await request.formData();
    const action = body.get("_action");

    
    if (action==="check"){
        const taskId = body.get("id")?.toString();
        const taskIsChecked = body.get("isChecked")?.toString();

        const isChecked = taskIsChecked === "true"; //True or False it is "false"

        if (!taskId) {
            return {};
        }
        const id = parseInt(taskId);

        //Search the task with the id in the array
        const taskToCheck = taskList.find(task => task.id === id);

        if (!taskToCheck) {
            return data(
                { message: "Task with ID " + id + " not found" },
                { status: 404 }
            );
        }
        // Change the value, "taskToCheck" is a reference of the object in array
        taskToCheck.isChecked = isChecked;
        return data(
            { message: "Task checked successfully" },
            { status: 200 }
        );

    } else if (action==="create"){
        const taskText = body.get("taskText")?.toString()
        if (!taskText) {
            return {};
        }

        taskIndex++;
        taskList.push({
            id: taskIndex,
            task: taskText,
            isChecked: false
        });
        
        return data(
            { message: "Task added successfully" },
            { status: 201 }
        );
    }   else if (action==="delete"){

        const taskId = body.get("id")?.toString();
        if (!taskId) {
            return {};
        }

        const id = parseInt(taskId);
        const taskToDelete = taskList.findIndex(task => task.id === id);

        if (taskToDelete === -1) {
            return data(
                { message: "Task with ID " + id + " not found" },
                { status: 404 }
            );
        }

        taskList.splice(taskToDelete, 1);
        return data(
            { message: "Task with Id : " + id + "deleted" },
            { status: 200 }
        );

    } else {
        return data(
            { message: "Invalid Action" },
            { status: 405 } // Method Not Allowed
        );
    }
}

export default function ToDoList({loaderData}: Route.ComponentProps) {
    const fetcher = useFetcher(); // hook useFetcher to handle async request

    return (
        <div className="flex items-center justify-center">
            <Card className="w-96">
                <CardHeader className="gap-3">
                    <CardTitle className="text-center">To Do App</CardTitle>
                    <fetcher.Form 
                        className="flex items-center space-x-2" 
                        method="post"
                    >
                        <Input
                            name="taskText"
                            placeholder="Write a task"
                        />
                        <Button name="_action" value="create" type="submit">Add</Button>
                    </fetcher.Form>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {
                        loaderData.taskList.map(
                            ({id, task, isChecked}) => (
                                <TaskListItem
                                    key={id}
                                    id={id}
                                    task={task}
                                    isChecked = {isChecked}
                                />
                            )
                        )
                    }
                </CardContent>
            </Card>
        </div>
    );
}