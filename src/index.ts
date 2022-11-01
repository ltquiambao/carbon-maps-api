import { server } from "./server";

const main = () => {
    return server.start();
}

main().catch(async (error) => {
    console.error('error caught in main()', error);
    process.exit(1);
});

process.on('SIGTERM', async (signal) => {
    console.error(`received a signal: [${signal}]. process exiting.`);
    process.exit(0);
});

process.on('SIGINT', async (signal) => {
    console.error(`received a signal: [${signal}]. process exiting.`);
    process.exit(0);
});

process.on('uncaughtException', async (error) => {
    console.error(`process exiting with uncaughtException: ${error.message}`, error);
    process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
    console.error(`process exiting with unhandledRejection ${promise} reason: ${reason}`);
    promise.catch((error) => console.error(error));
    process.exit(1);
});
