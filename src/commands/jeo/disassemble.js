/*
 * SPDX-FileCopyrightText: Copyright (c) 2022-2025 Objectionary.com
 * SPDX-License-Identifier: MIT
 */

const rel = require('relative');
const {mvnw, flags} = require('../../mvnw');
const path = require('path');

/**
 * Disassemble .class files to .xmir files.
 * @param {Object} opts - All options
 * @return {Promise} of disassemble task
 */
module.exports = function(opts) {
  return mvnw(
    ['jeo:disassemble']
      .concat(flags(opts))
      .concat(
        [
          `-Djeo.version=${opts.jeoVersion}`,
          `-Djeo.disassemble.sourcesDir=${path.resolve(opts.target, opts.classes)}`,
          `-Djeo.disassemble.outputDir=${path.resolve(opts.target, opts.xmirs)}`,
        ]
      ),
    opts.target, opts.batch
  ).then((r) => {
    console.info(
      'Bytecode .class files from %s disassembled to .xmir to %s',
      rel(opts.classes), rel(opts.xmirs)
    );
    return r;
  });
};
