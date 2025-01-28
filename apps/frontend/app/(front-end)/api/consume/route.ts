import { KafkaClient, Consumer } from 'kafka-node';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
	try {
		console.log('request', req);

		console.log('Consuming message');
		const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
		const consumer = new Consumer(
			client,
			[{ topic: 'my-topic', partition: 0 }],
			{ autoCommit: true }
		);

		const message = await new Promise((resolve, reject) => {
			consumer.on('message', (message) => {
				console.log('Received message:', message);
				resolve(message);
			});

			consumer.on('error', (err) => {
				console.error('Consumer error:', err);
				reject(err);
			});
		});

		// Close the consumer after receiving the message
		consumer.close(() => {
			console.log('Consumer closed');
		});

		// Return the message in the correct NextResponse format
		return NextResponse.json({ data: message }, { status: 200 });
	} catch (error) {
		console.error('Error in handler:', error);
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}

