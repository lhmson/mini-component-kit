import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialCard } from './TestimonialCard';

const meta: Meta<typeof TestimonialCard> = {
  title: 'Components/TestimonialCard',
  component: TestimonialCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TestimonialCard>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    username: 'johndoe',
    testimonial:
      'This is a great product! I would highly recommend it to anyone looking for a solution like this.',
    imageUrl: 'https://i.pravatar.cc/150?img=1',
  },
};

export const LongContent: Story = {
  args: {
    name: 'John Doe'.repeat(5),
    username: 'johndoe'.repeat(5),
    testimonial: 'This is a great product! '.repeat(20),
    imageUrl: 'https://i.pravatar.cc/150?img=2',
  },
};

export const CustomMaxLines: Story = {
  args: {
    name: 'John Doe',
    username: 'johndoe',
    testimonial: 'This is a great product! '.repeat(20),
    imageUrl: 'https://i.pravatar.cc/150?img=3',
    maxLines: 5,
  },
};

export const CustomImageAlt: Story = {
  args: {
    name: 'John Doe',
    username: 'johndoe',
    testimonial: 'This is a great product!',
    imageUrl: 'https://i.pravatar.cc/150?img=4',
    imageAlt: 'John Doe smiling in a professional headshot',
  },
};
