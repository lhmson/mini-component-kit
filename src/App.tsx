import React from 'react';
import { Button } from './components/Button/Button';
import { TestimonialCard } from './components/TestimonialCard/TestimonialCard';
import { BlogCard } from './components/BlogCard/BlogCard';
import styled from 'styled-components';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: #1a1a1a;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const App: React.FC = () => {
  return (
    <AppContainer>
      <Section>
        <SectionTitle>Buttons</SectionTitle>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button>Default Button</Button>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="tertiary">Tertiary Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
      </Section>

      <Section>
        <SectionTitle>Testimonials</SectionTitle>
        <Grid>
          <TestimonialCard
            testimonial="This product has completely transformed our workflow. It's intuitive, powerful, and exactly what we needed."
            name="Sarah Johnson"
            username="sarahj"
            imageUrl="https://i.pravatar.cc/150?img=1"
          />
          <TestimonialCard
            testimonial="The best solution we've found in the market. The support team is exceptional and the features are top-notch."
            name="Michael Chen"
            username="michaelc"
            imageUrl="https://i.pravatar.cc/150?img=2"
          />
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Blog Posts</SectionTitle>
        <Grid>
          <BlogCard
            title="Getting Started with React"
            description="Learn the basics of React and start building modern web applications."
            category="Development"
            imageUrl="https://picsum.photos/800/400?random=1"
            ctaText="Read more"
            ctaUrl="https://example.com/article1"
          />
          <BlogCard
            title="TypeScript Best Practices"
            description="Discover the best practices for writing type-safe code with TypeScript."
            category="Programming"
            imageUrl="https://picsum.photos/800/400?random=2"
            ctaText="Learn more"
            ctaUrl="https://example.com/article2"
          />
          <BlogCard
            title="CSS Grid Layout Guide"
            description="Master CSS Grid layout with this comprehensive guide covering all the essential concepts and techniques."
            category="Web Design"
            imageUrl="https://picsum.photos/800/400?random=3"
            ctaText="View guide"
            ctaUrl="https://example.com/article3"
          />
        </Grid>
      </Section>
    </AppContainer>
  );
};
