import { config } from './validate.config';

const APP_PORT = config.get<string>('APP_PORT') ?? 1722;
const DATABASE_URL = config.get<string>('DATABASE_URL') ?? '';
const JWT_SECRET_KEY = config.get<string>('JWT_SECRET_KEY') ?? '';

export { APP_PORT, DATABASE_URL, JWT_SECRET_KEY };
