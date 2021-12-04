import { monotonicFactory } from "ulid";

type Request = {
  id: string;
  name: string;
}

const reqsList: Request[] = [];

const ulid = monotonicFactory();

for (let i = 0; i < 3; i++) {
  reqsList.push({ id: ulid(), name: `Request ${i + 1}`});
}

// Sort in descending order
const sortedRequests = reqsList.sort((req1, req2) => req1.id > req2.id ? -1 : 1);

console.log(sortedRequests);
