'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WorkflowHeader from './WorkflowHeader';
import WorkflowGeneral from './WorkflowGeneral';
import WorkflowStages from './WorkflowStages';
import WorkflowRouting from './WorkflowRouting';
import WorkflowProducts from './WorkflowProducts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Workflow } from '../types/workflow';

interface WorkflowDetailProps {
	wfId: string | undefined;
	wfData: Workflow | undefined;
}

const WorkflowDetail: React.FC<WorkflowDetailProps> = ({ wfId, wfData }) => {
	const [isEditing, setIsEditing] = useState(false);

	if (!wfData) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					Workflow not found. Please check the provided workflow ID: {wfId}
				</AlertDescription>
			</Alert>
		);
	}

	const handleEditToggle = () => {
		setIsEditing(!isEditing);
	};

	const handleSave = (updatedWorkflow: Workflow) => {
		console.log(updatedWorkflow);

		//setWorkflow(updatedWorkflow);
		setIsEditing(false);
	};

	const stageNames = wfData.data.stages.map((stage) => stage.name);

	return (
		<div className="container mx-auto py-6">
			<Button variant="ghost" asChild className="mb-4">
				<Link href="/system-administration/workflow-management">
					<ArrowLeft className="mr-2 h-4 w-4" /> Back to Workflows
				</Link>
			</Button>
			<WorkflowHeader
				workflow={wfData}
				isEditing={isEditing}
				onEditToggle={handleEditToggle}
				onSave={handleSave}
			/>
			<Tabs defaultValue="general">
				<TabsList className="mt-2">
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="stages">Stages</TabsTrigger>
					<TabsTrigger value="routing">Routing</TabsTrigger>
					<TabsTrigger value="products">Products</TabsTrigger>
				</TabsList>
				<TabsContent value="general">
					<WorkflowGeneral
						workflow={wfData}
						isEditing={isEditing}
						onSave={(updatedWorkflow: Workflow) =>
							handleSave({ ...wfData, ...updatedWorkflow })
						}
					/>
				</TabsContent>
				<TabsContent value="stages">
					<WorkflowStages
						stages={wfData.data.stages}
						isEditing={isEditing}
						onSave={(stages) =>
							handleSave({ ...wfData, data: { ...wfData.data, stages } })
						}
					/>
				</TabsContent>
				<TabsContent value="routing">
					<WorkflowRouting
						rules={wfData.data.routing_rules || []}
						stages={stageNames}
						isEditing={isEditing}
						onSave={(routing_rules) =>
							handleSave({
								...wfData,
								data: { ...wfData.data, routing_rules },
							})
						}
					/>
				</TabsContent>
				<TabsContent value="products">
					<WorkflowProducts
						products={wfData.data.products || []}
						isEditing={isEditing}
						onSave={(products) =>
							handleSave({ ...wfData, data: { ...wfData.data, products } })
						}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default WorkflowDetail;
