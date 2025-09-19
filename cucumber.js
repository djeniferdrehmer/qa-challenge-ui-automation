const base = {
  require: ['steps/**/*.js', 'support/**/*.js'],
  format: ['progress', 'json:reports/cucumber-report.json'],
  paths: ['features/**/*.feature'],
  parallel: 2
};

const profile = (tags) => ({ ...base, tags });

module.exports = {
  default: base,
  signin:  profile('@signin'),
  signup:  profile('@signup')
}