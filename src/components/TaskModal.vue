<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Backdrop oscurecido con animación -->
    <div 
      class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300" 
      :class="[isVisible ? 'opacity-100' : 'opacity-0']"
      @click="closeModal"
    ></div>
    
    <!-- Modal con animación -->
    <div 
      class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all duration-300 z-10 overflow-hidden"
      :class="[isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0']"
    >
      <!-- Cabecera -->
      <div class="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-4 flex justify-between items-center">
        <h3 class="text-xl font-bold text-white">Editar Tarea</h3>
        <button 
          @click="closeModal" 
          class="text-white hover:text-gray-200 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Contenido -->
      <div class="p-6">
        <form @submit.prevent="saveTask" class="space-y-4">
          <div>
            <label for="modal-title" class="block text-sm font-medium text-gray-700 mb-1">
              Título <span class="text-red-500">*</span>
            </label>
            <input 
              id="modal-title" 
              v-model="formData.title" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
              required
              placeholder="Ingresa el título de la tarea"
            />
          </div>
          
          <div>
            <label for="modal-description" class="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea 
              id="modal-description" 
              v-model="formData.description" 
              rows="4" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
              placeholder="Descripción (opcional)"
            ></textarea>
          </div>
          
          <div class="flex items-center">
            <input 
              id="modal-completed" 
              v-model="formData.completed" 
              type="checkbox"
              class="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label for="modal-completed" class="ml-2 block text-sm text-gray-700">
              Marcar como completada
            </label>
          </div>
        
          <!-- Botones -->
          <div class="flex justify-end pt-4 space-x-3">
            <button 
              type="button" 
              @click="closeModal" 
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import type { Task, TaskUpdate } from '@/types/Task';

const props = defineProps<{
  task: Task | null;
  isVisible: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', id: string, data: TaskUpdate): void;
}>();

const formData = ref<TaskUpdate>({
  title: '',
  description: '',
  completed: false
});

// Actualizar el formulario cuando cambia la tarea
watch(() => props.task, (newTask) => {
  if (newTask) {
    formData.value = {
      title: newTask.title,
      description: newTask.description || '',
      completed: newTask.completed
    };
  }
}, { immediate: true });

// Cerrar el modal
const closeModal = () => {
  emit('close');
};

// Guardar los cambios
const saveTask = () => {
  if (props.task) {
    emit('save', props.task._id, formData.value);
  }
};
</script> 