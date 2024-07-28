import { User, users } from "@/data/users";

export function GET() {
  const simpleUsers: User[] = users.slice().filter((user) => user.role === "user");

  return Response.json({ data: simpleUsers });
}
