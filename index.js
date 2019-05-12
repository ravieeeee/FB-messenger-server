const express = require('express')
const app = express()
const port = 3000
const exec = require('child_process').exec
const ip = require('ip')
const path = require('path')
const Messen = require('messen')
const fs = require('fs')

app.post('/login', (req, res) => {
  const MESSY_PATH = path.resolve(process.env.HOME, '.messen')
  const APPSTATE_FILE_PATH = path.resolve(MESSY_PATH, 'tmp/appstate.json')
  console.log('APPSTATE_FILE_PATH', APPSTATE_FILE_PATH)

  fs.readFile(APPSTATE_FILE_PATH, (err, rawAppState) => {
    if (err) {
      console.log('try login')
      const messen = new Messen()
      messen.login({
        email: req.query.email,
        password: req.query.password
      }).then(() => {
        console.log('login finish')
        res.send('login finish')
      }).catch((err) => {
        console.log(err)
      })
    } else {
      console.log('already login')
      res.send('already login')
    }
  })
})

app.post('/sendMessage', (req, res) => {
  const content = req.query.content
  const recipient = req.query.recipient
  if (!content || !recipient) return

  const command = `npx messer --command=\'m "${recipient}" ${content}\'`
  console.log(command)

  exec(command, (error, stdout, stderr) => {
    if (!!stdout) { console.log('stdout : ', stdout) }
    if (!!stderr) { console.log('stderr : ', stderr) }
    if (!!error) { console.log('error : ', error) }
    res.send(
      {
        content,
        recipient
      }
    )
  })
})

app.get('/fetchMessages', (req, res) => {
  const target = req.query.target
  if (!target) return

  const command = `npx messer --command=\'h "${target}" 10\'`
  console.log(command)

  exec(command, (error, stdout, stderr) => {
    if (!!stdout) { console.log('stdout : ', stdout) }
    if (!!stderr) { console.log('stderr : ', stderr) }
    if (!!error) { console.log('error : ', error) }
    res.send('done')
  })
})

app.listen(port, () => console.log(`http://${ip.address()}:${port}`))
