<template>
  <div class="bg-white rounded-lg shadow-md group hover:shadow-lg transition-all duration-300 relative overflow-hidden border border-gray-100">
    <div
      :class="[
        'absolute top-0 left-0 h-full w-1.5',
        task.completed ? 'bg-gradient-to-b from-green-400 to-green-600' : 'bg-gradient-to-b from-yellow-400 to-yellow-600'
      ]"
    ></div>
    <div class="p-5 pl-6">
      <div class="flex items-start justify-between">
        <div class="flex-grow pr-4">
          <h3 
            :class="[
              'text-lg font-bold mb-2 transition-all duration-200',
              task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
            ]"
          >
            {{ task.title }}
          </h3>
          <p 
            v-if="task.description" 
            :class="[
              'text-sm mb-3 transition-all duration-200',
              task.completed ? 'text-gray-400' : 'text-gray-600'
            ]"
          >
            {{ task.description }}
          </p>
          <div class="flex items-center text-xs text-gray-500 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(task.createdAt) }}
          </div>
        </div>
        <div class="flex space-x-2">
          <button 
            @click="editTask"
            class="btn p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            title="Editar tarea"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            @click="toggleComplete"
            :class="[
              'btn p-2 rounded-md transition-colors',
              task.completed ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-green-500 hover:bg-green-600 text-white'
            ]"
            :title="task.completed ? 'Marcar como pendiente' : 'Marcar como completada'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="task.completed" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <button 
            @click="deleteTask"
            class="btn p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
            title="Eliminar tarea"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Task } from '@/types/Task';

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: 'toggle-complete', id: string): void;
  (e: 'delete', id: string): void;
  (e: 'edit', task: Task): void;
}>();

const toggleComplete = () => {
  emit('toggle-complete', props.task._id);
};

const deleteTask = () => {
  emit('delete', props.task._id);
};

const editTask = () => {
  emit('edit', props.task);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
</script> 