# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

- **Build**: `pnpm run build` - Compiles TypeScript to JavaScript in the `lib/` directory
- **Clean**: `pnpm run clean` - Removes the `lib/` directory
- **Dev**: `pnpm run dev` - Runs TypeScript compiler in watch mode
- **Test**: `pnpm run test` - Runs tests with Vitest
- **Test (UI)**: `pnpm run test:ui` - Runs tests with Vitest UI
- **Test (Run)**: `pnpm run test:run` - Runs tests once and exits
- **Test (Coverage)**: `pnpm run test:coverage` - Runs tests with coverage report
- **Lint**: `pnpm run lint` - Runs ESLint and fixes issues
- **Format**: `pnpm run format` - Formats code with Prettier
- **Semantic Release**: `pnpm run semantic-release` - Runs semantic release
- **Package and Publish**: `pnpm run package:publish` - Runs packaging script and publishes to npm

## Project Architecture

This is a CLI tool that compares two Firestore index configuration files and identifies missing indexes.

### Core Structure

- **Entry Point**: `bin/index.ts` - CLI interface using Commander.js with figlet banner
- **Main Logic**: `main.ts` - Orchestrates the comparison workflow
- **Core Functions**: `helpers.ts` - Contains the diff algorithms and file operations
- **Types**: `types.ts` - TypeScript interface definitions

### Key Components

1. **CLI Interface** (`bin/index.ts`):
   - Uses Commander.js for argument parsing
   - Requires `--source` and `--target` file paths
   - Displays styled banner with figlet

2. **Main Workflow** (`main.ts`):
   - Parses both source and target JSON files
   - Compares indexes using `diffIndexes()`
   - Compares field overrides using `diffFieldOverrides()`
   - Outputs results using `writeDiffs()`

3. **Diff Logic** (`helpers.ts`):
   - `diffIndexes()`: Compares indexes by collectionGroup, queryScope, and fields
   - `diffFieldOverrides()`: Compares field overrides and their nested indexes
   - `writeDiffs()`: Writes missing items to JSON files in current directory

### Output Files

- Missing indexes → `diff-indexes.json`
- Missing field overrides → `diff-field-overrides.json`

### Dependencies

Uses ES modules with Node.js, TypeScript compilation targets ES2019. Key dependencies include chalk for styling, ora for spinners, and commander for CLI parsing.
