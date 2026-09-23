import { describe, it, expect, beforeEach } from 'vitest';

import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - updateNote (Ejercicio 4)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('modifica el título de una nota', () => {
    const note = service.createNote({
      title: 'Título original',
      content: 'Contenido original'
    });

    const updated = service.updateNote(note.id, {
      title: 'Título nuevo'
    });

    expect(updated?.title).toBe('Título nuevo');
    expect(updated?.content).toBe('Contenido original');
  });

  it('modifica el contenido de una nota', () => {
    const note = service.createNote({
      title: 'Título original',
      content: 'Contenido original'
    });

    const updated = service.updateNote(note.id, {
      content: 'Contenido nuevo'
    });

    expect(updated?.title).toBe('Título original');
    expect(updated?.content).toBe('Contenido nuevo');
  });

  it('permite actualizar parcialmente una nota sin modificar los demás campos', () => {
    const note = service.createNote({
      title: 'Título original',
      content: 'Contenido original',
      pinned: false
    });

    const updated = service.updateNote(note.id, {
      title: 'Título nuevo'
    });

    expect(updated).toBeDefined();
    expect(updated?.title).toBe('Título nuevo');
    expect(updated?.content).toBe('Contenido original');
    expect(updated?.pinned).toBe(false);
  });

  it('devuelve undefined si la nota no existe', () => {
    const updated = service.updateNote(999, {
      title: 'Título nuevo'
    });

    expect(updated).toBeUndefined();
  });
});
