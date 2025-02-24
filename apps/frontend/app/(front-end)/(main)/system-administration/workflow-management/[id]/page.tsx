'use client';
import { fetchWorkflow } from '../actions/workflow';
import WorkflowDetail from '../components/WorkflowDetail';
import { Workflow } from '../types/workflow';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

const WorkflowDetailPage = ({ params }: { params: { id: string } }) => {
	const { accessToken } = useAuth();
	const token = accessToken || '';
	const [wf, setWf] = useState<Workflow>();
	const fetchById = async () => {
		try {
			const data = await fetchWorkflow(token, params.id);
			setWf(data);
		} catch (err) {
			console.error('Failed to fetch data:', err);
		}
	};

	useEffect(() => {
		fetchById();
	}, [token]);

	// eslint-disable-next-line react/react-in-jsx-scope
	return <WorkflowDetail wfId={wf?.id.toString()} wfData={wf} />;
};

export default WorkflowDetailPage;
