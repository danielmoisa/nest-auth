import { ConfigFactory } from "@nestjs/config";

const configuration = {
    frontendUrl: process.env.FRONTEND_URL ?? "http://localshot:3000",
    security: {
        jwtSecret: process.env.JWT_SECRET,
    }
}

const configFunction: ConfigFactory = () => configuration;
export default configFunction;