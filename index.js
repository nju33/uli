const chalk = require('chalk');
const emoji = require('node-emoji');
const _ = {
  get: require('lodash.get'),
  template: require('lodash.template'),
  templateSettings: require('lodash.templatesettings')
};

const defaultOpts = {
  decorationType: 'order'
};

module.exports = function uli(data, targetPath, format, opts) {
  'use strict';
  _.templateSettings.interpolate = /{([\s\S]+?)}/g;

  opts = Object.assign({}, defaultOpts, opts);
  const list = _.get(data, targetPath);
  if (Object.prototype.toString.call(list) !== '[object Array]') {
    return;
  }

  for (const idx in list) {
    if (!{}.hasOwnProperty.call(list, idx)) {
      return;
    }

    const item = list[idx];
    _.templateSettings.imports = {
      b(strings) { return chalk.black(item[strings[0]]) },
      black(strings) { return chalk.black(item[strings[0]]) },
      r(strings) { return chalk.red(item[strings[0]]) },
      red(strings) { return chalk.red(item[strings[0]]) },
      g(strings) { return chalk.green(item[strings[0]]) },
      green(strings) { return chalk.green(item[strings[0]]) },
      y(strings) { return chalk.yellow(item[strings[0]]) },
      yellow(strings) { return chalk.yellow(item[strings[0]]) },
      b(strings) { return chalk.blue(item[strings[0]]) },
      blue(strings) { return chalk.blue(item[strings[0]]) },
      m(strings) { return chalk.magenta(item[strings[0]]) },
      magenta(strings) { return chalk.magenta(item[strings[0]]) },
      c(strings) { return chalk.cyan(item[strings[0]]) },
      cyan(strings) { return chalk.cyan(item[strings[0]]) },
      w(strings) { return chalk.white(item[strings[0]]) },
      white(strings) { return chalk.white(item[strings[0]]) },
      g(strings) { return chalk.gray(item[strings[0]]) },
      gray(strings) { return chalk.gray(item[strings[0]]) },
      _
    };

    const decoration = (() => {
      switch (opts.decorationType) {
        case 'order': {
          return `${chalk.bold(Number(idx) + 1)}.`;
        }
        case 'hyphen': {
          return chalk.bold('-');
        }
        case 'arrow': {
          return chalk.bold('->');
        }
        default: {
          return `${emoji.get(opts.decorationType)} `;
        }
      }
    })();
    console.log(`${decoration} ${_.template(format)(item)}`);
  }
}
