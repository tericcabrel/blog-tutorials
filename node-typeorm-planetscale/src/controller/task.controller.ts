import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Task, TaskStatus } from "../entity/Task";

type CreateTaskInput = {
  name: string;
  description?: string;
  dueDate: Date;
}

type UpdateTaskInput = Partial<CreateTaskInput> & {
  status?: TaskStatus;
};

export const createTask = async (req: Request, res: Response) => {
  const input: CreateTaskInput = req.body;

  try {
    const createdTask = await getRepository(Task).save({ ...input });

    return res.json({ data: createdTask });
  } catch (error) {
    console.error(error);

    return res.status(400).json({ message: error.message })
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const input: UpdateTaskInput = req.body;

  const task = await getRepository(Task).findOne({ id });

  if (!task) {
    return res.status(404).json({ message: `The task with the id "${id}" not found.`})
  }

  try {
    await getRepository(Task).update({ id }, { ...input });

    const updatedTask = await getRepository(Task).findOneOrFail({ id });

    return res.json({ data: updatedTask });
  } catch (error) {
    console.error(error);

    return res.status(400).json({ message: error.message })
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const task = await getRepository(Task).findOne({ id });

  if (!task) {
    return res.status(404).json({ message: `The task with the id "${id}" not found.`})
  }

  await getRepository(Task).delete({ id });

  return res.json({ message: "The task has been deleted successfully!" });
};

export const retrieveTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const task = await getRepository(Task).findOne({ id });

  if (!task) {
    return res.status(404).json({ message: `The task with the id "${id}" not found.`})
  }

  return res.json({ data: task });
};

export const retrieveAllTasks = async (req: Request, res: Response) => {
  const tasks = await getRepository(Task).find({ order: { createdAt: "DESC" } });

  return res.json({ data: tasks });
};
