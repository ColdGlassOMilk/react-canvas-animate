const fs = require('fs')

// Determine the environment
const isDevelopment = process.env.NODE_ENV === 'development'

// Update package.json fields
const packageJsonPath = './package.json'
const packageJson = require(packageJsonPath)

packageJson.main = isDevelopment
  ? './dist/cjs/index.js'
  : './dist/bundle.cjs.js'
packageJson.module = isDevelopment
  ? './dist/esm/index.js'
  : './dist/bundle.esm.js'

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
