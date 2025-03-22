import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['medium', 'large', 'xl', '2xl'],
    },
    leftIcon: {
      control: 'text',
    },
    rightIcon: {
      control: 'text',
    },
    isIconOnly: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic button with different variants
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    variant: 'tertiary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

// Size variants
export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
  },
};

export const ExtraLarge: Story = {
  args: {
    children: 'Extra Large Button',
    size: 'xl',
  },
};

export const TwoExtraLarge: Story = {
  args: {
    children: '2XL Button',
    size: '2xl',
  },
};

// Icon variants
export const WithLeftIcon: Story = {
  args: {
    children: 'Button with Left Icon',
    leftIcon: '←',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Button with Right Icon',
    rightIcon: '→',
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Button with Both Icons',
    leftIcon: '←',
    rightIcon: '→',
  },
};

export const IconOnly: Story = {
  args: {
    children: '🔍',
    isIconOnly: true,
  },
};

// States
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

// Interactive states
export const Hover: Story = {
  args: {
    children: 'Hover Me',
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const Focus: Story = {
  args: {
    children: 'Focus Me',
  },
  parameters: {
    pseudo: { focus: true },
  },
};
