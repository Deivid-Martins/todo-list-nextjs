import { SquarePen } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tasks } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { editTask } from "@/actions/edit-task";

type taskProps = {
  task: Tasks;
  handleGetTasks: () => void;
};

export function EditTask({ task, handleGetTasks }: taskProps) {
  const [editedTask, setEditedTask] = useState<string>(task.task);

  const handleEditTask = async () => {
    try {
      if (editedTask === task.task) {
        toast.error("No changes made to the task.");
        return;
      }
      toast.success("Task edited successfully!");
      await editTask({ id: task.id, task: editedTask });
      handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen size={16} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            placeholder="Edit task"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <DialogClose asChild>
            <Button className="cursor-pointer" onClick={handleEditTask}>
              Save
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
