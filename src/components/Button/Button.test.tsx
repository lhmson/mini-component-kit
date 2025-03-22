import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    const primaryButton = screen.getByRole('button');
    expect(primaryButton).toHaveClass('primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    const secondaryButton = screen.getByRole('button');
    expect(secondaryButton).toHaveClass('secondary');

    rerender(<Button variant="outline">Outline</Button>);
    const outlineButton = screen.getByRole('button');
    expect(outlineButton).toHaveClass('outline');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    const smallButton = screen.getByRole('button');
    expect(smallButton).toHaveClass('small');

    rerender(<Button size="medium">Medium</Button>);
    const mediumButton = screen.getByRole('button');
    expect(mediumButton).toHaveClass('medium');

    rerender(<Button size="large">Large</Button>);
    const largeButton = screen.getByRole('button');
    expect(largeButton).toHaveClass('large');
  });
});
