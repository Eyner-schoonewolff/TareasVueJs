<template>
  <div class="bg-white rounded-lg shadow-md border border-gray-100 p-5">
    <h3 class="text-gray-700 font-medium mb-3 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      Filtrar tareas
    </h3>
    <div class="flex flex-wrap gap-3">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        @click="() => selectFilter(filter.value)"
        :class="[
          'relative flex items-center px-4 py-2 rounded-md transition-all duration-200 font-medium text-sm',
          currentFilter === filter.value 
            ? 'bg-primary-600 text-white shadow-md hover:bg-primary-700' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        ]"
      >
        <span class="mr-2">
          <svg v-if="filter.value === 'all'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <svg v-if="filter.value === 'completed'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-if="filter.value === 'pending'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        {{ filter.label }}
        <div 
          v-if="filter.count !== undefined" 
          class="ml-2 flex items-center justify-center rounded-full h-5 min-w-[20px] px-1 text-xs font-bold"
          :class="currentFilter === filter.value ? 'bg-white text-primary-600' : 'bg-primary-500 text-white'"
        >
          {{ filter.count }}
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import type { Task, TaskStatus } from '@/types/Task';

const props = defineProps<{
  tasks: Task[];
  currentFilter: TaskStatus;
}>();

const emit = defineEmits<{
  (e: 'filter-change', status: TaskStatus): void;
}>();

const completedTasks = computed(() => props.tasks.filter(task => task.completed).length);
const pendingTasks = computed(() => props.tasks.filter(task => !task.completed).length);

const filters = computed(() => [
  { 
    label: 'Todas', 
    value: 'all', 
    count: props.tasks.length
  },
  { 
    label: 'Completadas', 
    value: 'completed', 
    count: completedTasks.value
  },
  { 
    label: 'Pendientes', 
    value: 'pending', 
    count: pendingTasks.value
  }
]);

const selectFilter = (status: TaskStatus) => {
  emit('filter-change', status);
};
</script> 