import * as instructorsService from '../services/instructors.js';
import { HttpError } from '../utils/httpError.js';



export async function create(req, res, next) {
  try {
    const { first_name, last_name, email, password_hash, role } = req.body ?? {};
    if (!first_name || !last_name || !email || !password_hash || !role) {
      throw new HttpError(
        400,
        'first_name, last_name, email, password_hash, role are required'
      );
    }
    if (!['student', 'instructor', 'admin'].includes(role)) {
      throw new HttpError(400, 'role must be student, instructor, or admin');
    }
    const instructor = await instructorsService.create({
      first_name,
      last_name,
      email,
      password_hash,
      role,
    });
    res.status(201).json(instructor);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const instructor = await instructorsService.update(req.params.id, req.body ?? {});
    if (!instructor) throw new HttpError(404, 'instructor not found');
    res.json(instructor);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const deleted = await instructorsService.remove(req.params.id);
    if (!deleted) throw new HttpError(404, 'instructor not found');
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}