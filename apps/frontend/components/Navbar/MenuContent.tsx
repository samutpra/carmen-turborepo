'use client';

import React, { memo } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { SwitchTheme } from './SwitchTheme';
import { TenantList } from './TenantList';

const MenuContent = () => {
	return (
		<>
			<TenantList />
			<div className="flex items-center">
				<LanguageSwitcher />
				<SwitchTheme />
			</div>
		</>
	);
};

export default memo(MenuContent);
