import { rollbarServerInstance } from "./config";

export function rollbarError(message: string, error: Error | undefined, extraData: {} | undefined) {
  console.error(message, error, extraData);
  rollbarServerInstance.error(message, error);
}

export function rollbarWarning(message: string) {
  console.log(message);
  rollbarServerInstance.warning(message);
}

export function rollbarLog(message: string) {
  console.log(message);
  rollbarServerInstance.log(message);
}
