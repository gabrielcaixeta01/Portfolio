// eslint-config-next 16 já exporta flat config nativo — o array de
// core-web-vitals inclui next e next/typescript, então o FlatCompat
// (e o @eslint/eslintrc junto) deixou de ser necessário.
import coreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...coreWebVitals,
  {
    ignores: [".next/**", "out/**", "node_modules/**"],
  },
];

export default eslintConfig;
