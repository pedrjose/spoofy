import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
      "import/extensions": [
        "error",
        "ignorePackages",
        { ts: "never", tsx: "never" },
      ],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowExpressions: true },
      ],
      "max-len": [
        "warn",
        { code: 100, ignoreComments: true, ignoreUrls: true },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/prefer-default-export": "off",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  }
);
