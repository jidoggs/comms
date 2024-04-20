'use client';
import { redirect } from 'next/navigation';

const PublicHome = () => {
  return redirect('/auth/login');
};

export default PublicHome;
