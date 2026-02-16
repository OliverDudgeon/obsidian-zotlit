# Contributing

Thanks for your interest in improving ZotLit! This project is a PNPM workspace with multiple packages (Obsidian plugin, Zotero plugin, docs, shared libraries). The notes below focus on getting a local build running.

## Prerequisites

- Node.js ≥ 18
- pnpm ≥ 8 (used for all installs/scripts)
- Git LFS enabled (`git lfs install`) so large docs assets are available

## Install

From the repo root:

```bash
pnpm install
```

This installs all workspace dependencies and links the local packages.

## Build everything

Run the aggregate build for all packages:

```bash
pnpm -r --if-present run build
```

This will build libraries, the Obsidian plugin (`app/obsidian`), the Zotero plugin (`app/zotero`), the docs site, and other utilities.

## Build a specific package

Use `--filter` to target one package. Common examples:

```bash
# Obsidian plugin
pnpm --filter zotlit run build

# Zotero plugin
pnpm --filter obzt run build

# Docs site
pnpm --filter docs run build

# Shared database package
pnpm --filter @obzt/database run build
```

Package-level scripts are defined in each package.json. Builds that bundle code (e.g., Obsidian) assume TypeScript has already succeeded.

## Development tips

- Keep `pnpm install` scoped to the repo root so lockfile/workspace remain consistent.
- If you pull changes that add new images to `docs/public`, run `git lfs pull` before building docs.
- For iterative work on one package, prefer `pnpm --filter <pkg> run dev` or equivalent if provided; otherwise run its `build` script.
- If you add dependencies, prefer `pnpm add <dep> --filter <pkg>` so they land in the right package.json.

## Tests and linting

Not every package ships tests, but you can run available checks with:

```bash
pnpm -r --if-present run test
pnpm -r --if-present run lint
```

Thanks for contributing!
