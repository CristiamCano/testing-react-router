import { TaskListItem } from "./task-list-item";

// hooker
import { useState } from "react";
import { useFetcher } from "react-router";

// shadcn
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "../ui/card";
import { Input } from "../ui/input";

type TasksList = {
    tasks: { 
        id: number;
        task: string;
        isChecked: boolean;
    } [];  //Task is an Array of objects
}

export function ToDoApp({ tasks } : TasksList){
    
    const [taskText, setTaskText] = useState(""); // Capturing Text input

    const fetcher = useFetcher(); // hook useFetcher to hablde async request

    // Handle task submit (add task)
    const handleAddTask = async () => {

        if (taskText === ""){
            return alert("Task cannot be empty");
        }

        const formData = new FormData();
        formData.append("_action", "create");
        formData.append("taskText", taskText);

        fetcher.submit(formData, {
            method: "post",
            action: "/to-do-list",
        });

        setTaskText(""); //Clear text
    };

    return (
        <div className="flex items-center justify-center">
            <Card className="w-96">
                <CardHeader className="gap-3">
                    <CardTitle className="text-center">To Do App</CardTitle>
                    <div className="flex items-center space-x-2">
                        <Input
                            name="taskText"
                            value={taskText}
                            onChange={(e) => setTaskText(e.target.value)}
                            placeholder="Write a task"
                        />
                        <Button onClick={() => handleAddTask()} >Add</Button>
                    </div>

                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {
                        tasks.map(
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