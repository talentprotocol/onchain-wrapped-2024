import { rollbarServerInstance } from "./config";

export function rollbarError(message: string, error: Error) {
  rollbarServerInstance.error(message, error);
}

export function rollbarWarning(message: string) {
  rollbarServerInstance.warning(message);
}

export function rollbarLog(message: string) {
  rollbarServerInstance.log(message);
}
