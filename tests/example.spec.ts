// this is a skeleton test for mobilewright (see https://github.com/mobile-next/mobilewright/blob/main/README.md)
// for documentation see: https://mobilewright.dev/docs/
// for agent skill see: https://github.com/mobile-next/mobilewright-skill
import { test, expect } from '@mobilewright/test';

test('app launches and shows home screen', async ({ screen }) => {
  await expect(screen.getByText('Sign in')).toBeVisible();
  await screen.getByRole('textfield').nth(0).tap();
  await screen.getByRole('textfield').nth(1).tap();
  await screen.getByRole('button', { name: 'Sign in' }).tap();
  await expect(screen.getByText('enter a valid email address')).toBeVisible();});
