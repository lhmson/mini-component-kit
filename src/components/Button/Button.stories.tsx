import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Button',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Button',
  },
};

export const TwoExtraLarge: Story = {
  args: {
    size: '2xl',
    children: 'Button',
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: '←',
    children: 'Button',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: '→',
    children: 'Button',
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: '←',
    rightIcon: '→',
    children: 'Button',
  },
};

export const IconOnly: Story = {
  args: {
    isIconOnly: true,
    'aria-label': 'Search',
    children: '🔍',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Button',
  },
};
