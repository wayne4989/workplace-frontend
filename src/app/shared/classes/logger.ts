export class Logger {
  public static errorCall = console.error;
  public static debugCall = console.log;
  public static infoCall = console.log;

  public static testDebug (...args: string[]): Promise<void> {
    let caller = (new Error()).stack.split('\n')[2]
      .replace(/^.* ([^ ]*) .*$/, '$1');

    Logger.debugCall(args, caller === 'at' ? '' : '> ' + caller );
    return Promise.resolve();
  }

  public static info (...args: string[]): void {
    Logger.infoCall(args);
  }

  public static debug (...args: any[]): void {
    const now = new Date();
    const stack = (new Error()).stack.split('\n');
    Logger.debugCall(
      (new Date()).getTime(),
      args.join(' :: '),
      stack[2],
      args,
    );
  }

  public static error (error: Error): void {
    Logger.errorCall(error);
  }
}
