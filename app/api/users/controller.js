import { query } from '../../../lib/db';

export async function getUsers() {
  return await query('SELECT * FROM users', []);
}

export async function addUser({ fname, lname, email, password, address, city, state, zipcode, phone }) {
  return await query('INSERT INTO users (fname, lname, email, password, address, city, state, zipcode, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [fname, lname, email, password, address, city, state, zipcode, phone]);
}

export async function updateUser({ id, fname, lname, email, password, address, city, state, zipcode, phone }) {
  return await query('UPDATE users SET fname = ?, lname = ?, email = ?, password = ?, address = ?, city = ?, state = ?, zipcode = ?, phone = ? WHERE id = ?', [fname, lname, email, password, address, city, state, zipcode, phone, id]);
}

export async function deleteUser({ id }) {
  return await query('DELETE FROM users WHERE id = ?', [id]);
}