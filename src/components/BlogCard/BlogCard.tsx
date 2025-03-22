import React from 'react';
import styled from 'styled-components';

export interface BlogCardProps {
  /**
   * The title of the blog post
   */
  title: string;
  /**
   * A brief description of the blog post
   */
  description: string;
  /**
   * The category tag for the blog post
   */
  category: string;
  /**
   * The URL of the cover image
   */
  imageUrl: string;
  /**
   * Optional alt text for the cover image
   */
  imageAlt?: string;
  /**
   * The URL for the CTA link
   */
  ctaUrl?: string;
  /**
   * The text for the CTA link
   */
  ctaText?: string;
}

const Card = styled.article`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  max-width: 32rem;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  &:focus-within {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
`;

const CoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CategoryTag = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(59, 130, 246, 0.9);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  z-index: 1;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.75rem;
  line-height: 1.4;
`;

const Description = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: #4b5563;
  margin: 0 0 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CtaLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #2563eb;
  }

  &:focus {
    outline: none;
    color: #2563eb;
    text-decoration: underline;
  }

  &::after {
    content: '→';
    margin-left: 0.5rem;
    transition: transform 0.2s ease-in-out;
  }

  &:hover::after {
    transform: translateX(4px);
  }
`;

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  category,
  imageUrl,
  imageAlt,
  ctaUrl = '#',
  ctaText = 'Read more',
}) => {
  return (
    <Card role="article">
      <ImageContainer>
        <CategoryTag>{category}</CategoryTag>
        <CoverImage src={imageUrl} alt={imageAlt || `${title} cover image`} loading="lazy" />
      </ImageContainer>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <CtaLink href={ctaUrl} aria-label={`Read more about ${title}`}>
          {ctaText}
        </CtaLink>
      </Content>
    </Card>
  );
};
