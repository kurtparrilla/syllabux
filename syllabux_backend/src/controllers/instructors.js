import * as instructorsService from '../services/instructors.js';
import { HttpError } from '../utils/httpError.js';

export async function create(req, res, next) {
  try {
    const {
      first_name,
      last_name,
      email,
      password_hash,
      bio
    } = req.body ?? {};

    if (!first_name || !last_name || !email || !password_hash) {
      throw new HttpError(
        400,
        'first_name, last_name, email and password_hash are required'
      );
    }

    const instructor = await instructorsService.create({
      first_name,
      last_name,
      email,
      password_hash,
      bio
    });

    res.status(201).json(instructor);

  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new HttpError(400, 'invalid instructor id');
    }

    const instructor = await instructorsService.update(
      id,
      req.body ?? {}
    );

    if (!instructor) {
      throw new HttpError(404, 'instructor not found');
    }

    res.json(instructor);

  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      throw new HttpError(400, 'invalid instructor id');
    }

    const deleted = await instructorsService.remove(id);

    if (!deleted) {
      throw new HttpError(404, 'instructor not found');
    }

    res.status(204).end();

  } catch (err) {
    next(err);
  }
}