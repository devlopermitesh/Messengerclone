import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable this rule
       "@typescript-eslint/no-explicit-any": "off", // Disable any-type errors
      "react/no-unescaped-entities": "off", // Disable unescaped entities warnings
      "import/no-anonymous-default-export": "off", // Disable anonymous default export warnings
      "react-hooks/exhaustive-deps": "warn", // Change exhaustive-deps from error to warn
      "jsx-a11y/alt-text": "off", // Disable alt-text warnings for images (not recommended for production)
    },
  },
];

export default eslintConfig;
