import { NextResponse, type NextRequest } from 'next/server';
import { TenantMiddleware } from './tenantmiddleware';
import { middleware as i18nMiddleware } from '@/lib/i18n';
// import { menuItems } from './lib/util/menuItems';

// const ROUTES = {
// 	PUBLIC: ['/', '/sign-in'],
// 	ADMIN: ['/admin'],
// 	PROTECTED: menuItems.flatMap((item) => [
// 		item.path,
// 		...item.subItems.map((subItem) => subItem.path), // path ใน subItems
// 	]),
// } as const;

// Rate limiting setup
const RATE_LIMIT_WINDOW = 1000; // 1 second
const requestTimes: { [key: string]: number[] } = {};

// Function to check rate limit
const isRateLimited = (identifier: string): boolean => {
	const now = Date.now();
	const windowStart = now - RATE_LIMIT_WINDOW;
	
	// Clean old requests
	requestTimes[identifier] = (requestTimes[identifier] || [])
		.filter(time => time > windowStart);
		
	// Add current request
	requestTimes[identifier].push(now);
	
	// Allow only 1 request per window
	return requestTimes[identifier].length > 1;
};

// Function to send logs to Kafka
const sendLogToKafka = async (logMessage: string, request: NextRequest) => {
	try {
		const identifier = `${request.method}-${request.nextUrl.pathname}`;
		
		// Skip if rate limited
		if (isRateLimited(identifier)) {
			return;
		}

		const protocol = request.headers.get('x-forwarded-proto') || 'http';
		const host = request.headers.get('host') || 'localhost:3500';
		const baseUrl = `${protocol}://${host}`;

		// Additional paths to skip logging
		const skipPaths = [
			'/_next',
			'/favicon.ico',
			'/static',
			'/images',
			'/assets',
			'/api/produce' // Skip logging API calls to prevent infinite loop
		];

		if (skipPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
			return;
		}

		const response = await fetch(`${baseUrl}/api/produce`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message: logMessage }),
		});

		if (!response.ok) {
			console.error('Failed to send log to Kafka:', await response.text());
		}
	} catch (error) {
		console.error('Error sending log to Kafka:', error);
	}
};

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
  
	// Format timestamp
	const now = new Date().toLocaleString('th-TH', {
	  timeZone: 'Asia/Bangkok',
	  hour: '2-digit',
	  minute: '2-digit',
	  second: '2-digit',
	  day: '2-digit',
	  month: '2-digit',
	  year: 'numeric'
	});
  
	// Skip middleware for static files and API routes
	if (pathname.match(/(\..*|_next|api|trpc)/)) {
	  await sendLogToKafka(`[${now}] Skipping middleware for: ${pathname}`, request);
	  return NextResponse.next();
	}
  
	try {
	  // Clone request for body reading
	  const requestClone = request.clone();
	  let body = '';
	  
	  if (request.body) {
		try {
		  const text = await requestClone.text();
		  if (text) {
			body = JSON.parse(text);
		  }
		} catch {
		  // Ignore body parse errors
		}
	  }
  
	  const lang = i18nMiddleware.detectLanguage(request);
	  const response = i18nMiddleware.getResponse(request, lang);
  
	  const tenantResponse = TenantMiddleware(request);
	  const tenantId = tenantResponse.headers.get('x-tenant-id') || 'main';
  
	  // Prepare log message
	  const importantHeaders = ['content-type', 'user-agent', 'accept-language'];
	  const headers = Object.fromEntries(
		Array.from(request.headers.entries())
		  .filter(([key]) => importantHeaders.includes(key.toLowerCase()))
	  );
  
	  const logData = {
		timestamp: now,
		method: request.method,
		path: `${pathname}${request.nextUrl.search}`,
		language: lang,
		tenantId: tenantId,
		headers: headers,
		body: body || undefined
	  };
  
	  // Send log to Kafka with request object
	  await sendLogToKafka(JSON.stringify(logData), request);
  
	  // Combine headers
	  const finalResponse = NextResponse.next();
	  const responseHeaders = new Headers(response.headers);
	  responseHeaders.set('x-tenant-id', tenantId);
  
	  responseHeaders.forEach((value, key) => {
		finalResponse.headers.set(key, value);
	  });
  
	  return finalResponse;
	} catch (error) {
	  // Log error
	  const errorLog = {
		timestamp: now,
		type: 'ERROR',
		path: pathname,
		error: error instanceof Error ? error.message : 'Unknown error'
	  };
	  
	  await sendLogToKafka(JSON.stringify(errorLog), request);
	  return NextResponse.next();
	}
  }


// export async function middleware(request: NextRequest) {
// 	const { pathname } = request.nextUrl;

// 	// Skip middleware for static files and API routes
// 	if (pathname.match(/(\..*|_next|api|trpc)/)) {
// 		return NextResponse.next();
// 	}

// 	try {
// 		const lang = i18nMiddleware.detectLanguage(request);
// 		const response = i18nMiddleware.getResponse(request, lang);

// 		const tenantResponse = TenantMiddleware(request);
// 		const tenantId = tenantResponse.headers.get('x-tenant-id') || 'main';

// 		// Combine headers
// 		const finalResponse = NextResponse.next();
// 		const headers = new Headers(response.headers);
// 		headers.set('x-tenant-id', tenantId);

// 		headers.forEach((value, key) => {
// 			finalResponse.headers.set(key, value);
// 		});

// 		return finalResponse;
// 	} catch (error) {
// 		console.error('Middleware error:', error);
// 		return NextResponse.next();
// 	}
// }
