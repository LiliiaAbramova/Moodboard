import { test, expect } from '@playwright/test';
import { MoodboardPage } from '../pages/MoodboardPage';

test('TC-IU-001 Verify user can upload valid image', async ({ page }) => {

    const moodboard = new MoodboardPage(page);

    await moodboard.open();

    await moodboard.uploadImage(
        'tests/fixtures/flower.png'
    );

    await moodboard.expectPreviewVisible();

});