'use client';
import React, { useEffect, useState } from 'react';
import { fetchWorkflow } from '../actions/workflow';
import WorkflowDetail from '../components/WorkflowDetail';
import { Workflow } from '../types/workflow';
import { useAuth } from '@/app/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const WorkflowDetailPage = ({ params }: { params: { id: string } }) => {
	const { accessToken, tenantId } = useAuth();
	const token = accessToken || '';
	const [wf, setWf] = useState<Workflow>();
	const [isLoading, setIsLoading] = useState(true);
	const fetchById = async () => {
		if (!params.id || !token) return;
		try {
			const data = await fetchWorkflow(token, tenantId, params.id);
			setWf(data);
			setIsLoading(false);
		} catch (err) {
			console.error('Failed to fetch data:', err);
		}
	};

	useEffect(() => {
		fetchById();
	}, [token]);

	if (isLoading) {
		return (
			<div className="m-4 space-y-4 mt-20">
				<Card>
					<Skeleton className="h-[125px] w-full rounded-xl" />
				</Card>
				<Card>
					<Skeleton className="h-[400px] w-full rounded-xl" />
				</Card>
			</div>
		);
	}

	if (!wf) {
		return null;
	}

	// eslint-disable-next-line react/react-in-jsx-scope
	return <WorkflowDetail wfData={wf} />;
};

export default WorkflowDetailPage;
