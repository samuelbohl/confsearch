import clc from "cli-color";

class Logger {
  public static info(prefix = "INFO", message: string) {
    console.log(`[${clc.cyan(prefix)}] ${message}`);
  }

  public static error(prefix  = "ERROR", message: string) {
    console.log(`[${clc.red(prefix)}] ${message}`);
  }

  public static success(prefix = "SUCCESS", message: string) {
    console.log(`[${clc.green(prefix)}] ${message}`);
  }
}

export { Logger };
