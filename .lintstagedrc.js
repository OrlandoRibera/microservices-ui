module.exports = {
  '*.{js,ts}': ['eslint --fix', 'prettier --write'],
  '*.{html,css,scss,json,md}': ['prettier --write']
};
