import { test, expect } from '@mobilewright/test';

const APP_ID = 'asia.ifarmer.supplier.dev';

// Element locators for the Supplier Connect login screen
const ids = {
  phoneInput: `${APP_ID}:id/etPhoneNumber`,
  pinInput: `${APP_ID}:id/etPin`,
  loginButton: `${APP_ID}:id/btnLogIn`,
  inputError: `${APP_ID}:id/textinput_error`,
};

const TEST_PHONE = '01700000000';

// Negative scenario: only the phone number is given, PIN is left empty
test('login with phone number only shows "Enter PIN" validation error', async ({ screen }) => {
  await screen.getByTestId(ids.phoneInput).tap();

  // Dismiss Google's "Use your saved password?" autofill dialog if it appears
  const laterButton = screen.getByText('Later');
  if (await laterButton.isVisible()) {
    await laterButton.tap();
  }

  await screen.getByTestId(ids.phoneInput).fill(TEST_PHONE);

  // Close the keyboard so the login button is visible
  await screen.pressButton('BACK');

  await screen.getByTestId(ids.loginButton).tap();

  // Expect the validation message: "পিন লিখুন" (Enter PIN)
  await expect(screen.getByTestId(ids.inputError)).toContainText('পিন লিখুন');
});
