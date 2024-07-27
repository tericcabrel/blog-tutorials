export type User = {
  id: string;
  name: string;
  role: "user" | "admin";
}

const users: User[] = [
  { id: "111", name: "User 1", role: "user" },
  { id: "112", name: "User 2", role: "user" },
  { id: "113", name: "User 3", role: "admin" },
];

export { users };
