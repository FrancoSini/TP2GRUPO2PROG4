import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe ('NoteService - listNotes (Ejercicio 2)', () => {
    let service: NoteServiceImpl;
    beforeEach(() => {
        const db = createDb(':memory:');
        const repo = new SqliteNoteRepository(db);
        service = new NoteServiceImpl(repo);
    });

    it('devuelve la nota correspondiente al id proporcionado', () => {
        const nuevaNota = service.createNote({ title: 'Nota buscada', content: 'Contenido' });
        const notaObtenida = service.getNote(nuevaNota.id);
        expect(notaObtenida).toBeDefined();
        expect(notaObtenida?.id).toBe(nuevaNota.id);
        expect(notaObtenida?.title).toBe('Nota buscada');
    });
    it('devuelve undefined si no existe la nota con el id proporcionado', () => {
        const notaInexistente = service.getNote(99999);
        expect(notaInexistente).toBeUndefined();
    });
});
