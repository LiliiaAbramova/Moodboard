import { expect, Locator, Page } from '@playwright/test';

export class MoodboardPage {
    readonly page: Page;

    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly galleryImages: Locator;
    readonly uploadInput: Locator;
    readonly uploadedPreview: Locator;
    readonly workspaceImages: Locator;
    readonly removeWorkspaceButtons: Locator;
    readonly clearWorkspaceButton: Locator;
    readonly workspaceImageContainers: Locator;
    readonly saveCollageButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchInput = page.getByTestId('search-input');
        this.searchButton = page.getByTestId('search-button');
        this.galleryImages = page.getByTestId('gallery-image');
        this.uploadInput = page.getByTestId('upload-input');
        this.uploadedPreview = page.getByTestId('uploaded-preview');
        this.workspaceImages = page.getByTestId('workspace-image');
        this.removeWorkspaceButtons = page.getByTestId('remove-workspace-image');
        this.clearWorkspaceButton = page.getByTestId('clear-workspace-button');
        this.workspaceImageContainers = page.getByTestId('workspace-image-container');
        this.saveCollageButton = page.getByTestId('save-collage');
    }

    async open() {
        await this.page.goto('/');
    }

    async search(keyword: string) {
        await this.searchInput.fill(keyword);
        await this.searchButton.click();
    }

    async expectGalleryVisible() {
        await expect(this.galleryImages.first()).toBeVisible();
    }

    async galleryCount() {
        return await this.galleryImages.count();
    }

    async uploadImage(path: string) {
        await this.uploadInput.setInputFiles(path);
    }

    async uploadImageExpectingDialog(path: string) {
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toBe(
                'File size must not exceed 1 MB.'
            );

            await dialog.accept();
        });

        await this.uploadInput.setInputFiles(path);
    }

    async expectPreviewVisible() {
        await expect(this.uploadedPreview).toBeVisible();
    }

    async addFirstGalleryImage() {
        await this.galleryImages.first().click();
    }

    async expectWorkspaceImageCount(count: number) {
        await expect(this.workspaceImages).toHaveCount(count);
    }

    async removeFirstWorkspaceImage() {
        await this.removeWorkspaceButtons.first().click();
    }

    async clearWorkspace() {
        await this.clearWorkspaceButton.click();
    }

    async addGalleryImages(count: number) {
        for (let i = 0; i < count; i++) {
            await this.galleryImages.nth(i).click();
        }
    }

    async getWorkspaceImageKey(index: number) {
        return await this.workspaceImageContainers
            .nth(index)
            .getAttribute('data-image-key');
    }

    async dragWorkspaceImage(sourceIndex: number, targetIndex: number) {
        const source = this.workspaceImageContainers.nth(sourceIndex);
        const target = this.workspaceImageContainers.nth(targetIndex);

        await source.dragTo(target);
    }

    async saveCollage() {
        const downloadPromise = this.page.waitForEvent('download');

        await this.saveCollageButton.click();

        return await downloadPromise;
    }


}