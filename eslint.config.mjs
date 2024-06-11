import globals from "globals";
import pluginJs from "@eslint/js";


// export default [
//   {languageOptions: { globals: {...globals.browser, ...globals.node} }},



//   pluginJs.configs.recommended,
// ];
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 12,
      sourceType: "module",
    },
    rules: {
      'no-console': 'off', // Allow console.log statements
      'indent': ['error', 2], // Enforce 2-space indentation
      'quotes': ['error', 'single'], // Enforce single quotes
      'semi': ['error', 'always'], // Enforce semicolons
      'linebreak-style': ['error', 'unix'], // Enforce Unix line endings
    },
  },
  pluginJs.configs.recommended,
];