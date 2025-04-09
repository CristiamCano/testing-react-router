import { Form } from "react-router";

//hooker
import { useState } from "react";
import { useFetcher } from "react-router";

//lucide
import { X } from "lucide-react";

// shadcn
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type TaskItemProps = {
    id : number;
    task: string;
    isChecked: boolean
}

export function TaskListItem({id, task, isChecked}: TaskItemProps){

    const [isCheckedState, setIsCheckedState] = useState(isChecked);  // State for Checkbox
    const fetcher = useFetcher(); // useFetcher to handle request

    // Function to "onCheckedChange" where "check : boolean" is checkBox status. 
    const handleCheckboxChange = async (check : boolean) => {
        setIsCheckedState(check);

        const formData = new FormData();
        formData.append("_action", "check");
        formData.append("id", id.toString());
        formData.append("isChecked", check.toString());

        fetcher.submit(formData, {
            method: "post",
            action: "/to-do-list",
        });
    }

    // Handle delete action when button is clicked
    const handleDelete = async () => {

        const formData = new FormData();
        formData.append("_action", "delete");
        formData.append("id", id.toString());

        fetcher.submit(formData, {
            method: "post",
            action: "/to-do-list",
        });
    };

    return(
        <div className="flex justify-between items-center">
            <Checkbox
                id={`${id}`}
                checked={isCheckedState}
                onCheckedChange={handleCheckboxChange}
            />
            <Label
                htmlFor={`${id}`}
                className={isCheckedState ? "line-through" : ""}
            >
                {task}
            </Label>
            <Form method="post">
                <input type="hidden" name="id" value={id} />
                <Button onClick={handleDelete}>
                    <X />
                </Button>
            </Form>
        </div>
    );
}