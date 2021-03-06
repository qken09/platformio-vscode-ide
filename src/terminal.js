/**
 * Copyright (c) 2017-present PlatformIO <contact@platformio.org>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import vscode from 'vscode';

export default class PIOTerminal {
  static patchGlobalEnv(context) {
    const envCollection = context.environmentVariableCollection;
    if (!envCollection) {
      return;
    }
    const names = [
      'PLATFORMIO_CALLER',
      'PLATFORMIO_IDE',
      'PATH',
      'Path',
      'HTTP_PROXY',
      'HTTPS_PROXY',
      'NO_PROXY',
      'CURL_CA_BUNDLE',
    ];
    for (const name of names) {
      if (process.env[name]) {
        envCollection.replace(name, process.env[name]);
      }
    }
  }

  constructor() {
    this._instance = undefined;
  }

  new() {
    return vscode.window.createTerminal({
      name: 'PlatformIO',
      env: process.env,
    });
  }

  sendText(text) {
    if (!this._instance) {
      this._instance = this.new();
    }
    this._instance.sendText(text);
    this._instance.show();
  }

  dispose() {
    if (this._instance) {
      this._instance.dispose();
    }
    this._instance = undefined;
  }
}
