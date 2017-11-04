#!/usr/bin/env node

const { spawnSync, execSync } = require('child_process')

if (!process.argv[2]) {
  console.error('\x1b[31m%s\x1b[0m', 'Directory name required:\n$ lets-react [directory-name]')
  process.exit(1)
}

let step = 0
const config = {
  directoryName: process.argv[2]
}

const { status } = spawnSync('test', ['-d', config.directoryName])
if (status === 0) {
  console.error('\x1b[31m%s\x1b[0m', 'Directory already exists')
  process.exit(1)
}

const readline = () => new Promise((resolve) => {
  process.stdin.on('data', (e) => {
    const text = e.toString('ascii').trim()
    switch (step) {
      case 1:
        config.redux = text === 'y' ? true : false
        resolve()
        break
      case 2:
        config.reactRouter = text === 'y' ? true : false
        resolve()
        break
      default:
        resolve()
        break
    }
  })
})

async function run () {
  console.log('\x1b[36m%s\x1b[0m', 'Do you want to use Redux? [y/n]')
  step = 1
  await readline()

  console.log('\x1b[36m%s\x1b[0m', 'Do you want to use React-Router? [y/n]')
  step = 2
  await readline()

  console.log(config)
  process.stdin.destroy()

  execSync(`cp -rf template ${config.directoryName}`)
  console.log('\x1b[32m%s\x1b[0m', 'Success')
}

run()
