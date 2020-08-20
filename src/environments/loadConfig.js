const writeFile = require('fs').writeFileSync;

const config = require('../../config.json');

const targetPath = './src/environments/environment.ts';

if (!config) {
  throw new Error('Config file required');
}
if (!config.env) {
  throw new Error('Env not defined');
}
if (!config[config.env]) {
  throw new Error('No config defined for env: ' + config.env);
}
if (!config[config.env].frontend) {
  throw new Error('No frontend config defined for env: ' + config.env);
}
if (!(typeof config[config.env].frontend.production === 'boolean')) {
  throw new Error(
    'Frontend config must contain production property with boolean value for env: ' +
      config.env
  );
}
if (!config[config.env].frontend.baseUrl) {
  if (config[config.env].usingWebServer) {
    throw new Error(
      'Frontend config must contain baseUrl property with string value for env: ' +
        config.env
    );
  } else {
    config[config.env].frontend.baseUrl = '/';
  }
} else if (!config[config.env].frontend.baseUrl.endsWith('/')) {
  config[config.env].frontend.baseUrl += '/';
}
const envConfigFile =
  'export const environment = ' +
  JSON.stringify({
    ...config[config.env].frontend,
    env: config.env
  });

writeFile(targetPath, envConfigFile, 'utf8');
