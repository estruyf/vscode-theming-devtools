const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
packageJson.activationEvents = packageJson.activationEvents.filter(v => v !== '*');

fs.writeFileSync(path.join(path.resolve('.'), 'package.json'), JSON.stringify(packageJson, null, 2));