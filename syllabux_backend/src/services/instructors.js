import pool from '../config/db.js';

export async function get(id) {
  const [rows] = await pool.query(
    `
    SELECT
      i.instructor_id,
      i.bio,
      i.created_at,

      u.user_id,
      u.first_name,
      u.last_name,
      u.email,
      u.role,
      u.updated_at

    FROM instructors i
    INNER JOIN users u
      ON i.user_id = u.user_id

    WHERE i.instructor_id = ?
    `,
    [id]
  );

  return rows[0] ?? null;
}

export async function getByEmail(email) {
  const [rows] = await pool.query(
    `
    SELECT
      i.instructor_id,
      i.bio,
      i.created_at,

      u.user_id,
      u.first_name,
      u.last_name,
      u.email,
      u.role,
      u.updated_at

    FROM instructors i
    INNER JOIN users u
      ON i.user_id = u.user_id

    WHERE u.email = ?
    `,
    [email]
  );

  return rows[0] ?? null;
}

export async function create({
  first_name,
  last_name,
  email,
  password_hash,
  bio
}) {

  const [userResult] = await pool.query(
    `
    INSERT INTO users
    (
      first_name,
      last_name,
      email,
      password_hash,
      role
    )
    VALUES (?, ?, ?, ?, 'instructor')
    `,
    [
      first_name,
      last_name,
      email,
      password_hash
    ]
  );

  const userId = userResult.insertId;

  const [instructorResult] = await pool.query(
    `
    INSERT INTO instructors
    (
      user_id,
      bio
    )
    VALUES (?, ?)
    `,
    [
      userId,
      bio ?? null
    ]
  );

  return get(instructorResult.insertId);
}

export async function update(id, updates) {

  const instructor = await get(id);

  if (!instructor) {
    return null;
  }

  const userFields = [];
  const userValues = [];

  const allowedUserFields = [
    'first_name',
    'last_name',
    'email'
  ];

  for (const [key, value] of Object.entries(updates)) {

    if (!allowedUserFields.includes(key)) {
      continue;
    }

    userFields.push(`${key} = ?`);
    userValues.push(value);
  }

  if (userFields.length > 0) {

    userValues.push(instructor.user_id);

    await pool.query(
      `
      UPDATE users
      SET ${userFields.join(', ')}
      WHERE user_id = ?
      `,
      userValues
    );
  }

  if (updates.bio !== undefined) {

    await pool.query(
      `
      UPDATE instructors
      SET bio = ?
      WHERE instructor_id = ?
      `,
      [updates.bio, id]
    );
  }

  return get(id);
}

export async function remove(id) {

  const instructor = await get(id);

  if (!instructor) {
    return false;
  }

  await pool.query(
    `
    DELETE FROM instructors
    WHERE instructor_id = ?
    `,
    [id]
  );

  await pool.query(
    `
    DELETE FROM users
    WHERE user_id = ?
    `,
    [instructor.user_id]
  );

  return true;
}