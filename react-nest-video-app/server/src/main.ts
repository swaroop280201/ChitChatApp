import { NestFactory } from '@nestjs/core';
import { SocketAdapter } from './adapter/adapter';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors:
			{
				origin: '*',
				credentials: true,
				methods:
					[
						'GET',
						'POST'
					]
			}
	});
	app.useWebSocketAdapter(new SocketAdapter(app));
	await app.listen(5000);
}
bootstrap();
