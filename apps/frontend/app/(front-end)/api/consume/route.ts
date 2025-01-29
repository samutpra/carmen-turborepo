import { KafkaClient, Consumer, Message } from 'kafka-node';
import { NextRequest, NextResponse } from 'next/server';
import KAFKA_CONFIG from '@/lib/util/kafka.config';
interface TransformedMessage {
	topic: string;
	value: string;
	offset: number;
	partition: number;
}

// Singleton instances
let consumer: Consumer | null = null;
let client: KafkaClient | null = null;

// Initialize Kafka client and consumer
const initializeKafka = (): Consumer | null => {
	if (!client || !consumer) {
		client = new KafkaClient({ kafkaHost: KAFKA_CONFIG.host });
		consumer = new Consumer(
			client,
			[{ topic: KAFKA_CONFIG.topic, partition: KAFKA_CONFIG.partition }],
			{ autoCommit: true }
		);

		consumer.on('error', (error: Error) => {
			console.error('Kafka consumer error:', error);
		});

		// Graceful shutdown
		process.on('SIGTERM', () => {
			if (consumer) {
				consumer.close(() => {
					console.log('Kafka consumer closed due to application termination');
					process.exit(0);
				});
			}
		});
	}
	return consumer;
};

// Transform Kafka message to our format
const transformMessage = (message: Message): TransformedMessage => ({
	topic: message.topic,
	value: message.value.toString(),
	offset: message.offset || 0,
	partition: message.partition || 0,
});

export const GET = async (req: NextRequest) => {
	try {
		console.log('Incoming request:', req.url);

		const consumer = initializeKafka();
		if (!consumer) {
			throw new Error('Failed to initialize Kafka consumer');
		}

		const message = await new Promise<TransformedMessage>((resolve, reject) => {
			const timeoutId = setTimeout(() => {
				reject(new Error('Kafka consumer timeout'));
			}, KAFKA_CONFIG.timeout);

			const handleMessage = (message: Message) => {
				clearTimeout(timeoutId);
				consumer.removeListener('message', handleMessage);
				resolve(transformMessage(message));
			};

			const handleError = (error: Error) => {
				clearTimeout(timeoutId);
				consumer.removeListener('error', handleError);
				reject(error);
			};

			consumer.on('message', handleMessage);
			consumer.on('error', handleError);
		});

		return NextResponse.json(
			{
				data: message,
				status: 'success',
			},
			{
				status: 200,
				headers: {
					'Cache-Control': 'no-store',
					'Content-Type': 'application/json',
				},
			}
		);
	} catch (error) {
		console.error('Error in Kafka consumer handler:', error);

		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		const statusCode = errorMessage.includes('timeout') ? 504 : 500;

		return NextResponse.json(
			{
				error: errorMessage,
				status: 'error',
			},
			{
				status: statusCode,
				headers: {
					'Cache-Control': 'no-store',
					'Content-Type': 'application/json',
				},
			}
		);
	}
};
