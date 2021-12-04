import { ulid } from "ulid";

type User = {
  id: string;
  name: string;
}

const usersList: User[] = [];

const waitFor = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(time) , time)
  });
}

const insertUsers = async () => {
  for (let i = 0; i < 3; i++) {
    await waitFor(100); // Simulate latency
    usersList.push({ id: ulid(), name: `User ${i + 1}`});
  }
}

(async () => {
  await insertUsers();

  // Sort in ascending order
  const sortedUsers = usersList.sort((user1, user2) => user1.id > user2.id ? -1 : 1);

  console.log(sortedUsers);
})();

