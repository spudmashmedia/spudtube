/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Spudmash Media Pty Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
module.exports = {
  apps : [

    // API: Streaming Service
    {
      name      : 'API',
      script    : 'src/api/server.js',
      watch     : ['src/api'],
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // WEB: Media Player
    {
      name      : 'WEB',
      script    : 'src/web/app.js',
      watch     : ['src/web']
    }
  ]
};
