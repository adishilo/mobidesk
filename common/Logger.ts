import debug from "debug";

export default class Logger {
    private logger: debug.Debugger;

    public constructor(private loggerName: string) {
        this.logger = debug(loggerName);
    }

    public info(message: string) {
        this.log(`INFO ${message}`);
    }

    public warn(message: string) {
        this.log(`WARNING ${message}`);
    }

    public error(message: string) {
        this.log(`ERROR ${message}`);
    }

    public fatal(message: string) {
        this.log(`FATAL ${message}`);
    }

    private log(logMessage: string) {
        this.logger(logMessage);
    }
}