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


export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
  
	// Log timestamp และ request info
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
	  console.log(`[${now}] Skipping middleware for: ${pathname}`);
	  return NextResponse.next();
	}
  
	try {
	  // Clone request เพื่ออ่าน body
	  const requestClone = request.clone();
	  let body = '';
	  
	  if (request.body) {
		try {
		  const text = await requestClone.text();
		  if (text) {
			body = JSON.parse(text);
		  }
		} catch {
		  // ถ้า parse JSON ไม่ได้ ไม่ต้องแสดง body
		}
	  }
  
	  const lang = i18nMiddleware.detectLanguage(request);
	  const response = i18nMiddleware.getResponse(request, lang);
  
	  const tenantResponse = TenantMiddleware(request);
	  const tenantId = tenantResponse.headers.get('x-tenant-id') || 'main';
  
	  // Log request details
	  console.log(`[${now}] ${request.method} ${pathname}${request.nextUrl.search}`);
	  console.log(`Language: ${lang}`);
	  console.log(`Tenant ID: ${tenantId}`);
	  
	  if (body) {
		console.log('Request Body:', body);
	  }
	  
	  // Log headers ที่สำคัญ
	  const importantHeaders = ['content-type', 'user-agent', 'accept-language'];
	  const headers = Object.fromEntries(
		Array.from(request.headers.entries())
		  .filter(([key]) => importantHeaders.includes(key.toLowerCase()))
	  );
	  console.log('Important Headers:', headers);
  
	  // Combine headers
	  const finalResponse = NextResponse.next();
	  const responseHeaders = new Headers(response.headers);
	  responseHeaders.set('x-tenant-id', tenantId);
  
	  responseHeaders.forEach((value, key) => {
		finalResponse.headers.set(key, value);
	  });
  
	  return finalResponse;
	} catch (error) {
	  console.error(`[${now}] Middleware error:`, error);
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
