import { KafkaClient, Producer, ProduceRequest } from 'kafka-node';

export async function POST(req: Request) {
	try {
		const { message }: { message: string } = await req.json();

		// สร้าง Kafka client และ Producer
		const client = new KafkaClient({ kafkaHost: 'localhost:9092' }); // ปรับ URL Kafka broker ของคุณ
		const producer = new Producer(client);

		const payloads: ProduceRequest[] = [
			{
				topic: 'my-topic',
				messages: message || 'Hello Kafka from Next.js API!',
			},
		];

		return new Promise((resolve, reject) => {
			producer.on('ready', () => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				producer.send(payloads, (err, data) => {
					if (err) {
						return reject(
							new Response('Failed to send message', { status: 500 })
						);
					}
					resolve(new Response('Message sent successfully', { status: 200 }));
				});
			});

			producer.on('error', (err) => {
				console.error('Producer error:', err);
				reject(new Response('Producer error', { status: 500 }));
			});
		});
	} catch (error) {
		console.error('Error in handler:', error);
		return new Response('Server error', { status: 500 });
	}
}
