import { test, expect } from '@playwright/test';
import { MoodboardPage } from '../pages/MoodboardPage';

test.describe('Unsplash Gallery Search', () => {

    test('TC-UG-001 Verify that users can search images using keywords', async ({ page }) => {

        const moodboard = new MoodboardPage(page);

        await moodboard.open();

        await moodboard.search('nature');

        await moodboard.expectGalleryVisible();

        expect(await moodboard.galleryCount()).toBeLessThanOrEqual(8);

    });

    test('TC-UG-013 Verify that empty search displays validation message', async ({ page }) => {
        const moodboard = new MoodboardPage(page);

        await moodboard.open();

        await moodboard.search('');

        await moodboard.expectSearchMessage(
            'Please enter a search query.'
        );
    });

    test('TC-UG-006 Verify that network errors are handled correctly', async ({ page }) => {

        const moodboard = new MoodboardPage(page);

        await page.route('**/api/unsplash', async route => {
            await route.abort('failed');
        });

        await moodboard.open();

        await moodboard.search('nature');

        await moodboard.expectSearchMessage(
            'Unable to connect to the server. Please check your connection.'
        );
    });

});