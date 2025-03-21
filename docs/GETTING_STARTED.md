# Getting Started with Weather Forecast App

This guide will help you set up the Weather Forecast application on your local machine for development and testing.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or newer)
- pnpm (v8 or newer)
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/hthai2201/weather-forecast.git
cd weather-forecast
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

Create a .env.local file in the root of the project by copying the example file:

```bash
cp .env.example .env.local
```

Then edit the .env.local file to add your API key:

```
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
NEXT_PUBLIC_API_BASE_URL=https://api.openweathermap.org/data/2.5
```

You can obtain an API key by signing up at [OpenWeatherMap](https://openweathermap.org/api).

## Development

To start the development server:

```bash
pnpm dev
```

This will start the application in development mode with hot-reload. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
weather-forecast/
├── app/                  # Next.js app directory (routes)
├── components/           # React components
│   ├── common/           # Shared components
│   ├── home/             # Home page components
│   └── ui/               # UI components (shadcn/ui)
├── hooks/                # Custom React hooks
│   └── apis/             # API-related hooks
├── lib/                  # Utility functions and libraries
├── public/               # Static files
├── types/                # TypeScript type definitions
└── docs/                 # Documentation
```

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Lint the codebase
- `pnpm lint-staged` - Run linters on staged files
- `pnpm format` - Format code with Prettier

## Testing the API

During development, you can use the mock data provided in mock-data.ts. This allows you to develop without making actual API calls.

To switch between mock data and real API:

1. Edit the API hooks in apis to use real API endpoints
2. Ensure your API key is set in the environment variables

## Code Quality

We use several tools to maintain code quality:

- ESLint - For code linting
- Prettier - For code formatting
- TypeScript - For type checking
- Husky - For pre-commit hooks
- lint-staged - For running linters on staged files
- Commitlint - For commit message convention enforcement

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [OpenWeatherMap API Documentation](https://openweathermap.org/api)

## Troubleshooting

### API Key Issues

If you're experiencing issues with the API:

- Verify your API key is correct
- Check API usage limits on your OpenWeatherMap account
- Ensure environment variables are properly loaded

### Build Issues

If you encounter build problems:

- Clear .next folder: `rm -rf .next`
- Delete node_modules and reinstall: `rm -rf node_modules && pnpm install`
- Ensure you have the correct Node.js version

## Contributing

Please see our Contributing Guidelines for information on how to contribute to this project.
