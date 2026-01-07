"use server";
import { prisma } from "@/utils/prisma";

type EditTaskProps = {
  id: string;
  task: string;
};

export const editTask = async ({ id, task }: EditTaskProps) => {
  try {
    if (!id || !task) return;

    const editedTask = await prisma.tasks.update({
      where: { id },
      data: { task },
    });

    if (!editedTask) return;
  } catch (error) {
    throw error;
  }
};
