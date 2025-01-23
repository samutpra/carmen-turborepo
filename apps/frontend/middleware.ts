import { NextResponse, type NextRequest } from 'next/server';
import { TenantMiddleware } from './tenantmiddleware';
import { middleware as i18nMiddleware } from '@/lib/i18n';
import { menuItems } from './lib/util/menuItems';

const ROUTES = {
	PUBLIC: ['/', '/sign-in'],
	ADMIN: ['/admin'],
	PROTECTED: menuItems.flatMap((item) => [
		item.path, // path หลัก
		...item.subItems.map((subItem) => subItem.path), // path ใน subItems
	]),
} as const;

console.log('ROUTES.PROTECTED', ROUTES.PROTECTED);

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip middleware for static files and API routes
	if (pathname.match(/(\..*|_next|api|trpc)/)) {
		return NextResponse.next();
	}

	try {
		// 1. Handle i18n
		const lang = i18nMiddleware.detectLanguage(request);
		const response = i18nMiddleware.getResponse(request, lang);

		// 2. Handle authentication
		const accessToken = request.cookies.get('access_token')?.value;
		const isAuthenticated = !!accessToken;

		// Only redirect if trying to access protected routes without auth
		if (
			!isAuthenticated &&
			ROUTES.PROTECTED.some((route) => pathname.startsWith(route))
		) {
			const url = new URL('/sign-in', request.url);
			url.searchParams.set('from', pathname);
			return NextResponse.redirect(url);
		}

		// Don't redirect authenticated users from public routes unless it's the login page
		if (isAuthenticated && pathname === '/sign-in') {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}

		// 3. Handle tenant
		const tenantResponse = TenantMiddleware(request);
		const tenantId = tenantResponse.headers.get('x-tenant-id') || 'main';

		// Combine headers
		const finalResponse = NextResponse.next();
		const headers = new Headers(response.headers);
		headers.set('x-tenant-id', tenantId);

		headers.forEach((value, key) => {
			finalResponse.headers.set(key, value);
		});

		return finalResponse;
	} catch (error) {
		console.error('Middleware error:', error);
		return NextResponse.next();
	}
}
