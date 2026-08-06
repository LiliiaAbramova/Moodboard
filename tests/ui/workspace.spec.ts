import {expect, test} from '@playwright/test';
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

    test('TC-WS-003 Verify that user can clear the workspace', async ({ page }) => {

        const moodboard = new MoodboardPage(page);

        await moodboard.open();

        await moodboard.search('nature');

        await moodboard.expectGalleryVisible();

        await moodboard.expectWorkspaceImageCount(0);

        await moodboard.addGalleryImages(3);

        await moodboard.expectWorkspaceImageCount(3);

        await moodboard.clearWorkspace();

        await moodboard.expectWorkspaceImageCount(0);

    });

    test('TC-WS-005 Verify that workspace is limited to 9 images', async ({ page }) => {

        const moodboard = new MoodboardPage(page);

        await moodboard.open();

        await moodboard.search('nature');

        await moodboard.expectGalleryVisible();

        await moodboard.addFirstGalleryImageMultipleTimes(9);

        await moodboard.expectWorkspaceImageCount(9);

        await moodboard.addFirstGalleryImageMultipleTimes(2);

        await moodboard.expectWorkspaceImageCount(9);
    });

});