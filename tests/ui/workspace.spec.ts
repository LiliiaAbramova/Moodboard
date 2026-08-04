import { test } from '@playwright/test';
import { MoodboardPage } from '../pages/MoodboardPage';

test.describe('Workspace', () => {

    test('TC-WS-001 Verify that user can add an image to workspace', async ({ page }) => {

        const moodboard = new MoodboardPage(page);

        await moodboard.open();

        await moodboard.search('nature');

        await moodboard.expectGalleryVisible();

        await moodboard.expectWorkspaceImageCount(0);

        await moodboard.addFirstGalleryImage();

        await moodboard.expectWorkspaceImageCount(1);
    });

});