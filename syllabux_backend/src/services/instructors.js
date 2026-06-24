import pool from '../config/db.js';

const PUBLIC_COLUMNS =
  'instructor_id, first_name, last_name, email, role, created_at, updated_at';

export async function get(id) {
  const [rows] = await pool.query(
    `SELECT ${PUBLIC_COLUMNS} FROM instructors WHERE instructor_id = ?`,
    [id]
  );
  return rows[0] ?? null;
}

export async function getByEmail(email) {
  const [rows] = await pool.query(
    'SELECT * FROM instructors WHERE email = ?',
    [email]
  );
  return rows[0] ?? null;
}

export async function create({
  first_name,
  last_name,
  email,
  password_hash,
  role,
}) {
  const [result] = await pool.query(
    `INSERT INTO Instructors (first_name, last_name, email, password_hash, role)
     VALUES (?, ?, ?, ?, ?)`,
    [first_name, last_name, email, password_hash, role]
  );
  return get(result.insertId);
}

export async function update(id, updates) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0) {
    return get(id);
  }

  values.push(id);

  const [result] = await pool.query(
    `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = ?
    `,
    values
  );

  if (result.affectedRows === 0) return null;

  return get(id);
}

export async function remove(id) {
  const [result] = await pool.query(
    'DELETE FROM instructors WHERE instructor_id = ?',
    [id]
  );
  return result.affectedRows > 0;
}