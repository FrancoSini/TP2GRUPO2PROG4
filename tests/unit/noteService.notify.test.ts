import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';
import { notify } from '../../src/services/notificationService';

// 🔴 EJERCICIO 6 — Notificación al fijar una nota (pinned: true)
vi.mock('../../src/services/notificationService');

describe('NoteService - notify al fijar (Ejercicio 6)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    vi.clearAllMocks();
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('llama a notify con la nota creada cuando pinned es true', () => {
    const note = service.createNote({ title: 'Urgente', content: 'Revisar ya', pinned: true });
    expect(notify).toHaveBeenCalledWith(note);
    expect(notify).toHaveBeenCalledTimes(1);
  });

  it('NO llama a notify cuando pinned es false', () => {
    service.createNote({ title: 'Normal', content: 'Sin apuro', pinned: false });
    expect(notify).not.toHaveBeenCalled();
  });

  it('NO llama a notify cuando pinned no se indica', () => {
    service.createNote({ title: 'Sin pinned', content: 'Default' });
    expect(notify).not.toHaveBeenCalled();
  });
});