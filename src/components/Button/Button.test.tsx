import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  // Test variants
  it('renders with primary variant by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with tertiary variant', () => {
    render(<Button variant="tertiary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with link variant', () => {
    render(<Button variant="link">Click me</Button>);
    const button = screen.getByRole('link');
    expect(button).toHaveTextContent('Click me');
  });

  // Test sizes
  it('renders with medium size by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with large size', () => {
    render(<Button size="large">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with xl size', () => {
    render(<Button size="xl">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  });

  it('renders with 2xl size', () => {
    render(<Button size="2xl">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  });

  // Test icons
  it('renders with left icon', () => {
    render(<Button leftIcon="←">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('←');
  });

  it('renders with right icon', () => {
    render(<Button rightIcon="→">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('→');
  });

  it('renders with both icons', () => {
    render(
      <Button leftIcon="←" rightIcon="→">
        Click me
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('←');
    expect(button).toHaveTextContent('→');
  });

  it('renders as icon-only button', () => {
    render(<Button isIconOnly>🔍</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      padding: '0.5rem',
      borderRadius: '50%',
    });
  });

  // Test states
  it('renders disabled state', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not handle click events when disabled', async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );
    const button = screen.getByRole('button');
    await userEvent.click(button);
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
    expect(button.getAttribute('class')).toContain('custom-class');
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

      // Focus the button
      button.focus();
      expect(button).toHaveFocus();

      // Press Enter
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders icon-only button with aria-label', () => {
      render(
        <Button isIconOnly ariaLabel="Search">
          🔍
        </Button>
      );
      const button = screen.getByRole('button', { name: 'Search' });
      expect(button).toBeInTheDocument();
    });

    it('warns when icon-only button is missing aria-label', () => {
      const consoleSpy = vi.spyOn(console, 'warn');
      render(<Button isIconOnly>🔍</Button>);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Icon-only buttons should have an aria-label for accessibility'
      );
      consoleSpy.mockRestore();
    });

    it('marks icons as decorative with aria-hidden', () => {
      render(
        <Button leftIcon="←" rightIcon="→">
          Click me
        </Button>
      );
      const button = screen.getByRole('button');
      const leftIcon = button.querySelector('.button-icon-left');
      const rightIcon = button.querySelector('.button-icon-right');

      expect(leftIcon).toHaveAttribute('aria-hidden', 'true');
      expect(rightIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders link variant with correct role', () => {
      render(<Button variant="link">Click me</Button>);
      const button = screen.getByRole('link');
      expect(button).toBeInTheDocument();
    });

    it('is not focusable when disabled', () => {
      render(<Button disabled>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabindex', '-1');
      expect(button).toBeDisabled();
    });
  });
});
