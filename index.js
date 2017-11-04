#!/usr/bin/env node

const { spawnSync } = require('child_process')

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

  process.stdin.destroy()

  const { directoryName, redux, reactRouter } = config
  spawnSync('cp', ['-rf', `${__dirname}/template`, config.directoryName])
  const dir = (
    (redux && reactRouter && `${__dirname}/redux-router`) ||
    (redux && `${__dirname}/redux`) ||
    (reactRouter && `${__dirname}/router`)
  )

  spawnSync('cp', ['-f', `${dir}/index.js`, `${config.directoryName}/app`])
  spawnSync('cp', ['-f', `${dir}/package.json`, config.directoryName])

  if (redux) {
    spawnSync('mkdir', [`${config.directoryName}/app/actions`])
    spawnSync('mkdir', [`${config.directoryName}/app/reducers`])
    spawnSync('cp', ['-f', `${dir}/actions.js`, `${config.directoryName}/app/actions/`])
    spawnSync('cp', ['-f', `${dir}/reducers.js`, `${config.directoryName}/app/reducers/`])
  }
}

run()
