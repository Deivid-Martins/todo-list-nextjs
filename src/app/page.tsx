"use client";

import { EditTask } from "@/components/edit-task";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ListCheck, Plus, Sigma, Trash } from "lucide-react";

import { getTasks } from "@/actions/get-tasks-from-db";
import { useEffect, useState } from "react";

import { Tasks } from "@prisma/client";
import { NewTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-task";
import { toast } from "sonner";
import { updateTaskStatus } from "@/actions/toggle-done";
import { Filter, FilterType } from "@/components/filter";
import { deleteAllTasks } from "@/actions/delete-all-tasks";

export default function Home() {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks();
      if (!tasks) return;
      setTaskList(tasks);
    } catch (error) {
      throw error;
    }
  };

  const handleAddTask = async () => {
    setLoading(true);
    try {
      if (task.length === 0 || !task) {
        toast.error("Please enter a task.");
        return;
      }

      const myNewTask = await NewTask(task);
      if (!myNewTask) return;
      setTaskList((prevTasks) => [...prevTasks, myNewTask]);
      setTask("");
      toast.success("Task added successfully");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      if (!id) return;
      const deletedTask = await deleteTask(id);

      if (!deletedTask) return;
      setTaskList((prevTasks) =>
        prevTasks.filter((task) => task.id !== deletedTask.id)
      );

      toast.success("Task deleted successfully");
    } catch (error) {
      throw error;
    }
  };

  const handleToggleTask = async (id: string) => {
    const previewTasks = [...taskList];

    try {
      setTaskList((prev) => {
        const updatedTasks = prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done,
            };
          }
          return task;
        });
        return updatedTasks;
      });

      await updateTaskStatus(id);
    } catch (error) {
      setTaskList(previewTasks);
      throw error;
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      deleteAllTasks();
      setTaskList([]);
      toast.success("All tasks deleted successfully");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(taskList);
        break;
      case "completed":
        setFilteredTasks(taskList.filter((task) => task.done));
        break;
      case "incomplete":
        setFilteredTasks(taskList.filter((task) => !task.done));
        break;
      default:
        setFilteredTasks(taskList);
        break;
    }
  }, [currentFilter, taskList]);

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Add new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button className="cursor-pointer" onClick={handleAddTask}>
            {loading ? <Plus className="animate-spin" /> : <Plus />}
            Register
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />
          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
          <div className="mt-4 border-b">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className=" h-14 flex justify-between items-center border-t hover:bg-gray-100 duration-300"
              >
                <div
                  className={`w-1 h-full ${
                    task.done ? "bg-green-400" : "bg-red-400"
                  }`}
                ></div>
                <p
                  className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700"
                  onClick={() => handleToggleTask(task.id)}
                >
                  {task.task}
                </p>
                <div className="flex gap-2 items-center">
                  <EditTask task={task} handleGetTasks={handleGetTasks} />

                  <Trash
                    size={16}
                    className="cursor-pointer"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs">
                Completed tasks ({taskList.filter((task) => task.done).length}/
                {taskList.length})
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-xs h-7 cursor-pointer"
                  variant="outline"
                >
                  <Trash />
                  Clear completed tasks
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete these x tasks?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAllTasks}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">{taskList.length} tasks in total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
