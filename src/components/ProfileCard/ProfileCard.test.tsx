import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileCard } from './ProfileCard';

const mockSocialLinks = [
  {
    platform: 'Twitter',
    url: 'https://twitter.com/example',
    icon: <span data-testid="twitter-icon">🐦</span>,
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/example',
    icon: <span data-testid="linkedin-icon">💼</span>,
  },
];

const mockProps = {
  name: 'John Doe',
  title: 'Software Engineer',
  profileImage: {
    src: 'https://example.com/profile.jpg',
    alt: 'John Doe profile picture',
  },
  socialLinks: mockSocialLinks,
  ctaButton: {
    text: 'Contact Me',
    onClick: vi.fn(),
  },
};

describe('ProfileCard', () => {
  it('renders profile information correctly', () => {
    render(<ProfileCard {...mockProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe profile picture')).toBeInTheDocument();
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
  });

  it('renders social links correctly', () => {
    render(<ProfileCard {...mockProps} />);

    const twitterLink = screen.getByLabelText('Twitter profile');
    const linkedinLink = screen.getByLabelText('LinkedIn profile');

    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/example');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/example');
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
  });

  it('calls onClick handler when CTA button is clicked', () => {
    render(<ProfileCard {...mockProps} />);

    const ctaButton = screen.getByText('Contact Me');
    fireEvent.click(ctaButton);

    expect(mockProps.ctaButton.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with proper accessibility attributes', () => {
    render(<ProfileCard {...mockProps} />);

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
