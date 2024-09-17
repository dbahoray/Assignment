describe('Native Demo App Test', () => {  
    const formPage = { 
    formNavButton: '//android.widget.Button[@content-desc="Forms"]',  
    inputField: '//*[@content-desc="text-input"]',  
    switchField: '//*[@content-desc="switch"]',  
    dropdown: '//*[@content-desc="Dropdown"]',  
    activeButton: '//android.widget.Button[@content-desc="button-Active"]',  
    submitButton: '//*[@content-desc="button-Active"]',  
    inputResult: '//*[@content-desc="input-text-result"]', 
    }; 
    it('should login with fingerprint', async () => { 
    // Launch the app  
    await driver.launchApp();  
    // Navigate to the biometric login screen  
    const loginButton = await $('//*[@content-desc="Login-Screen"]');  
    await loginButton.click(); 
    // Simulate fingerprint login (Android)  
    await driver.fingerPrint(1);  
    // For iOS, use this:  
    // await driver.sendBiometricMatch(true);  
    // Validate successful login (this might vary based on app behavior)  
    const loginStatus = await $('//*[@content-desc="biometric-login-status"]');  
    expect(await loginStatus.getText()).toContain('success');  
    }); 
    it('should fill up a form', async () => {  
    // Navigate to the form screen  
    await $(formPage.formNavButton).click(); 
    // Fill the form input  
    await $(formPage.inputField).setValue('Sample input text');  
    // Toggle the switch  
    const switchElement = await $(formPage.switchField);  
    if (!(await switchElement.isSelected())) {  
    await switchElement.click(); } 
    // Select a value from the dropdown (if needed)  
    await $(formPage.dropdown).click();  
    const dropdownOption = await $('//*[@text="This app is awesome"]');  
    await dropdownOption.click(); 
    // Click on active button (or submit button)  
    await $(formPage.activeButton).click();  
    // Validate the form submission  
    const resultText = await $(formPage.inputResult).getText();  
    expect(resultText).toEqual('Sample input text');  
    });  
    });