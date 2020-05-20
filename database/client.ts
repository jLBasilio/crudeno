import { Client } from 'https://deno.land/x/postgres/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const env = config();
const client = new Client(env.PG_CONNECTION_STRING);  

export default client;
