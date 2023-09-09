module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // feat: , fix: , ...
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'docs', 'chore'],
    ],
    // feat: {ここ何入れてもOK}
    'subject-case': [0],
  },
}
