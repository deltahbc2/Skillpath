import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://lucky-lion-98.clerk.accounts.dev",
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;