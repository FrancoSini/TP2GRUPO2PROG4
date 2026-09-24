import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';

import { makeApp } from '../../src/app';

//  ejercicio 3
describe('Notes routes - getNote (Ejercicio 3)', () => {
  let app: ReturnType<typeof makeApp>;

  beforeEach(() => {
    process.env.NODE_ENV = 'test';
    app = makeApp(':memory:');
  });

  it('debe retornar 200 y la nota si el ID es válido', async () => {
    
    const postRes = await request(app)
      .post('/notes')
      .send({ title: 'Nota API', content: 'Contenido API' });
    
    const notaId = postRes.body.id;

    
    const getRes = await request(app).get(`/notes/${notaId}`);
    
   
    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(notaId);
    expect(getRes.body.title).toBe('Nota API');
  });

  it('debe retornar 404 si la nota no existe', async () => {
    const getRes = await request(app).get('/notes/999999');
    expect(getRes.status).toBe(404);
  });
});

//ejercicio 4
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


