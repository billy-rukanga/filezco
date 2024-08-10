import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import s3Client from '../../s3client'

export default async function handler (req, res) {
  const getObjectParams = {
    Bucket: process.env.SPACES_BUCKET,
    Key: req.body.name,
    ContentType: req.body.fileType
  }

  try {
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 24 * 60 * 60
    })
    res.status(200).json({ url })
  } catch (err) {
    console.log('Error', err)
    res.status(500).send(err)
  }
}
