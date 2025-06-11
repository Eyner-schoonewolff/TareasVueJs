# MetNet - Aplicación de Gestión de Tareas

Frontend desarrollado con Vue 3, Composition API, TypeScript y TailwindCSS para la gestión de tareas.

## Características

- Diseño moderno y atractivo con TailwindCSS
- Interfaz responsive para cualquier dispositivo
- CRUD completo para tareas
- Filtrado por estado: Todas / Completadas / Pendientes
- Edición de tareas mediante modal interactivo
- Confirmación para eliminación de tareas
- Animaciones suaves para mejorar la experiencia de usuario
- Integración con API REST

## Requisitos previos

- Node.js (v14 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd metnet-frontend
```

2. Instalar dependencias:

```bash
npm install
# O si usas yarn:
yarn install
```

3. Configurar variables de entorno:

Crea un archivo `.env` basado en `.env.example` (si existe) o configura la URL de la API en `vite.config.ts`.

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# O si usas yarn:
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Construcción para producción

```bash
npm run build
# O si usas yarn:
yarn build
```

Los archivos generados estarán en la carpeta `dist`.

## Vista previa de producción

```bash
npm run preview
# O si usas yarn:
yarn preview
```

## Estructura del proyecto

```
/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/          # Recursos (CSS, imágenes, etc.)
│   ├── components/      # Componentes reutilizables
│   ├── services/        # Servicios para API
│   ├── types/           # Definiciones de tipos TypeScript
│   ├── views/           # Vistas/páginas de la aplicación
│   ├── App.vue          # Componente raíz
│   └── main.ts          # Punto de entrada
├── index.html           # Plantilla HTML
├── vite.config.ts       # Configuración de Vite
└── tsconfig.json        # Configuración de TypeScript
```

## Decisiones técnicas del Frontend

### Arquitectura y Patrones

- **Composition API**: Se eligió la API de Composición de Vue 3 sobre Options API por su mejor soporte para TypeScript, mayor reutilización de lógica y mejor organización del código.

- **TypeScript**: Implementación completa con interfaces y tipos para proporcionar autocompletado, documentación inline y detección temprana de errores.

- **Patrón de Servicios**: Se implementó un patrón de servicios para separar la lógica de negocio y las llamadas a la API del resto de la aplicación.

### UI/UX

- **TailwindCSS**: Framework de utilidades CSS para un desarrollo rápido y consistente de la interfaz. Permite una personalización detallada sin necesidad de escribir CSS desde cero.

- **Diseño Modular**: Componentes pequeños y reutilizables que permiten mayor flexibilidad y mantenibilidad.

- **Animaciones y Transiciones**: Se utilizaron transiciones y animaciones sutiles para mejorar la experiencia de usuario sin afectar el rendimiento.

- **Experiencia Mobile-First**: Diseño responsivo adaptado a todos los tamaños de pantalla, priorizando la experiencia en dispositivos móviles.

### Estado y Flujo de Datos

- **Estado Reactivo**: Uso de `ref` y `reactive` para mantener un estado reactivo en la aplicación.

- **Props y Eventos**: Comunicación entre componentes padres e hijos mediante props para datos descendentes y eventos para datos ascendentes.

- **Computed Properties**: Uso de propiedades computadas para transformaciones y filtrado de datos derivados del estado.

### Optimizaciones

- **Manejo de Errores**: Implementación robusta de manejo de errores en las llamadas a la API con retroalimentación clara al usuario.

- **Validación de Datos**: Validación tanto en el frontend como en las llamadas al backend para garantizar la integridad de los datos.

- **Lazy Loading**: Carga diferida de componentes para mejorar el rendimiento inicial de la aplicación.

## Integración con el backend

Esta aplicación está diseñada para comunicarse con una API REST desarrollada en Node.js con Express, que proporciona endpoints para gestionar tareas. El proxy para desarrollo está configurado en `vite.config.ts`.

## Licencia

Eyner Schoonewolff
