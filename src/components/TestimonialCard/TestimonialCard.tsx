import React from 'react';
import styled from 'styled-components';

export interface TestimonialCardProps {
  /**
   * The full name of the person giving the testimonial
   */
  name: string;
  /**
   * The username or handle of the person
   */
  username: string;
  /**
   * The testimonial text
   */
  testimonial: string;
  /**
   * The URL of the profile image
   */
  imageUrl: string;
  /**
   * Optional alt text for the profile image
   */
  imageAlt?: string;
  /**
   * Optional maximum number of lines for the testimonial text
   * @default 3
   */
  maxLines?: number;
}

const Card = styled.article`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-width: 32rem;
  width: 100%;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0; /* Enable text truncation */
`;

const Name = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Username = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TestimonialText = styled.p<{ maxLines: number }>`
  font-size: 0.875rem;
  line-height: 1.5;
  color: #374151;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: ${({ maxLines }) => maxLines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  username,
  testimonial,
  imageUrl,
  imageAlt,
  maxLines = 3,
}) => {
  return (
    <Card role="article">
      <ProfileSection>
        <ProfileImage src={imageUrl} alt={imageAlt || `${name}'s profile picture`} loading="lazy" />
        <ProfileInfo>
          <Name>{name}</Name>
          <Username>@{username}</Username>
        </ProfileInfo>
      </ProfileSection>
      <TestimonialText maxLines={maxLines}>{testimonial}</TestimonialText>
    </Card>
  );
};
