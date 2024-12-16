'use client';

import React, { memo } from 'react';
import MenuDialog from './MenuDialog';
import LanguageSwitcher from './LanguageSwitcher';
import { SwitchTheme } from './SwitchTheme';
import { TenantList } from './TenantList';

const MenuContent = () => {
	return (
		<>
			<MenuDialog />
			<TenantList />
			<LanguageSwitcher />
			<SwitchTheme />
		</>
	);
};

export default memo(MenuContent);
