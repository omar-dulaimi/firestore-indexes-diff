# Firestore Indexes Diff

[![npm version](https://badge.fury.io/js/firestore-indexes-diff.svg)](https://badge.fury.io/js/firestore-indexes-diff)
[![npm](https://img.shields.io/npm/dt/firestore-indexes-diff.svg)](https://www.npmjs.com/package/firestore-indexes-diff)
[![HitCount](https://hits.dwyl.com/omar-dulaimi/firestore-indexes-diff.svg?style=flat)](http://hits.dwyl.com/omar-dulaimi/firestore-indexes-diff)
[![npm](https://img.shields.io/npm/l/firestore-indexes-diff.svg)](LICENSE)

Display differences between two Firestore indexes config files

<p align="center">
  <a href="https://www.buymeacoffee.com/omardulaimi">
    <img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="41" width="174">
  </a>
</p>

## Table of Contents

- [Firestore Indexes Diff](#firestore-indexes-diff)
  - [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
  - [With npx](#with-npx)
  - [With npm](#with-npm)
- [Available Options](#available-options)

# Prerequisites

- Make sure to have the indexes files ready. Refer to [Cloud Firestore Index Definition Reference](https://firebase.google.com/docs/reference/firestore/indexes) to see how you can export them

# Usage

- Don't forget to star this repo 😉

## With npx

```shell
npx firestore-indexes-diff --source dev.json --target prod.json
```

## With npm

1- Install the library

- npm

```bash
 npm install -g firestore-indexes-diff
```

or

- yarn

```bash
 yarn global add firestore-indexes-diff
```

2- Execute command

```shell
diff-indexes --source dev.json --target prod.json
```

# Available Options

- `source`: string - Source indexes file path with extension

  - alias: `s`
  - required

- `target`: string - Target indexes file path with extension

  - alias: `t`
  - required

