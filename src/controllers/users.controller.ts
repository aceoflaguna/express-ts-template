import { Request, Response } from "express";
import { NotFoundError, BadRequestError } from "../types/errors";

interface User {
  id: number;
  name: string;
  email: string;
}

// In-memory sample data store
const users: User[] = [
  { id: 1, name: "Ace", email: "ace@example.com" },
  { id: 2, name: "Alan Turing", email: "alan@example.com" },
];

export async function listUsers(_req: Request, res: Response): Promise<void> {
  res.status(200).json({ status: "ok", data: users });
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    throw new BadRequestError("User id must be a number");
  }

  const user = users.find((u) => u.id === id);
  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`);
  }

  res.status(200).json({ status: "ok", data: user });
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const { name, email } = req.body as Partial<User>;

  if (!name || !email) {
    throw new BadRequestError("Both 'name' and 'email' are required");
  }

  const newUser: User = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    email,
  };
  users.push(newUser);

  res.status(201).json({ status: "ok", data: newUser });
}
