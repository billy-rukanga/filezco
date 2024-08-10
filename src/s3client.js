import { S3Client } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  endpoint: 'https://fra1.digitaloceanspaces.com',
  forcePathStyle: false,
  region: 'fra1',
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
  }
})

export default s3Client
