import { Request, Response } from "express";

const todos = [
	{
		id: 1,
		text: "buy bread",
		createdAt: new Date(),
	},
	{
		id: 2,
		text: "buy Coconut oil",
		createdAt: new Date(),
	},
	{
		id: 3,
		text: "buy quinoa",
		createdAt: new Date(),
	},
];

export class TodosController {
	constructor() {}

	public getTodos = (req: Request, res: Response) => {
		return res.json(todos);
	};

	public getTodo = (req: Request, res: Response) => {
		const id = parseInt(req.params.id, 10);
		if (isNaN(id))
			res.status(400).json({ error: `Id is not valid: ${req.params.id}` });

		const todo = todos.find((item) => item.id === id);

		todo
			? res.json(todo)
			: res.status(404).json({ error: `TODO with id: ${id} does not exist` });
	};

	public createTodo = (req: Request, res: Response) => {
		const { text, id } = req.body;
		if (!text) return res.status(400).json({ error: "Text is required" });
		if (isNaN(+id))
			return res.status(400).json({ error: "Id must be a number" });
		const newTodo = {
			text,
			id: parseInt(id, 10),
			createdAt: new Date(),
		};
		todos.push(newTodo);

		return res.json({ message: "Message created", body: newTodo });
	};

	public updateTodo = (req: Request, res: Response) => {
		console.log("Todo updated", req.body, req.params.id);
	};

	public deleteTodo = (req: Request, res: Response) => {
		console.log("Todo deleted", req.body, req.params.id);
	};
}
