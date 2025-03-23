import type { Meta, StoryObj } from '@storybook/react';
import { FeaturedCollections } from './FeaturedCollections';

const meta: Meta<typeof FeaturedCollections> = {
  title: 'Components/FeaturedCollections',
  component: FeaturedCollections,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeaturedCollections>;

const mockCollections = [
  {
    id: '1',
    name: 'Summer Collection',
    description: 'Discover our latest summer styles perfect for the beach and beyond.',
    imageUrl:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    name: 'Autumn Essentials',
    description: 'Cozy and comfortable pieces for the changing seasons.',
    imageUrl:
      'https://images.unsplash.com/photo-1511401139252-f158d3209c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    name: 'Accessories',
    description: 'Complete your look with our curated selection of accessories.',
    imageUrl:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
];

export const Default: Story = {
  args: {
    collections: mockCollections,
  },
};

export const Loading: Story = {
  args: {
    collections: [],
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    collections: [],
    error: 'Failed to load collections. Please try again later.',
  },
};

export const SingleCollection: Story = {
  args: {
    collections: mockCollections.slice(0, 1),
  },
};

export const TwoCollections: Story = {
  args: {
    collections: mockCollections.slice(0, 2),
  },
};
