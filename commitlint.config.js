export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Code style/formatting (no code change)
        'refactor', // Code refactoring (no feat/fix)
        'perf', // Performance improvements
        'test', // Adding or fixing tests
        'build', // Build system or dependencies
        'ci', // CI/CD configuration
        'chore', // Maintenance tasks
        'revert', // Revert previous commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
  },
};
