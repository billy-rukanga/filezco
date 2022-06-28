const { curly } = require('node-libcurl')

export default async function handler (req, res) {
  try {
    const { data } = await curly.post(process.env.CREATE_OBJECT_URL, {
      postFields: JSON.stringify({
        method: 'GET',
        name: req.body.name
      }),
      httpHeader: [
        'Content-Type: application/json',
        `Authorization: Bearer ${process.env.LINODE_TOKEN}`
      ]
    })
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
}
