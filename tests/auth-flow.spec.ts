import { test, expect } from '@mobilewright/test';

// Combined authentication flow:
// 1. Sign up with a new account
// 2. Verify the account creation and approval message
// 3. Attempt sign in (account requires admin approval before access is granted)
//
// To run this file alone:  npx mobilewright test tests/auth-flow.spec.ts
// To run all tests:         npm test

const TEST_USER = {
  fullName: 'QA Test User',
  phone: '9876543210',
  email: 'qateam20261122@mailinator.com',
  password: 'Test@12345',
};

test('full auth flow: sign up then sign in', async ({ screen }) => {
  // ── Step 1: Verify Sign In page is the entry point ──────────────────────
  await expect(screen.getByText('Sign in')).toBeVisible();
  await expect(screen.getByText('Enter your email and password to sign in.')).toBeVisible();

  // ── Step 2: Navigate to Sign Up ──────────────────────────────────────────
  await screen.getByText('Sign up').tap();
  await expect(screen.getByText('Create account')).toBeVisible();
  await expect(screen.getByText('Sign up as a coordinator.')).toBeVisible();

  // ── Step 3: Fill sign-up form ────────────────────────────────────────────
  await screen.getByRole('textfield').nth(0).tap();
  await screen.getByRole('textfield').nth(0).fill(TEST_USER.fullName);

  await screen.getByRole('textfield').nth(1).tap();
  await screen.getByRole('textfield').nth(1).fill(TEST_USER.phone);

  await screen.getByRole('textfield').nth(2).tap();
  await screen.getByRole('textfield').nth(2).fill(TEST_USER.email);

  await screen.getByRole('textfield').nth(3).tap();
  await screen.getByRole('textfield').nth(3).fill(TEST_USER.password);

  // ── Step 4: Submit sign-up ───────────────────────────────────────────────
  await screen.getByRole('button', { name: 'Create account' }).tap();

  // ── Step 5: Verify redirect to Sign In + approval message ───────────────
  await expect(screen.getByText('Sign in')).toBeVisible();
  await expect(
    screen.getByText('Your account is awaiting admin approval. You can sign in once it is approved.')
  ).toBeVisible();

  // Email is pre-filled after sign-up redirect
  await expect(screen.getByRole('textfield').nth(0)).toHaveValue(TEST_USER.email);

  // ── Step 6: Attempt sign in with the new account ─────────────────────────
  await screen.getByRole('textfield').nth(1).tap();
  await screen.getByRole('textfield').nth(1).fill(TEST_USER.password);

  await screen.getByRole('button', { name: 'Sign in' }).tap();

  // ── Step 7: Verify sign-in response ─────────────────────────────────────
  // Expected: approval pending message until admin grants access
  await expect(
    screen.getByText('Your account is awaiting admin approval. You can sign in once it is approved.')
  ).toBeVisible();
});
