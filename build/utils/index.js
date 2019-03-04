/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (wei.chen@perfma.com)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

const path = require('path');
const chalk = require('chalk');
const shell = require('shelljs');
const rimraf = require('rimraf');
const semver = require('semver');
const childProcess = require('child_process');
const config = require('../../config');
const packageConfig = require('../../package.json');

const rm = p => new Promise((resolve, reject) => { rimraf(p, e => (e ? reject(e) : resolve())); });
const fullPath = s => path.join(__dirname, '..', '..', s);
const assetsPath = s => path.posix.join(config.assetsSubDirectory, s || '');
const regexEscape = s => s.replace(/[[\]{}()*+!<=:?.\\^$|#\s,]/g, '\\$&');

const checkVersions = () => {
  function exec(cmd) {
    return childProcess.execSync(cmd).toString().trim();
  }

  const versionRequirements = [
    {
      name: 'node',
      currentVersion: semver.clean(process.version),
      versionRequirement: packageConfig.engines.node,
    },
  ];

  if (shell.which('npm')) {
    versionRequirements.push({
      name: 'npm',
      currentVersion: exec('npm --version'),
      versionRequirement: packageConfig.engines.npm,
    });
  }

  const warnings = [];
  versionRequirements.forEach((mod) => {
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(`${mod.name}: ${
        chalk.red(mod.currentVersion)} should be ${
        chalk.green(mod.versionRequirement)}`);
    }
  });

  if (warnings.length) {
    console.log('');
    console.log(chalk.yellow('To use this template, you must update following to modules:'));
    console.log();
    warnings.forEach((warning) => {
      console.log(`  ${warning}`);
    });
    console.log();
    process.exit(1);
  }
};

exports.rm = rm;
exports.fullPath = fullPath;
exports.assetsPath = assetsPath;
exports.regexEscape = regexEscape;
exports.checkVersions = checkVersions;
