import { test, expect } from '@playwright/test';
import { MoodboardPage } from '../pages/MoodboardPage';
import fs from 'fs/promises';

test('TC-EXP-001 Verify that user can save collage as PNG', async ({ page }) => {

    const moodboard = new MoodboardPage(page);

    await moodboard.open();

    await moodboard.search('nature');

    await moodboard.expectGalleryVisible();

    await moodboard.addFirstGalleryImage();

    await moodboard.expectWorkspaceImageCount(1);

    const download = await moodboard.saveCollage();

    await expect(download.suggestedFilename()).toMatch(/\.png$/);

    const filePath = await download.path();

    expect(filePath).not.toBeNull();

    const fileStats = await fs.stat(filePath!);

    expect(fileStats.size).toBeGreaterThan(0);
});