import { expect, test } from '@playwright/test';

test.describe('Unsplash API', () => {

    test('TC-API-001 Verify that Unsplash API returns images for a valid search', async ({ request }) => {

        const response = await request.post('/api/unsplash', {
            data: {
                query: 'nature'
            }
        });

        expect(response.status()).toBe(200);

        const data = await response.json();

        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });


    test('TC-API-002 Verify that API returns 400 for an empty search query', async ({ request }) => {

        const response = await request.post('/api/unsplash', {
            data: {
                query: ''
            }
        });

        expect(response.status()).toBe(400);

        const data = await response.json();

        expect(data).toHaveProperty('error');
        expect(data.error).toBe('Please enter a valid search query.');
    });


    test('TC-API-003 Verify that API response contains required image fields', async ({ request }) => {

        const response = await request.post('/api/unsplash', {
            data: {
                query: 'nature'
            }
        });

        expect(response.status()).toBe(200);

        const data = await response.json();

        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);

        const image = data[0];

        expect(image).toHaveProperty('key');
        expect(image).toHaveProperty('url');
        expect(image).toHaveProperty('alt_description');
        expect(image).toHaveProperty('author');
        expect(image.author).toHaveProperty('name');
        expect(image.author).toHaveProperty('profileUrl');
        expect(image).toHaveProperty('source');

        expect(image.source).toBe('Unsplash');
    });


    test('TC-API-004 Verify that API returns no more than 8 images', async ({ request }) => {

        const response = await request.post('/api/unsplash', {
            data: {
                query: 'nature'
            }
        });

        expect(response.status()).toBe(200);

        const data = await response.json();

        expect(data.length).toBeLessThanOrEqual(8);
    });

});