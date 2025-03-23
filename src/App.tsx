import React from 'react';
import styled from 'styled-components';
import {
  Button,
  TextInput,
  BlogCard,
  TestimonialCard,
  ProfileCard,
  FeaturedCollections,
  NewsletterSubscription,
} from './components';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const socialLinks = [
  {
    platform: 'Twitter',
    url: 'https://twitter.com/example',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/example',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/example',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

const blogPosts = [
  {
    title: 'Getting Started with React',
    description: 'Learn the basics of React and how to create your first component.',
    imageUrl:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Development',
    author: 'John Doe',
    date: '2024-03-15',
  },
  {
    title: 'Advanced TypeScript Patterns',
    description:
      'Explore advanced TypeScript patterns and best practices for your React applications.',
    imageUrl:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Programming',
    author: 'Jane Smith',
    date: '2024-03-14',
  },
];

const testimonials = [
  {
    testimonial:
      'This component library has made our development process much faster and more consistent.',
    name: 'Sarah Johnson',
    username: 'sarahj',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
  },
  {
    testimonial: 'The components are well-designed, accessible, and easy to customize.',
    name: 'Michael Chen',
    username: 'michaelc',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
  },
];

const mockCollections = [
  {
    id: '1',
    name: 'Summer Collection',
    description: 'Discover our latest summer styles perfect for the beach and beyond.',
    imageUrl:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    name: 'Autumn Essentials',
    description: 'Cozy and comfortable pieces for the changing seasons.',
    imageUrl:
      'https://images.unsplash.com/photo-1511401139252-f158d3209c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    name: 'Accessories',
    description: 'Complete your look with our curated selection of accessories.',
    imageUrl:
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  },
];

export const App: React.FC = () => {
  return (
    <AppContainer>
      <Section>
        <SectionTitle>Buttons</SectionTitle>
        <ComponentGrid>
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="tertiary">Tertiary Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="link">Link Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button leftIcon={<span>👋</span>}>With Left Icon</Button>
          <Button rightIcon={<span>→</span>}>With Right Icon</Button>
          <Button isIconOnly aria-label="Settings">
            <span>⚙️</span>
          </Button>
        </ComponentGrid>
      </Section>

      <Section>
        <SectionTitle>Text Inputs</SectionTitle>
        <ComponentGrid>
          <TextInput label="Default Input" placeholder="Enter text..." />
          <TextInput
            label="With Error"
            error="This field is required"
            placeholder="Enter text..."
          />
          <TextInput label="With Hint" hint="Enter your full name" placeholder="Enter text..." />
          <TextInput
            label="With Icons"
            startIcon={<span>🔍</span>}
            endIcon={<span>✓</span>}
            placeholder="Search..."
          />
          <TextInput label="Disabled" disabled placeholder="Disabled input" />
        </ComponentGrid>
      </Section>

      <Section>
        <SectionTitle>Blog Cards</SectionTitle>
        <ComponentGrid>
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </ComponentGrid>
      </Section>

      <Section>
        <SectionTitle>Testimonial Cards</SectionTitle>
        <ComponentGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </ComponentGrid>
      </Section>

      <Section>
        <SectionTitle>Profile Cards</SectionTitle>
        <ComponentGrid>
          <ProfileCard
            name="John Doe"
            title="Senior Software Engineer"
            profileImage={{
              src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              alt: 'John Doe profile picture',
            }}
            socialLinks={socialLinks}
            ctaButton={{
              text: 'Contact Me',
              onClick: () => alert('Contact button clicked!'),
            }}
          />
          <ProfileCard
            name="Jane Smith"
            title="Product Designer"
            profileImage={{
              src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              alt: 'Jane Smith profile picture',
            }}
            socialLinks={[socialLinks[0], socialLinks[1]]}
            ctaButton={{
              text: 'View Portfolio',
              onClick: () => alert('Portfolio button clicked!'),
            }}
          />
        </ComponentGrid>
      </Section>

      <Section>
        <SectionTitle>Featured Collections</SectionTitle>
        <FeaturedCollections collections={mockCollections} />
      </Section>

      <Section>
        <SectionTitle>Newsletter Subscription</SectionTitle>
        <NewsletterSubscription />
      </Section>
    </AppContainer>
  );
};
