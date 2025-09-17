# 🔍 Firestore Indexes Diff

<div align="center">

[![npm](https://img.shields.io/badge/npm-firestore--indexes--diff-c53635?logo=npm)](https://www.npmjs.com/package/firestore-indexes-diff) [![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE) [![typescript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![vitest](https://img.shields.io/badge/tested%20with-vitest-6E9F18?logo=vitest)](https://vitest.dev/)

</div>

A modern CLI tool that displays differences between two Firestore index configuration files, helping you identify missing indexes when deploying across environments.

## ✨ Features

- 🚀 Compare Firestore index configurations between environments
- 📊 Identify missing indexes and field overrides
- 💡 Clean, colorful CLI output with progress indicators
- 📁 Export differences to JSON files for further analysis
- 🔧 Simple command-line interface

## 📋 Prerequisites

Ensure you have your Firestore index configuration files ready. You can export them using the [Cloud Firestore Index Definition Reference](https://firebase.google.com/docs/reference/firestore/indexes).

## 🚀 Quick Start

### Using pnpm dlx (Recommended)

```bash
pnpm dlx firestore-indexes-diff --source dev.json --target prod.json
# npx firestore-indexes-diff --source dev.json --target prod.json
# yarn dlx firestore-indexes-diff --source dev.json --target prod.json
```

### Global Installation

```bash
pnpm add -g firestore-indexes-diff
# npm install -g firestore-indexes-diff
# yarn global add firestore-indexes-diff

diff-indexes --source dev.json --target prod.json
```

## ⚙️ Options

| Option      | Alias | Type   | Required | Description              |
| ----------- | ----- | ------ | -------- | ------------------------ |
| `--source`  | `-s`  | string | ✅       | Source indexes file path |
| `--target`  | `-t`  | string | ✅       | Target indexes file path |
| `--version` | `-v`  |        |          | Show version number      |
| `--help`    | `-h`  |        |          | Show help                |

## 📤 Output

The tool generates the following output files in your current directory:

- `diff-indexes.json` - Contains missing indexes
- `diff-field-overrides.json` - Contains missing field overrides

## 🔄 Workflow Examples

### Development to Production Comparison

```bash
# Compare your development environment against production
pnpm dlx firestore-indexes-diff --source dev-indexes.json --target prod-indexes.json
```

### Staging Environment Sync

```bash
# Ensure staging has all the indexes from development
pnpm dlx firestore-indexes-diff --source dev-indexes.json --target staging-indexes.json
```

### CI/CD Integration

```bash
# In your CI pipeline, validate index completeness
- name: Check Firestore Index Completeness
  run: |
    # Export current production indexes
    firebase firestore:indexes > prod-indexes.json
    
    # Export your project's indexes
    firebase firestore:indexes --project ${{ env.PROJECT_ID }} > current-indexes.json
    
    # Check for missing indexes
    pnpm dlx firestore-indexes-diff --source current-indexes.json --target prod-indexes.json
    
    # Fail if differences found
    if [ -f "diff-indexes.json" ]; then
      echo "Missing indexes detected!"
      cat diff-indexes.json
      exit 1
    fi
```

### Multi-Environment Validation

```bash
# Check multiple environments in sequence
environments=("dev" "staging" "prod")
for env in "${environments[@]}"; do
  echo "Checking $env environment..."
  pnpm dlx firestore-indexes-diff \
    --source master-indexes.json \
    --target "$env-indexes.json"
done
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/omar-dulaimi/firestore-indexes-diff.git
cd firestore-indexes-diff

# Install dependencies
pnpm install

# Build the project
pnpm run build

# Run in development mode
pnpm run dev
```

## 📝 License

MIT © [Omar Dulaimi](https://github.com/omar-dulaimi)
