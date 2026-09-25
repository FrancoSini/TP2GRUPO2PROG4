import { describe, it, expect, beforeEach, vi } from 'vitest';

import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - deleteNote (Ejercicio 5)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb();
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('debe eliminar una nota y devolver true', () => {
    const note = service.createNote({
      title: 'Nota a eliminar',
      content: 'Contenido de prueba'
    });

    const result = service.deleteNote(note.id);

    expect(result).toBe(true);
    expect(service.getNote(note.id)).toBeUndefined();
  });
});







