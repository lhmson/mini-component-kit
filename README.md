# Mini Component Kit

A modern React component library built with TypeScript, Tailwind CSS, and styled-components.

## Features

- 🎨 Modern and customizable components
- 📦 Built with TypeScript for type safety
- 🎯 Tailwind CSS for utility-first styling
- 💅 Styled-components for dynamic styling
- 📚 Storybook for component documentation
- 🧪 Comprehensive testing setup
- 🐳 Docker support
- 🔄 CI/CD with GitHub Actions

## Installation

```bash
npm install mini-component-kit
# or
yarn add mini-component-kit
```

## Usage

```tsx
import { Button } from 'mini-component-kit';

function App() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  );
}
```

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Start Storybook:
   ```bash
   npm run storybook
   # or
   yarn storybook
   ```

## Pattern to create new components

1. Create a new directory in src/components
2. Create the component file (e.g., ComponentName.tsx)
3. Create an index file for exports
4. Create a Storybook story file
5. Create a test file
6. Export the component in src/index.ts

## Testing

```bash
npm run test
# or
yarn test
```

## Building

```bash
npm run build
# or
yarn build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 