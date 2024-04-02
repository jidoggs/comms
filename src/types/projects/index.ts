export type Task = {
  title: string;
  status: string;
};

export type Assignee = {
  id: number;
  image_url: string;
  last_name: string;
  first_name: string;
};

export type Project = {
  id: number;
  title: string;
  status: string;
  due_date: Date;
  tasks: Task[];
  assignees: Assignee[];
};
