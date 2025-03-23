import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export interface ProfileCardProps {
  name: string;
  title: string;
  profileImage: {
    src: string;
    alt: string;
  };
  socialLinks: SocialLink[];
  ctaButton: {
    text: string;
    onClick: () => void;
  };
}

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  padding: 2rem;
  max-width: 24rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ProfileImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f3f4f6;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileInfo = styled.div`
  text-align: center;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const Title = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0.5rem 0 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const SocialLink = styled.a`
  color: #6b7280;
  transition: color 0.2s ease-in-out;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #3b82f6;
    background-color: #f3f4f6;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  profileImage,
  socialLinks,
  ctaButton,
}) => {
  return (
    <Card role="article">
      <ProfileImage
        src={profileImage.src}
        alt={profileImage.alt}
        loading="lazy"
        width={128}
        height={128}
      />
      <ProfileInfo>
        <Name>{name}</Name>
        <Title>{title}</Title>
      </ProfileInfo>
      <SocialLinks role="list">
        {socialLinks.map((link) => (
          <SocialLink
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.platform} profile`}
            role="listitem"
          >
            {link.icon}
          </SocialLink>
        ))}
      </SocialLinks>
      <Button onClick={ctaButton.onClick}>{ctaButton.text}</Button>
    </Card>
  );
};

ProfileCard.displayName = 'ProfileCard';
