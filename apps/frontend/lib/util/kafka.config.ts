const KAFKA_CONFIG = {
	// host: process.env.KAFKA_HOST || 'localhost:9092',
	// topic: process.env.KAFKA_TOPIC || 'my-topic',
	host: 'localhost:9092',
	topic: 'my-topic',
	timeout: 30000, // 30 seconds timeout
	partition: 0,
} as const;

export default KAFKA_CONFIG;
