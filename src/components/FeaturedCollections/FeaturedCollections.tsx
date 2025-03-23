import React from 'react';
import styled, { css } from 'styled-components';

export interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface FeaturedCollectionsProps {
  collections: Collection[];
  isLoading?: boolean;
  error?: string;
}

const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'primary secondary-1'
      'primary secondary-2';
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: 'primary secondary-1 secondary-2';
  }
`;

interface CardProps {
  $variant: 'primary' | 'secondary';
}

const Card = styled.article<CardProps>`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  &:focus-within {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  ${({ $variant }) =>
    $variant === 'primary'
      ? css`
          grid-area: primary;

          @media (min-width: 768px) {
            aspect-ratio: 1;
          }

          @media (min-width: 1024px) {
            aspect-ratio: 1;
          }
        `
      : css`
          &:nth-of-type(2) {
            grid-area: secondary-1;
          }

          &:nth-of-type(3) {
            grid-area: secondary-2;
          }

          @media (min-width: 768px) {
            aspect-ratio: 1.5;
          }

          @media (min-width: 1024px) {
            aspect-ratio: 0.75;
          }
        `}
`;

const BackgroundImage = styled.div<{ $imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%);
  }

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
`;

const CollectionName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const LoadingGrid = styled(Grid)`
  min-height: 400px;
  background: #f3f4f6;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #dc2626;
  padding: 2rem;
  background: #fee2e2;
  border-radius: 1rem;
  margin: 2rem 0;
`;

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  collections,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <Container>
        <Title>Featured Collections</Title>
        <LoadingGrid role="alert" aria-busy="true">
          <span>Loading collections...</span>
        </LoadingGrid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Featured Collections</Title>
        <ErrorMessage role="alert">{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Featured Collections</Title>
      <Grid role="list">
        {collections.slice(0, 3).map((collection, index) => (
          <Card
            key={collection.id}
            $variant={index === 0 ? 'primary' : 'secondary'}
            role="listitem"
          >
            <BackgroundImage
              $imageUrl={collection.imageUrl}
              role="img"
              aria-label={`${collection.name} collection background`}
            />
            <Content>
              <CollectionName>{collection.name}</CollectionName>
              <Description>{collection.description}</Description>
            </Content>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

FeaturedCollections.displayName = 'FeaturedCollections';
