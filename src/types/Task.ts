export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'all' | 'completed' | 'pending';

export interface TaskCreate {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
} 