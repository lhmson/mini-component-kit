import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithHint: Story = {
  args: {
    ...Default.args,
    hint: 'Username must be at least 3 characters long',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Username is required',
  },
};

export const WithIcons: Story = {
  args: {
    ...Default.args,
    startIcon: <span>🔍</span>,
    endIcon: <span>✓</span>,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: 'johndoe',
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: 'johndoe',
  },
};

export const WithCustomWidth: Story = {
  args: {
    ...Default.args,
    style: { width: '300px' },
  },
};
