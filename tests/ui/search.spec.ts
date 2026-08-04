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

});