import { Rule } from 'antd/es/form';
import React from 'react';

export interface CorrespondenceData {
  sent_by: string;
  recipient: string;
  subject: string;
  ref_no: string;
  document: string;
  comment: string;
  created_at: string;
}

export type FormItems<T = { name: string }> = {
  name: keyof T;
  label: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
  rules?: Rule[];
  dependencies?: any[];
};
