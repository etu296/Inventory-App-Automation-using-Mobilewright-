import { test, expect } from '@mobilewright/test';

const SIGNUP_USER = {
  fullName: 'QA Test User',
  phone: '9876543210',
  email: 'qateam20261122@mailinator.com',
  password: 'Test@12345',
};

test('sign up navigates to create account page', async ({ screen }) => {
  await expect(screen.getByText('Sign in')).toBeVisible();
  await screen.getByText('Sign up').tap();
  await expect(screen.getByText('Create account')).toBeVisible();
  await expect(screen.getByText('Sign up as a coordinator.')).toBeVisible();
});

test('sign up form accepts valid input', async ({ screen }) => {
  await expect(screen.getByText('Sign in')).toBeVisible();
  await screen.getByText('Sign up').tap();
  await expect(screen.getByText('Create account')).toBeVisible();

  // Full name
  await screen.getByRole('textfield').nth(0).tap();
  await screen.getByRole('textfield').nth(0).fill(SIGNUP_USER.fullName);

  // WhatsApp number (nth(1) skips the +91 country code button)
  await screen.getByRole('textfield').nth(1).tap();
  await screen.getByRole('textfield').nth(1).fill(SIGNUP_USER.phone);

  // Email
  await screen.getByRole('textfield').nth(2).tap();
  await screen.getByRole('textfield').nth(2).fill(SIGNUP_USER.email);

  // Password
  await screen.getByRole('textfield').nth(3).tap();
  await screen.getByRole('textfield').nth(3).fill(SIGNUP_USER.password);

  await expect(screen.getByRole('button', { name: 'Create account' })).toBeVisible();
});

test('sign up with valid credentials creates account and shows approval message', async ({ screen }) => {
  await expect(screen.getByText('Sign in')).toBeVisible();
  await screen.getByText('Sign up').tap();
  await expect(screen.getByText('Create account')).toBeVisible();

  await screen.getByRole('textfield').nth(0).tap();
  await screen.getByRole('textfield').nth(0).fill(SIGNUP_USER.fullName);

  await screen.getByRole('textfield').nth(1).tap();
  await screen.getByRole('textfield').nth(1).fill(SIGNUP_USER.phone);

  await screen.getByRole('textfield').nth(2).tap();
  await screen.getByRole('textfield').nth(2).fill(SIGNUP_USER.email);

  await screen.getByRole('textfield').nth(3).tap();
  await screen.getByRole('textfield').nth(3).fill(SIGNUP_USER.password);

  await screen.getByRole('button', { name: 'Create account' }).tap();

  // After successful sign-up, app redirects to Sign in page
  await expect(screen.getByText('Sign in')).toBeVisible();

  // New account requires admin approval before login
  await expect(
    screen.getByText('Your account is awaiting admin approval. You can sign in once it is approved.')
  ).toBeVisible();

  // Email should be pre-filled on the sign-in page
  await expect(screen.getByRole('textfield').nth(0)).toHaveValue(SIGNUP_USER.email);
});

test('sign up page has link back to sign in', async ({ screen }) => {
  await expect(screen.getByText('Sign in')).toBeVisible();
  await screen.getByText('Sign up').tap();
  await expect(screen.getByText('Create account')).toBeVisible();

  await screen.getByText('Sign in').tap();
  await expect(screen.getByText('Sign in')).toBeVisible();
  await expect(screen.getByText("Don't have an account?")).toBeVisible();
});
