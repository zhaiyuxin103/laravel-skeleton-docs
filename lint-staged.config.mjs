export default {
  '**/*': 'prettier --write --ignore-unknown',
  '*.{js,jsx,mjs,cjs,ts,tsx,mts,vue}': ['eslint --fix .'],
};
