import React from 'react';
import { useTranslation } from 'react-i18next';

function User() {
  const { t } = useTranslation();

  return (
    <div className="h-screen p-8 dark:text-gray-100 dark:bg-slate-900">
      {t('userPage.title')}
    </div>
  );
}

export default User;
