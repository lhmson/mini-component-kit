import React from 'react';
import { Button } from './components/Button';

export const App: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Mini Component Kit - Development</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Button Component</h2>
        <div className="space-y-4">
          <div className="space-x-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
          <div className="space-x-4">
            <Button size="small">Small Button</Button>
            <Button size="medium">Medium Button</Button>
            <Button size="large">Large Button</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
