import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';

import { makeApp } from '../../src/app';

describe('Notes routes - updateNote (Ejercicio 4)', () => {
  let app: ReturnType<typeof makeApp>;

  beforeEach(() => {
    process.env.NODE_ENV = 'test';
    app = makeApp(':memory:');
  });

  it('actualiza parcialmente una nota con PATCH /notes/:id', async () => {
    const seed = await request(app)
      .post('/__test__/seed')
      .expect(201);

    const noteId = seed.body.created[0].id;

    const response = await request(app)
      .patch(`/notes/${noteId}`)
      .send({ title: 'Título nuevo' })
      .expect(200);

    expect(response.body.title).toBe('Título nuevo');
    expect(response.body.content).toBe('Antes de las 20hs');
  });

  it('devuelve 404 si la nota no existe', async () => {
    await request(app)
      .patch('/notes/999')
      .send({ title: 'Título nuevo' })
      .expect(404);
  });
});
