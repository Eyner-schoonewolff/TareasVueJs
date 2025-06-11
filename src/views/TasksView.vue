<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <!-- Encabezado -->
    <div class="mb-10 text-center">
      <h1 class="text-4xl font-bold text-primary-800 mb-3 relative inline-block">
        Gestor de Tareas
        <span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full"></span>
      </h1>
      <p class="text-gray-600 text-lg">Organiza tus tareas de forma sencilla y eficiente</p>
    </div>

    <!-- Formulario de nueva tarea -->
 
      <div class="p-6">
        <TaskForm 
          :editing-task="null" 
          @submit="handleTaskSubmit" 
          @cancel="cancelEdit" 
        />
      </div>

    <!-- Indicador de carga -->
    <div v-if="isLoading" class="flex justify-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
    
    <div v-else>
      <!-- Filtros -->
      <TaskFilter 
        :tasks="tasks" 
        :current-filter="currentFilter" 
        @filter-change="changeFilter" 
        class="mb-8"
      />

      <!-- Estado vacío -->
      <div v-if="tasks.length === 0" class="bg-white rounded-lg shadow-md p-10 text-center">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600">No hay tareas disponibles</h3>
        <p class="text-gray-500 mt-2 mb-6">Crea una nueva tarea usando el formulario de arriba</p>
        <button 
          @click="scrollToForm" 
          class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          Crear mi primera tarea
        </button>
      </div>

      <!-- Sin tareas para el filtro actual -->
      <div v-else-if="filteredTasks.length === 0" class="bg-white rounded-lg shadow-md p-10 text-center">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600">No hay tareas con el filtro actual</h3>
        <p class="text-gray-500 mt-2">Cambia el filtro o crea nuevas tareas</p>
      </div>

      <!-- Lista de tareas -->
      <div v-else class="space-y-4">
        <transition-group name="task-list">
          <TaskItem 
            v-for="task in filteredTasks" 
            :key="task._id" 
            :task="task"
            @toggle-complete="toggleTaskComplete"
            @delete="confirmDeleteTask"
            @edit="openEditModal"
          />
        </transition-group>
      </div>
    </div>

    <!-- Modal de edición -->
    <TaskModal
      :task="selectedTask"
      :is-visible="isModalOpen"
      @close="closeEditModal"
      @save="updateTask"
    />

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" @click="cancelDelete"></div>
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 z-10">
        <h3 class="text-lg font-bold text-gray-800 mb-2">¿Eliminar esta tarea?</h3>
        <p class="text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="cancelDelete" 
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button 
            @click="confirmDelete" 
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Task, TaskCreate, TaskUpdate, TaskStatus } from '@/types/Task';
import { taskService } from '@/services/taskService';
import TaskForm from '@/components/TaskForm.vue';
import TaskItem from '@/components/TaskItem.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import TaskModal from '@/components/TaskModal.vue';

// Estado
const tasks = ref<Task[]>([]);
const isLoading = ref(true);
const currentFilter = ref<TaskStatus>('all');
const editingTask = ref<Task | null>(null);
const selectedTask = ref<Task | null>(null);
const isModalOpen = ref(false);
const showDeleteConfirm = ref(false);
const taskToDelete = ref<string | null>(null);

// Carga inicial de tareas
onMounted(async () => {
  try {
    await fetchTasks();
  } catch (error) {
    console.error('Error cargando tareas:', error);
  } finally {
    isLoading.value = false;
  }
});

// Filtrado de tareas
const filteredTasks = computed(() => {
  if (currentFilter.value === 'all') {
    return tasks.value;
  }
  return tasks.value.filter(task => 
    currentFilter.value === 'completed' ? task.completed : !task.completed
  );
});

// Métodos
const fetchTasks = async () => {
  try {
    isLoading.value = true;
    const data = await taskService.getTasks();
    // Asegurarnos de que tasks.value siempre sea un array
    tasks.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error obteniendo tareas:', error);
    tasks.value = []; // Inicializar como array vacío en caso de error
  } finally {
    isLoading.value = false;
  }
};

const handleTaskSubmit = async (taskData: TaskCreate) => {
  try {
    if (editingTask.value) {
      const updatedTask = await taskService.updateTask(editingTask.value._id, taskData);
      tasks.value = tasks.value.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      );
      editingTask.value = null;
    } else {
      const newTask = await taskService.createTask(taskData);
      tasks.value.unshift(newTask);
    }
  } catch (error) {
    console.error('Error guardando tarea:', error);
  }
};

const toggleTaskComplete = async (id: string) => {
  try {
    const task = tasks.value.find(t => t._id === id);
    if (!task) return;
    
    const update: TaskUpdate = { 
      title: task.title,  // Incluir el título actual
      completed: !task.completed 
    };
    const updatedTask = await taskService.updateTask(id, update);
    
    tasks.value = tasks.value.map(task => 
      task._id === id ? updatedTask : task
    );
  } catch (error) {
    console.error('Error actualizando estado de tarea:', error);
  }
};

// Edición mediante modal
const openEditModal = (task: Task) => {
  selectedTask.value = task;
  isModalOpen.value = true;
};

const closeEditModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    selectedTask.value = null;
  }, 300); // Esperar a que termine la animación
};

const updateTask = async (id: string, data: TaskUpdate) => {
  try {
    const updatedTask = await taskService.updateTask(id, data);
    tasks.value = tasks.value.map(task => 
      task._id === id ? updatedTask : task
    );
    closeEditModal();
  } catch (error) {
    console.error('Error actualizando tarea:', error);
  }
};

// Confirmación de eliminación
const confirmDeleteTask = (id: string) => {
  taskToDelete.value = id;
  showDeleteConfirm.value = true;
};

const cancelDelete = () => {
  showDeleteConfirm.value = false;
  taskToDelete.value = null;
};

const confirmDelete = async () => {
  if (taskToDelete.value) {
    await deleteTask(taskToDelete.value);
    showDeleteConfirm.value = false;
    taskToDelete.value = null;
  }
};

const deleteTask = async (id: string) => {
  try {
    await taskService.deleteTask(id);
    tasks.value = tasks.value.filter(task => task._id !== id);
  } catch (error) {
    console.error('Error eliminando tarea:', error);
  }
};

const changeFilter = (filter: TaskStatus) => {
  currentFilter.value = filter;
};

const cancelEdit = () => {
  editingTask.value = null;
};

const scrollToForm = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style scoped>
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.3s ease;
}
.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style> 