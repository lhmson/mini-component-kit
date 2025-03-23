import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  // Test variants
  it('renders with primary variant by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle(
      `backgroundColor: rgb(59, 130, 246),
      color: rgb(255, 255, 255)`
    );
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle(
      `backgroundColor: white,
      color: #374151,
      borderColor: #D1D5DB`
    );
  });

  it('renders with tertiary variant', () => {
    render(<Button variant="tertiary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle(
      `backgroundColor: transparent,
      color: #374151`
    );
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle(
      `backgroundColor: #DC2626,
      color: white`
    );
  });

  it('renders with link variant', () => {
    render(<Button variant="link">Click me</Button>);
    const link = screen.getByRole('link');
    expect(link).toHaveStyle(
      `backgroundColor: transparent,
      color: #3B82F6,
      padding: 0`
    );
  });

  // Test sizes
  it('renders with medium size by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    });
  });

  it('renders with large size', () => {
    render(<Button size="lg">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      padding: '0.625rem 1.25rem',
      fontSize: '1rem',
      lineHeight: '1.5rem',
    });
  });

  it('renders with xl size', () => {
    render(<Button size="xl">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
    });
  });

  it('renders with 2xl size', () => {
    render(<Button size="2xl">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      padding: '0.875rem 1.75rem',
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
    });
  });

  // Test icons
  it('renders with left icon', () => {
    render(<Button leftIcon={<span>👈</span>}>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('👈');
  });

  it('renders with right icon', () => {
    render(<Button rightIcon={<span>👉</span>}>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('👉');
  });

  it('renders with both icons', () => {
    render(
      <Button leftIcon={<span>👈</span>} rightIcon={<span>👉</span>}>
        Click me
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('👈');
    expect(button).toHaveTextContent('👉');
  });

  it('renders as icon-only button', () => {
    render(
      <Button isIconOnly aria-label="Search">
        <span>🔍</span>
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Search' });
    expect(button).toHaveTextContent('🔍');
  });

  // Test states
  it('renders disabled state', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveStyle({
      opacity: '0.5',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    });
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not handle click events when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test accessibility
  it('renders with custom aria-label', () => {
    render(<Button aria-label="Custom label">Click me</Button>);
    const button = screen.getByRole('button', { name: 'Custom label' });
    expect(button).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('is focusable via keyboard', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabindex', '0');
    });

    it('can be focused and triggered with keyboard', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');
      button.focus();
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('renders icon-only button with aria-label', () => {
      render(
        <Button isIconOnly aria-label="Search">
          <span>🔍</span>
        </Button>
      );
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toBeInTheDocument();
    });

    it('warns when icon-only button is missing aria-label', () => {
      const consoleSpy = vi.spyOn(console, 'warn');
      render(
        <Button isIconOnly>
          <span>🔍</span>
        </Button>
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Icon-only buttons should have an aria-label for accessibility'
      );
    });

    it('marks icons as decorative with aria-hidden', () => {
      render(
        <Button leftIcon={<span>👈</span>} rightIcon={<span>👉</span>}>
          Click me
        </Button>
      );
      const button = screen.getByRole('button');
      const icons = button.querySelectorAll('[aria-hidden="true"]');
      expect(icons).toHaveLength(2);
    });

    it('renders link variant with correct role', () => {
      render(<Button variant="link">Click me</Button>);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('is not focusable when disabled', () => {
      render(<Button disabled>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabindex', '-1');
    });
  });
});
