import { test, expect } from '@playwright/test';
import { MoodboardPage } from '../pages/MoodboardPage';

test('TC-WS-004 Verify that user can reorder images using drag and drop', async ({ page }) => {

    const moodboard = new MoodboardPage(page);

    await moodboard.open();

    await moodboard.search('nature');

    await moodboard.expectGalleryVisible();

    await moodboard.addGalleryImages(2);

    await moodboard.expectWorkspaceImageCount(2);

    const firstImageKey = await moodboard.getWorkspaceImageKey(0);
    const secondImageKey = await moodboard.getWorkspaceImageKey(1);

    await moodboard.dragWorkspaceImage(1, 0);

    await expect(
        moodboard.workspaceImageContainers.nth(0)
    ).toHaveAttribute('data-image-key', secondImageKey!);

    await expect(
        moodboard.workspaceImageContainers.nth(1)
    ).toHaveAttribute('data-image-key', firstImageKey!);
});