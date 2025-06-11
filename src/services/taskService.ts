import axios from 'axios';
import type { Task, TaskCreate, TaskUpdate } from '@/types/Task';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await apiClient.get('/tasks');
    return response.data;
  },

  async createTask(task: TaskCreate): Promise<Task> {
    const response = await apiClient.post('/tasks', task);
    return response.data;
  },

  async updateTask(id: string, task: TaskUpdate): Promise<Task> {
    const response = await apiClient.put(`/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  }
}; 