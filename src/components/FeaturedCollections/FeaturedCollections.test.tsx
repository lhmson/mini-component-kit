import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturedCollections } from './FeaturedCollections';

const mockCollections = [
  {
    id: '1',
    name: 'Summer Collection',
    description: 'Summer styles',
    imageUrl: 'summer.jpg',
  },
  {
    id: '2',
    name: 'Autumn Collection',
    description: 'Autumn styles',
    imageUrl: 'autumn.jpg',
  },
  {
    id: '3',
    name: 'Winter Collection',
    description: 'Winter styles',
    imageUrl: 'winter.jpg',
  },
];

describe('FeaturedCollections', () => {
  it('renders collections correctly', () => {
    render(<FeaturedCollections collections={mockCollections} />);

    expect(screen.getByText('Featured Collections')).toBeInTheDocument();
    expect(screen.getByText('Summer Collection')).toBeInTheDocument();
    expect(screen.getByText('Autumn Collection')).toBeInTheDocument();
    expect(screen.getByText('Winter Collection')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<FeaturedCollections collections={[]} isLoading />);

    expect(screen.getByText('Loading collections...')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveAttribute('aria-busy', 'true');
  });

  it('shows error state', () => {
    const errorMessage = 'Failed to load collections';
    render(<FeaturedCollections collections={[]} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('limits to 3 collections maximum', () => {
    const extraCollections = [
      ...mockCollections,
      {
        id: '4',
        name: 'Extra Collection',
        description: 'Extra styles',
        imageUrl: 'extra.jpg',
      },
    ];

    render(<FeaturedCollections collections={extraCollections} />);

    expect(screen.queryByText('Extra Collection')).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('applies correct variant based on collection index', () => {
    render(<FeaturedCollections collections={mockCollections} />);

    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveStyle({ 'grid-area': 'primary' });
    expect(items[1]).not.toHaveStyle({ 'grid-area': 'primary' });
    expect(items[2]).not.toHaveStyle({ 'grid-area': 'primary' });
  });
});
