import { test, expect } from '@mobilewright/test';

// Use an admin-approved account for sign-in tests.
// The account must be approved via the admin panel before these tests will pass.
const APPROVED_USER = {
  email: 'qateam20261122@mailinator.com',
  password: 'Test@12345',
};

test('sign in page shows correct elements', async ({ screen }) => {
  await expect(screen.getByText('Sign in')).toBeVisible();
  await expect(screen.getByText('Enter your email and password to sign in.')).toBeVisible();
  await expect(screen.getByRole('textfield').nth(0)).toBeVisible(); // Email field
  await expect(screen.getByRole('textfield').nth(1)).toBeVisible(); // Password field
  await expect(screen.getByRole('button', { name: 'Sign in' })).toBeVisible();
  await expect(screen.getByText('Forgot password?')).toBeVisible();
  await expect(screen.getByText("Don't have an account?")).toBeVisible();
  await expect(screen.getByText('Sign up')).toBeVisible();
});

test('sign in with empty fields shows validation error', async ({ screen }) => {
  await expect(screen.getByText('Sign in')).toBeVisible();

  await screen.getByRole('button', { name: 'Sign in' }).tap();

  await expect(screen.getByText('Enter a valid email address')).toBeVisible();
});

test('sign in with pending approval account shows approval message', async ({ screen }) => {
  await expect(screen.getByText('Sign in')).toBeVisible();

  await screen.getByRole('textfield').nth(0).tap();
  await screen.getByRole('textfield').nth(0).fill(APPROVED_USER.email);

  await screen.getByRole('textfield').nth(1).tap();
  await screen.getByRole('textfield').nth(1).fill(APPROVED_USER.password);

  await screen.getByRole('button', { name: 'Sign in' }).tap();

  await expect(
    screen.getByText('Your account is awaiting admin approval. You can sign in once it is approved.')
  ).toBeVisible();
});

test('sign in with approved credentials navigates to home screen', async ({ screen }) => {
  await expect(screen.getByText('Sign in')).toBeVisible();

  await screen.getByRole('textfield').nth(0).tap();
  await screen.getByRole('textfield').nth(0).fill(APPROVED_USER.email);

  await screen.getByRole('textfield').nth(1).tap();
  await screen.getByRole('textfield').nth(1).fill(APPROVED_USER.password);

  await screen.getByRole('button', { name: 'Sign in' }).tap();

  // Verify home / dashboard is visible after successful login
  await expect(screen.getByText('Sign in')).not.toBeVisible();
});

test('sign in page has link to sign up', async ({ screen }) => {
  await expect(screen.getByText('Sign in')).toBeVisible();
  await screen.getByText('Sign up').tap();
  await expect(screen.getByText('Create account')).toBeVisible();
});
