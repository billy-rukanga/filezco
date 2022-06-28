export default async function handler (req, res) {
  try {
    const response = await fetch(process.env.CREATE_OBJECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.LINODE_TOKEN}`
      },
      body: JSON.stringify({
        method: 'GET',
        name: req.body.name
      })
    })
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
}
