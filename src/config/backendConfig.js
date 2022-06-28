import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";

export let backendConfig = () => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: process.env.CONNECTION_URI,
      apiKey: process.env.API_KEY
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        providers: [
          ThirdPartyEmailPasswordNode.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
          ThirdPartyEmailPasswordNode.Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
          })
        ]
      }),
      SessionNode.init()
    ],
    isInServerlessEnv: true
  };
};