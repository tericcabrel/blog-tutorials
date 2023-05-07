import { Request, Response } from "express";
import { Task, TaskStatus } from "../entity/Task";
import { AppDataSource } from "../data-source";

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
    const createdTask = await AppDataSource.manager.save(Task, {
      data: {
        name: input.name,
        description: input.description,
        dueDate: input.dueDate,
      },
    });

    return res.json({ data: createdTask });
  } catch (error) {
    console.error(error);

    return res.status(400).json({ message: error.message })
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const input: UpdateTaskInput = req.body;

  const task = await AppDataSource.manager.findOne(Task, { where: [{ id }] });

  if (!task) {
    return res.status(404).json({ message: `The task with the id "${id}" not found.`})
  }

  try {
    await AppDataSource.manager.update(Task, { id },  {
      name: input.name,
      description: input.description,
      dueDate: input.dueDate,
      status: input.status,
    });

    const updatedTask = await AppDataSource.manager.findOneOrFail(Task, { where: [{ id }] });

    return res.json({ data: updatedTask });
  } catch (error) {
    console.error(error);

    return res.status(400).json({ message: error.message })
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const task = await AppDataSource.manager.findOne(Task, { where: [{ id }] });


  if (!task) {
    return res.status(404).json({ message: `The task with the id "${id}" not found.`})
  }

  await AppDataSource.manager.delete(Task, { id });

  return res.json({ message: "The task has been deleted successfully!" });
};

export const retrieveTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const task = await AppDataSource.manager.findOne(Task, { where: [{ id }] });

  if (!task) {
    return res.status(404).json({ message: `The task with the id "${id}" not found.`})
  }

  return res.json({ data: task });
};

export const retrieveAllTasks = async (req: Request, res: Response) => {
  const tasks = await AppDataSource.manager.find(Task, { order: { createdAt: "DESC" } });

  return res.json({ data: tasks });
};
