'use client';
import { redirect } from 'next/navigation';

const Onboarding = () => {
  return redirect('/onboarding/personal-info');
};

export default Onboarding;
