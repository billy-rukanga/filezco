import formData from 'form-data'
import Mailgun from 'mailgun.js'

export default async function handler (req, res) {
  const API_KEY = process.env.EMAIL_API_KEY
  const DOMAIN = 'filezco.com'

  const mailgun = new Mailgun(formData)
  const client = mailgun.client({ username: 'api', key: API_KEY })

  const messageData = {
    from: 'email@filezco.com',
    to: req.body.from,
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
  }

  client.messages
    .create(DOMAIN, messageData)
    .then(response => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
}
