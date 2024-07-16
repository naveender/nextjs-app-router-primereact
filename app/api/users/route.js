import { getUsers, addUser, updateUser, deleteUser } from './controller';

export async function GET(request) {
  const users = await getUsers();
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(request) {
  const data = await request.json();
  await addUser(data);
  return new Response('User added', { status: 201 });
}

export async function PUT(request) {
  const data = await request.json();
  await updateUser(data);
  return new Response('User updated', { status: 200 });
}

export async function DELETE(request) {
  const data = await request.json();
  await deleteUser(data);
  return new Response('User deleted', { status: 200 });
}
