import { User, users } from "@/data/users";

type Data = {
  data: User[];
}

export function GET() {
  const simpleUsers: User[] = users.filter((user) => user.role === "admin");

  return Response.json({ data: simpleUsers });
}
