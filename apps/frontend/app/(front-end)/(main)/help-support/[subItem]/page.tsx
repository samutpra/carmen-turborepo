import React from 'react'
import ComingSoon from '@/components/ComingSoon';

export default function catchPage({ params }: { params: { subItem: string } }) {
  const subItem = params.subItem;

  return <ComingSoon title={`${subItem.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`} />;
}