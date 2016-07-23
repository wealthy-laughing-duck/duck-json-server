[![Build Status](https://travis-ci.org/wealthy-laughing-duck/duck-json-server.svg?branch=master)](https://travis-ci.org/wealthy-laughing-duck/duck-json-server)

# duck-json-server

Fake REST API for Wealthy Laughing Duck project.

# software used

 * [json-server](https://github.com/typicode/json-server) - node.js in-memory fake REST API
 * [json-schema-faker](https://github.com/json-schema-faker/json-schema-faker) - massive fake data generator, JSON Schema-based

# usage

 * fetch git submodules: `git submodule init`, `git submodule update`
 * generate fake database - `npm run generate`
 * start fake REST API - `npm start`

By default, the API will listen on http://localhost:3000.

## git submodule

This repository requires to fetch [this git submodule](https://github.com/wealthy-laughing-duck/duck-raml) first ([learn how to fetch it](https://git-scm.com/book/en/v2/Git-Tools-Submodules)).
