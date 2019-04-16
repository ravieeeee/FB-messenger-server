const express = require('express')
const app = express()
const port = 3000
const exec = require('child_process').exec
const ip = require('ip')

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

app.listen(port, () => console.log(`http://${ip.address()}:${port}`))
