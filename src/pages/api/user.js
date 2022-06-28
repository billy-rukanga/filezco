import supertokens from 'supertokens-node'
import { backendConfig } from '../../config/backendConfig'
import { verifySession } from 'supertokens-node/recipe/session/framework/express'
import { superTokensNextWrapper } from 'supertokens-node/nextjs'

supertokens.init(backendConfig())

export default async function user (req, res) {
  await superTokensNextWrapper(
    async next => {
      return await verifySession()(req, res, next)
    },
    req,
    res
  )
  // if it comes here, it means that the session verification was successful

  return res.json({
    userId: req.session.getUserId(),
    sessionHandle: req.session.getHandle(),
    userDataInAccessToken: req.session.getAccessTokenPayload()
  })
}
