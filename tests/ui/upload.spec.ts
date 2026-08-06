import { test, expect } from '@playwright/test';
import { MoodboardPage } from '../pages/MoodboardPage';

test.describe('Upload', () => {
    test('TC-IU-001 Verify user can upload valid image', async ({ page }) => {

        const moodboard = new MoodboardPage(page);

        await moodboard.open();

        await moodboard.uploadImage(
            'tests/fixtures/flower.png'
        );

        await moodboard.expectPreviewVisible();

    });


    test('TC-IU-002 Verify that user cannot upload image larger than 1 MB', async ({ page }) => {

        const moodboard = new MoodboardPage(page);

        await moodboard.open();

        await moodboard.uploadImageExpectingDialog(
            'tests/fixtures/landscape_1_1MB.png'
        );

    });
});