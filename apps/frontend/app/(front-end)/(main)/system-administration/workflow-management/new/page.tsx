'use client';
import React, { useState } from 'react';
//import WorkflowForm from './components/WorkflowForm';
import WorkflowDetail from '../components/WorkflowDetail';
import { formType } from '@/constants/enums';

const NewWorkflowPage = () => {
	const [isRefresh, setRefresh] = useState(false);

	return (
		<WorkflowDetail
			wfData={null}
			mode={formType.ADD}
			isRefresh={isRefresh}
			setRefresh={setRefresh}
		/>
	);
};

export default NewWorkflowPage;
