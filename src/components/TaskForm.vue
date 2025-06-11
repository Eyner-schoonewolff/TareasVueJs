<template>
  <div class="card mb-8 border-t-4 border-primary-500">
    <h2 class="text-xl font-bold text-primary-700 mb-4">{{ isEditing ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Título <span class="text-red-500">*</span></label>
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <input 
            id="title" 
            v-model="taskData.title" 
            type="text" 
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" 
            required
            placeholder="Ingresa el título de la tarea"
          />
        </div>
      </div>
      
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <textarea 
            id="description" 
            v-model="taskData.description" 
            rows="3" 
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" 
            placeholder="Descripción detallada de la tarea (opcional)"
          ></textarea>
        </div>
      </div>
      
      <div class="flex items-center">
        <input 
          id="completed" 
          v-model="taskData.completed" 
          type="checkbox"
          class="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label for="completed" class="ml-2 block text-sm text-gray-700">
          Marcar como completada
        </label>
      </div>
      
      <div class="flex justify-end space-x-3 pt-4">
        <button 
          type="button" 
          v-if="isEditing" 
          @click="cancelEdit" 
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="isEditing" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {{ isEditing ? 'Actualizar' : 'Crear' }} Tarea
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits, defineProps, watch } from 'vue';
import type { Task, TaskCreate } from '@/types/Task';

const props = defineProps<{
  editingTask?: Task | null;
}>();

const emit = defineEmits<{
  (e: 'submit', task: TaskCreate): void;
  (e: 'cancel'): void;
}>();

const isEditing = ref(false);
const taskData = reactive<TaskCreate>({
  title: '',
  description: '',
  completed: false
});

const resetForm = () => {
  taskData.title = '';
  taskData.description = '';
  taskData.completed = false;
  isEditing.value = false;
};

watch(() => props.editingTask, (newValue) => {
  if (newValue) {
    taskData.title = newValue.title;
    taskData.description = newValue.description || '';
    taskData.completed = newValue.completed;
    isEditing.value = true;
  } else {
    resetForm();
  }
}, { immediate: true });

const handleSubmit = () => {
  emit('submit', { ...taskData });
  if (!isEditing.value) {
    resetForm();
  }
};

const cancelEdit = () => {
  resetForm();
  emit('cancel');
};
</script> 