import { test, expect } from '@playwright/test';
import { MoodboardPage } from '../pages/MoodboardPage';

test('TC-WS-002 Verify that user can remove an image from workspace', async ({ page }) => {

    const moodboard = new MoodboardPage(page);

    await moodboard.open();

    await moodboard.search('nature');

    await moodboard.expectWorkspaceImageCount(0);

    await moodboard.addFirstGalleryImage();

    await moodboard.expectWorkspaceImageCount(1);

    await moodboard.removeFirstWorkspaceImage();

    await moodboard.expectWorkspaceImageCount(0);
});