import chalk from 'chalk';

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.info(chalk.blueBright(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object));
    } else {
        console.info(chalk.blueBright(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`));
    }
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.warn(chalk.yellowBright(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object));
    } else {
        console.warn(chalk.yellowBright(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`));
    }
};

const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.error(chalk.redBright(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object));
    } else {
        console.error(chalk.redBright(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`));
    }
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.debug(chalk.greenBright(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object));
    } else {
        console.debug(chalk.greenBright(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`));
    }
};

const log = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.log(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
    } else {
        console.log(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
    }
};

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

export default {
    info,
    warn,
    error,
    debug,
    log
};
