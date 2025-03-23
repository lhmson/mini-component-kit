import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';
import { TextInput } from '../TextInput';

export interface NewsletterSubscriptionProps {
  /** Optional custom class name */
  className?: string;
  /** Optional custom onSubmit handler */
  onSubmit?: (email: string) => Promise<void>;
  /** Optional loading state */
  isLoading?: boolean;
}

const Container = styled.section`
  max-width: 36rem;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  @media (max-width: 640px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #475569;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

const Message = styled.div<{ $isError?: boolean }>`
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 0.375rem;
  text-align: center;
  font-size: 0.875rem;
  animation: fadeIn 0.2s ease-in;

  ${({ $isError }) =>
    $isError
      ? `
    background-color: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
  `
      : `
    background-color: #dcfce7;
    color: #166534;
    border: 1px solid #bbf7d0;
  `}

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  className,
  onSubmit,
  isLoading = false,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setSuccess(null);

    // Client-side validation
    if (!email) {
      setError('Email address is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(email);
        setSuccess('Subscription successful! Please check your email to confirm.');
        setEmail('');
      } else {
        // Default API call if no onSubmit provided
        const response = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to subscribe');
        }

        setSuccess('Subscription successful! Please check your email to confirm.');
        setEmail('');
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to subscribe. Please ensure your email is correct or try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className={className}>
      <Title>Subscribe to Our Newsletter</Title>
      <Description>
        Stay up to date with our latest news, updates, and exclusive offers.
      </Description>
      <Form onSubmit={handleSubmit} noValidate>
        <TextInput
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          hint={error ? undefined : "We'll never share your email with anyone else."}
          required
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? 'newsletter-error' : undefined}
          disabled={isSubmitting || isLoading}
        />
        <SubmitButton
          type="submit"
          disabled={isSubmitting || isLoading}
          aria-busy={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? 'Subscribing...' : 'Subscribe Now'}
        </SubmitButton>
      </Form>
      {error && (
        <Message $isError role="alert" id="newsletter-error">
          {error}
        </Message>
      )}
      {success && (
        <Message role="status" aria-live="polite">
          {success}
        </Message>
      )}
    </Container>
  );
};
