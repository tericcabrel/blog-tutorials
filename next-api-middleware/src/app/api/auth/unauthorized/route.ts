export function GET(): Response {
  return Response.json({ message: 'Not authenticated.' }, { status: 401 });
}
