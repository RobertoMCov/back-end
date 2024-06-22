const tasks = arr => arr.join(' && ')

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      'npm run standard',
      'git reset --mixed',
      'git add -A'
    ])
  }
}