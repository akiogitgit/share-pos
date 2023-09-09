module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // feat: , fix: , ...
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'docs', 'test', 'chore'],
    ],
    // feat: {ここ何入れてもOK}
    'subject-case': [0],
  },
}
