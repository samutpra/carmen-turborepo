import React from 'react';
import PoForm from '../components/PoForm';
import { formType } from '@/types/form_type';

const NewPoPage = () => {
	return <PoForm mode={formType.ADD} />;
};

export default NewPoPage;
