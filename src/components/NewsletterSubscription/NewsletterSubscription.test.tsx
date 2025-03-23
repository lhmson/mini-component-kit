import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsletterSubscription } from './NewsletterSubscription';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

describe('NewsletterSubscription', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders newsletter subscription form', () => {
    render(<NewsletterSubscription />);

    expect(screen.getByText('Subscribe to Our Newsletter')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe now/i })).toBeInTheDocument();
  });

  it('shows error message when submitting empty email', async () => {
    const user = userEvent.setup();
    render(<NewsletterSubscription />);

    const submitButton = screen.getByRole('button', { name: /subscribe now/i });
    await user.click(submitButton);

    expect(screen.getByText('Email address is required.')).toBeInTheDocument();
  });

  it('shows error message when submitting invalid email format', async () => {
    const user = userEvent.setup();
    render(<NewsletterSubscription />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /subscribe now/i });
    await user.click(submitButton);

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('calls onSubmit with email when form is submitted with valid email', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn().mockResolvedValue(undefined);
    render(<NewsletterSubscription onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'test@example.com');

    const submitButton = screen.getByRole('button', { name: /subscribe now/i });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com');
  });

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn().mockResolvedValue(undefined);
    render(<NewsletterSubscription onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'test@example.com');

    const submitButton = screen.getByRole('button', { name: /subscribe now/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/subscription successful/i)).toBeInTheDocument();
    });
  });

  it('shows error message when API call fails', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn().mockRejectedValue(new Error('API Error'));
    render(<NewsletterSubscription onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'test@example.com');

    const submitButton = screen.getByRole('button', { name: /subscribe now/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });

  it('disables form elements while submitting', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi
      .fn()
      .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));
    render(<NewsletterSubscription onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'test@example.com');

    const submitButton = screen.getByRole('button', { name: /subscribe now/i });
    await user.click(submitButton);

    expect(emailInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Subscribing...');

    await waitFor(() => {
      expect(emailInput).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent('Subscribe Now');
    });
  });
});
