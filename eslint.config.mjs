import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/node_modules/**",
      "**/*.tsbuildinfo",
      "**/typings/**",
      "**/.release-it.js",
      "**/.eslintcache",
      "**/.cache/**",
      "**/coverage/**",
      "**/.turbo/**",
      "**/.rush/**",
      "**/.pnpm-store/**",
      "**/pnpm-lock.yaml",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,tsx,js,cjs,mjs}", "**/*.cts", "**/*.mts"],
    languageOptions: {
      parserOptions: {
        project: [
          "app/**/tsconfig*.json",
          "lib/**/tsconfig*.json",
          "utils/**/tsconfig*.json",
          "docs/tsconfig*.json",
          "common/config/eslint/tsconfig.json",
        ],
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: [
      "app/obsidian/**/*.{ts,tsx,js,cjs,mjs}",
      "app/obsidian/**/*.cts",
      "app/obsidian/**/*.mts",
    ],
    languageOptions: {
      parserOptions: {
        project: false,
        tsconfigRootDir: __dirname,
      },
      globals: {
        HTMLElement: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/no-array-delete": "off",
      "@typescript-eslint/no-duplicate-type-constituents": "off",
      "@typescript-eslint/no-implied-eval": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/only-throw-error": "off",
      "@typescript-eslint/prefer-promise-reject-errors": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-unsafe-unary-minus": "off",
      "@typescript-eslint/no-unsafe-declaration-merging": "off",
      "class-methods-use-this": "off",
      "no-unused-expressions": "off",
      "no-unused-private-class-members": "off",
      "prefer-promise-reject-errors": "off",
    },
  },
  {
    files: [
      "app/zotero/**/*.{ts,tsx,js,cjs,mjs}",
      "app/zotero/**/*.cts",
      "app/zotero/**/*.mts",
    ],
    languageOptions: {
      parserOptions: {
        project: ["app/zotero/tsconfig.json"],
      },
    },
    rules: {
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-misused-promises": "off",
    },
  },
];
