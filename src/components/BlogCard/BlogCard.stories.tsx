import type { Meta, StoryObj } from '@storybook/react';
import { BlogCard } from './BlogCard';

const meta: Meta<typeof BlogCard> = {
  title: 'Components/BlogCard',
  component: BlogCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlogCard>;

export const Default: Story = {
  args: {
    title: 'Getting Started with React',
    description: 'Learn the basics of React and start building modern web applications.',
    category: 'Development',
    imageUrl: 'https://picsum.photos/800/400',
  },
};

export const WithCustomCTA: Story = {
  args: {
    ...Default.args,
    ctaText: 'Learn more',
    ctaUrl: 'https://example.com/article',
  },
};

export const WithLongContent: Story = {
  args: {
    ...Default.args,
    title:
      'Getting Started with React: A Comprehensive Guide to Building Modern Web Applications with React and TypeScript',
    description:
      "Learn the basics of React and start building modern web applications. This comprehensive guide covers everything from setting up your development environment to deploying your first React application. We'll explore component composition, state management, and best practices for writing clean, maintainable code.",
  },
};

export const WithCustomImageAlt: Story = {
  args: {
    ...Default.args,
    imageAlt: 'React development environment setup',
  },
};
