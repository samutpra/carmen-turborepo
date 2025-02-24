import { formType } from '@/types/form_type';
import React from 'react';
import PoForm from '../components/PoForm';

const PoIdPage = () => {
	return <PoForm mode={formType.EDIT} po="id somthing" />;
};

export default PoIdPage;
