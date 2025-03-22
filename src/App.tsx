import React from 'react';
import { Button } from './components/Button/Button';
import { TestimonialCard } from './components/TestimonialCard/TestimonialCard';

export const App: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Mini Component Kit</h1>

      {/* Button Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Button Components</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="tertiary">Tertiary Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
          <div className="flex gap-4">
            <Button size="large">Large Button</Button>
            <Button size="xl">XL Button</Button>
            <Button size="2xl">2XL Button</Button>
          </div>
          <div className="flex gap-4">
            <Button disabled>Disabled Button</Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
          </div>
          <div className="flex gap-4">
            <Button isIconOnly ariaLabel="Add">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </Button>
            <Button isIconOnly ariaLabel="Delete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Testimonial Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestimonialCard
            name="John Doe"
            username="johndoe"
            testimonial="This is a great product! I would highly recommend it to anyone looking for a solution like this."
            imageUrl="https://i.pravatar.cc/150?img=1"
          />
          <TestimonialCard
            name="Jane Smith"
            username="janesmith"
            testimonial="The best solution I've found in the market. The support team is amazing and the product is exactly what I needed."
            imageUrl="https://i.pravatar.cc/150?img=2"
            maxLines={4}
          />
          <TestimonialCard
            name="Alex Johnson"
            username="alexj"
            testimonial="A game-changer for our team. We've seen a significant improvement in productivity since implementing this solution."
            imageUrl="https://i.pravatar.cc/150?img=3"
            imageAlt="Alex Johnson in a professional headshot"
          />
        </div>
      </section>
    </div>
  );
};
