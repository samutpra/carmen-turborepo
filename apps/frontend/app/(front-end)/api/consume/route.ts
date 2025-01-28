import { KafkaClient, Consumer } from 'kafka-node';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
	try {
		console.log('Consuming message');
		// สร้าง Kafka client และ Consumer
		const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
		const consumer = new Consumer(
			client,
			[{ topic: 'my-topic', partition: 0 }],
			{ autoCommit: true }
		);

		return new Promise((resolve, reject) => {
			consumer.on('message', (message) => {
				console.log('Received message:', message);
				resolve(
					new Response(
						JSON.stringify({
							message: 'Received message from Kafka',
							data: message,
						}),
						{ status: 200 }
					)
				);
			});

			consumer.on('error', (err) => {
				console.error('Consumer error:', err);
				reject(new Response('Error consuming message', { status: 500 }));
			});
		});
	} catch (error) {
		console.error('Error in handler:', error);
		return new Response('Server error', { status: 500 });
	}
}
