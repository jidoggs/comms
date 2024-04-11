import { FormItems, ProjectData } from './types';

export const createProjectFormInputs: FormItems<ProjectData>[] = [
  {
    name: 'name',
    label: 'Name of Project',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Name of Project is required' }],
  },
  {
    name: 'details',
    label: 'Details',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Details is required' }],
  },
  {
    name: 'file',
    label: '',
    placeholder: '',
    rules: [{ required: true, message: 'Filelist is required' }],
  },
];
export const projectStatus: FormItems<{ status: string }>[] = [
  {
    name: 'status',
    label: 'Define the progress statuses for this project',
    placeholder: '',
    rules: [{ required: true, message: 'Project Status is required' }],
  },
];
