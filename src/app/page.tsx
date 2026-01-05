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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  List,
  ListCheck,
  Plus,
  Sigma,
  Trash,
  TriangleAlert,
} from "lucide-react";

import { getTasks } from "@/actions/get-tasks-from-db";
import { useEffect, useState } from "react";

import { Tasks } from "@prisma/client";
import { NewTask } from "@/actions/add.task";

export default function Home() {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");

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
    try {
      if (task.length === 0 || !task) {
        return;
      }

      const myNewTask = await NewTask(task);
      if (!myNewTask) return;
      setTaskList((prevTasks) => [...prevTasks, myNewTask]);
      setTask("");
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTask = async (id: string) => {};

  useEffect(() => {
    handleGetTasks();
  }, []);

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
            <Plus />
            Register
          </Button>
        </CardHeader>
        <Button onClick={handleGetTasks}>Search Tasks</Button>

        <CardContent>
          <Separator className="mb-4" />
          <div className="flex gap-2">
            <Badge className="cursor-pointer" variant="default">
              <List />
              All
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <TriangleAlert />
              Incomplete
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <Check />
              Completed
            </Badge>
          </div>

          <div className="mt-4 border-b">
            {taskList.map((task) => (
              <div
                key={task.id}
                className=" h-14 flex justify-between items-center border-t"
              >
                <div className="w-1 h-full bg-green-300"></div>
                <p className="flex-1 px-2 text-sm">{task.task}</p>
                <div className="flex gap-2 items-center">
                  <EditTask />

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
              <p className="text-xs">Completed tasks (3/3)</p>
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
                  <AlertDialogAction>Confirm</AlertDialogAction>
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
            <p className="text-xs">3 tasks in total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
