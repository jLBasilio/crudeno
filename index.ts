import { Application } from 'https://deno.land/x/oak/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import router from './routes.ts';
import errorHandler from './handlers/error.ts';

const env = config({ safe: true });
const ADDR = env.ADDR || '127.0.0.1';
const PORT = env.PORT || 3000;
const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get('X-Response-Time');
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set('X-Response-Time', `${ms}ms`);
});

app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(({ response }) => {
  response.status = 400;
  response.body = 'Invalid directory';
});

await app.listen(`${ADDR}:${PORT}`);
