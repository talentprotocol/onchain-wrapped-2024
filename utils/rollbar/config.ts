import Rollbar from "rollbar";

const baseConfig = {
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV
};

export const rollbarServerInstance = new Rollbar({
  accessToken: process.env.NEXT_ROLLBAR_SERVER_TOKEN!,
  ...baseConfig
});
