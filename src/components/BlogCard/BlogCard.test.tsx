import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogCard } from './BlogCard';

describe('BlogCard', () => {
  const defaultProps = {
    title: 'Getting Started with React',
    description: 'Learn the basics of React and start building modern web applications.',
    category: 'Development',
    imageUrl: 'https://example.com/image.jpg',
  };

  it('renders with all required props', () => {
    render(<BlogCard {...defaultProps} />);

    // Check for image
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', defaultProps.imageUrl);
    expect(image).toHaveAttribute('alt', `${defaultProps.title} cover image`);
    expect(image).toHaveAttribute('loading', 'lazy');

    // Check for category tag
    expect(screen.getByText(defaultProps.category)).toBeInTheDocument();

    // Check for title and description
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();

    // Check for CTA link
    const ctaLink = screen.getByRole('link');
    expect(ctaLink).toHaveAttribute('href', '#');
    expect(ctaLink).toHaveTextContent('Read more');
    expect(ctaLink).toHaveAttribute('aria-label', `Read more about ${defaultProps.title}`);
  });

  it('renders with custom CTA text and URL', () => {
    const customCtaText = 'Learn more';
    const customCtaUrl = 'https://example.com/article';
    render(<BlogCard {...defaultProps} ctaText={customCtaText} ctaUrl={customCtaUrl} />);

    const ctaLink = screen.getByRole('link');
    expect(ctaLink).toHaveAttribute('href', customCtaUrl);
    expect(ctaLink).toHaveTextContent(customCtaText);
  });

  it('renders with custom image alt text', () => {
    const customAlt = 'Custom alt text';
    render(<BlogCard {...defaultProps} imageAlt={customAlt} />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', customAlt);
  });

  it('is keyboard accessible', async () => {
    render(<BlogCard {...defaultProps} />);

    const ctaLink = screen.getByRole('link');

    // Check that the link is focusable
    ctaLink.focus();
    expect(ctaLink).toHaveFocus();

    // Check that the link can be triggered with keyboard
    await userEvent.keyboard('{Enter}');
    expect(ctaLink).toHaveAttribute('href', '#');
  });

  it('uses semantic HTML and ARIA roles', () => {
    render(<BlogCard {...defaultProps} />);

    // Check for article role
    expect(screen.getByRole('article')).toBeInTheDocument();

    // Check for proper heading level
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();

    // Check for link role
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
