# Weather Forecast

A modern weather forecast application built with Next.js and React.

## Deployment

| Environment | URL                                      |
| ----------- | ---------------------------------------- |
| Production  | https://weather-forecast-luke.vercel.app |

## Documentation

- [Getting started](./docs/GETTING_STARTED.md)
- [Tech ecosystem](./docs/TECH_ECOSYSTEM.md)
- [Editor](./docs/EDITOR.md)
- [Deployment](./docs/DEPLOYMENT.md)

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with React 19
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **UI Utilities**:
  - [class-variance-authority](https://cva.style/docs)
  - [clsx](https://github.com/lukeed/clsx)
  - [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Code Quality**:
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
  - [lint-staged](https://github.com/okonet/lint-staged)
  - [Husky](https://typicode.github.io/husky/)
  - [CommitLint](https://commitlint.js.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [pnpm](https://pnpm.io/installation) (v8 or newer)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hthai2201/weather-forecast.git
   cd weather-forecast
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Workflow

### Available Scripts

- `pnpm dev` - Start development server using Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality
- `pnpm format` - Format all files with Prettier

### Code Quality

- **ESLint**: Enforces code quality rules
- **Prettier**: Ensures consistent code formatting
- **lint-staged**: Runs linters on staged files before committing
- **Husky**: Automates git hooks for quality checks

### Git Workflow

We use conventional commits to maintain a clean git history:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style/formatting (no code change)
- `refactor`: Code refactoring (no feat/fix)
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `build`: Build system or dependencies
- `ci`: CI/CD configuration
- `chore`: Maintenance tasks
- `revert`: Revert previous commit

Pre-commit hooks will automatically:

1. Format your code with Prettier
2. Lint your code with ESLint
3. Validate commit messages with CommitLint

## License

MIT
