import { test, expect } from '@playwright/test';

    test.describe('API de Notas - E2E (Ejercicio 7)', () => {
    test('Happy Path: crea una nota y luego la lista vía HTTP', async ({ request }) => {
        const postRes = await request.post('/notes', {
        data: {
            title: 'Nota E2E',
            content: 'Contenido de prueba Playwright'
        }
        });

        expect(postRes.status()).toBe(201);

        const createdNote = await postRes.json();
        expect(createdNote.id).toBeDefined();
        expect(createdNote.title).toBe('Nota E2E');

        const getRes = await request.get('/notes');
        expect(getRes.status()).toBe(200);

        const notes = await getRes.json();
        const existe = notes.some((n: any) => n.id === createdNote.id);
        expect(existe).toBe(true);
    });

    test('Caso de error: devuelve 404 al buscar un id inexistente', async ({ request }) => {
        const res = await request.get('/notes/999999');
        expect(res.status()).toBe(404);
    });
    });