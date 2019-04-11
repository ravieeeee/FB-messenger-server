const express = require('express')
const app = express()
const port = 3000
const exec = require('child_process').exec

app.post('/sendMessage', (req, res) => {
  const message = req.query.content
  const recipient = req.query.recipient
  if (!message || !recipient) return

  const command = `npx messer --command=\'m "${recipient}" ${message}\'`
  console.log(command)

  exec(command, (error, stdout, stderr) => {
    if (!!stdout) { console.log('stdout : %s', stdout) }
    if (!!stderr) { console.log('stderr : %s', stderr) }
    if (!!error) { console.log('error : %s', error) }
    console.log('send!')
  });
  res.end()
})

app.listen(port, () => console.log(`listening on port ${port}!`))
