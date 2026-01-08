"use server";

import { prisma } from "@/utils/prisma";

export async function deleteAllTasks() {
  try {
    await prisma.tasks.deleteMany({});
  } catch (error) {
    throw error;
  }
}
