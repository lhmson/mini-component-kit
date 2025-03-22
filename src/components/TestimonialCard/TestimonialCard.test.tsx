import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestimonialCard } from './TestimonialCard';

describe('TestimonialCard', () => {
  const defaultProps = {
    name: 'John Doe',
    username: 'johndoe',
    testimonial: 'This is a great product!',
    imageUrl: 'https://example.com/image.jpg',
  };

  it('renders with all required props', () => {
    render(<TestimonialCard {...defaultProps} />);

    // Check for profile image
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', defaultProps.imageUrl);
    expect(image).toHaveAttribute('alt', `${defaultProps.name}'s profile picture`);
    expect(image).toHaveAttribute('loading', 'lazy');

    // Check for name and username
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(`@${defaultProps.username}`)).toBeInTheDocument();

    // Check for testimonial text
    expect(screen.getByText(defaultProps.testimonial)).toBeInTheDocument();
  });

  it('renders with custom image alt text', () => {
    const customAlt = 'Custom alt text';
    render(<TestimonialCard {...defaultProps} imageAlt={customAlt} />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', customAlt);
  });

  it('handles long name and username', () => {
    const longName = 'John Doe'.repeat(10);
    const longUsername = 'johndoe'.repeat(10);
    render(<TestimonialCard {...defaultProps} name={longName} username={longUsername} />);

    const nameElement = screen.getByText(longName);
    const usernameElement = screen.getByText(`@${longUsername}`);

    // Check that long text is truncated
    expect(nameElement).toHaveStyle({
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    });

    expect(usernameElement).toHaveStyle({
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    });
  });

  it('respects custom maxLines prop', () => {
    const longTestimonial = 'This is a great product! '.repeat(20);
    render(<TestimonialCard {...defaultProps} testimonial={longTestimonial} maxLines={5} />);

    // Find the testimonial element by its role and partial text
    const testimonialElement = screen.getByRole('article').querySelector('p');
    expect(testimonialElement).toBeInTheDocument();
    expect(testimonialElement?.textContent).toContain('This is a great product!');

    // Check that the text is truncated with custom maxLines
    expect(testimonialElement).toHaveStyle({
      WebkitLineClamp: '5',
      textOverflow: 'ellipsis',
    });
  });

  it('uses semantic HTML and ARIA roles', () => {
    render(<TestimonialCard {...defaultProps} />);

    // Check for article role
    expect(screen.getByRole('article')).toBeInTheDocument();

    // Check for proper heading level
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});
