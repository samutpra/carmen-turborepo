'use client';

import ComingSoon from '@/components/ComingSoon';
import React from 'react';
import { useRouter } from '@/lib/i18n';

export default function FinancePage() {
	const router = useRouter();
	router.push('/dashboard');
	return null;
}
