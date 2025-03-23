import type { Meta, StoryObj } from '@storybook/react';
import { NewsletterSubscription } from './NewsletterSubscription';

const meta = {
  title: 'Components/NewsletterSubscription',
  component: NewsletterSubscription,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewsletterSubscription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithCustomSubmit: Story = {
  args: {
    onSubmit: async (email: string) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (!email.endsWith('@example.com')) {
        throw new Error('Only @example.com emails are allowed in this demo.');
      }
    },
  },
};
