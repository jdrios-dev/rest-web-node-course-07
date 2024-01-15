import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
export class TodosController {
	constructor() {}

	public getTodos = async (req: Request, res: Response) => {
		const todos = await prisma.todo.findMany();
		return res.json(todos);
	};

	public getTodo = async (req: Request, res: Response) => {
		const id = parseInt(req.params.id, 10);
		if (isNaN(id))
			res.status(400).json({ error: `Id is not valid: ${req.params.id}` });

		const todo = await prisma.todo.findUnique({
			where: { id },
		});

		todo
			? res.json(todo)
			: res.status(404).json({ error: `TODO with id: ${id} does not exist` });
	};

	public createTodo = async (req: Request, res: Response) => {
		const [error, createTodoDto] = CreateTodoDto.create(req.body);

		if (error) {
			return res.status(400).json({ error });
		}

		const todo = await prisma.todo.create({
			data: createTodoDto!,
		});

		return res.json(todo);
	};

	public updateTodo = async (req: Request, res: Response) => {
		const id = +req.params.id;
		const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

		if (error) {
			return res.status(400).json({ error });
		}

		const resp = await prisma.todo.update({
			where: { id },
			data: updateTodoDto!.values,
		});
		return res.json(resp);
	};

	public deleteTodo = async (req: Request, res: Response) => {
		const id = +req.params.id;
		const resp = await prisma.todo.delete({
			where: { id },
		});
		return res.json(resp);
	};
}
