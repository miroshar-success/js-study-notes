# Validation

To automatically validate incoming requests, Nest provides serval pipes available right out-of-the-box:

1. ValidationPipe
2. ParseIntPipe
3. ParseBoolPipe
4. ParseArrayPipe
5. ParseUUIDPipe

## Auto-validation

```ts
// main.ts
// (We will binding ValidationPipe at the application level) 确保所有请求参数以正确格式传递
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
}
```
