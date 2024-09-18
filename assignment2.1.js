describe('SauceDemo Test Scenario', () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com/v1/');
    });

    it('should display an error message for invalid login', async () => {
        const usernameField = await $('#user-name');
        const passwordField = await $('#password');
        const loginButton = await $('#login-button');

        await usernameField.setValue('invalid_user');
        await passwordField.setValue('invalid_password');
        await loginButton.click();

        const errorMessage = await $('.error-message-container');
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining('Username and password do not match any user in this service');
    });

    it('should login with valid credentials', async () => {
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();

        const inventoryContainer = await $('.inventory_container');
        await expect(inventoryContainer).toBeDisplayed();
    });

    it('should add all products with "T-shirt" in their title to the cart', async () => {
        const products = await $$('.inventory_item');

        for (const product of products) {
            const title = await product.$('.inventory_item_name').getText();
            if (title.includes('T-shirt')) {
                const addToCartButton = await product.$('.btn_inventory');
                await addToCartButton.click();
            }
        }

        const cartIcon = await $('.shopping_cart_badge');
        const cartCount = parseInt(await cartIcon.getText(), 10);
        const expectedCount = await getExpectedCount(products);

        expect(cartCount).toBe(expectedCount);
    });

    it('should go to the cart and checkout', async () => {
        await $('.shopping_cart_link').click();

        const checkoutButton = await $('#checkout');
        await expect(checkoutButton).toBeDisplayed();
        await checkoutButton.click();

        const firstNameField = await $('#first-name');
        const lastNameField = await $('#last-name');
        const postalCodeField = await $('#postal-code');

        await firstNameField.setValue('John');
        await lastNameField.setValue('Doe');
        await postalCodeField.setValue('12345');

        const continueButton = await $('#continue');
        await continueButton.click();

        const finishButton = await $('#finish');
        await expect(finishButton).toBeDisplayed();
        await finishButton.click();
    });

    async function getExpectedCount(products) {
        let count = 0;
        for (const product of products) {
            const title = await product.$('.inventory_item_name').getText();
            if (title.includes('T-shirt')) {
                count++;
            }
        }
        return count;
    }
});
