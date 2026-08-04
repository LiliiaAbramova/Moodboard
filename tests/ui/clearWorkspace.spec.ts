import { test } from '@playwright/test';
import { MoodboardPage } from '../pages/MoodboardPage';

test.describe('Clear Workspace', () => {

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
});