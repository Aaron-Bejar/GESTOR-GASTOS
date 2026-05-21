# 💸 GESTOR-GASTOS — Gestor de Gastos Inteligente con IA (RAG)

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite 7](https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Gemini](https://img.shields.io/badge/Gemini_AI-2.5_Flash-F4B400?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)

Una aplicación web de finanzas personales diseñada para registrar, categorizar y analizar movimientos financieros diarios. Su principal valor diferencial es la integración de un **Asistente de Finanzas Inteligente (Chatbot)** potenciado por inteligencia artificial mediante arquitectura **RAG (Retrieval-Augmented Generation)**, realizando búsquedas vectoriales avanzadas con `pgvector` directamente en Postgres para brindar respuestas personalizadas, veraces y empáticas basadas únicamente en el historial financiero del usuario.

---

## 🚀 Características Principales

* **Autenticación de Nivel Empresarial**: Flujo de inicio de sesión público y protegido integrado de forma segura con **Supabase Auth** y **Google Cloud**.
* **Gestión Dinámica de Categorías (CRUD)**: Creación y personalización de categorías para ingresos y gastos, con asignación libre de colores y un selector interactivo de emojis.
* **Control de Movimientos en Tiempo Real**:
  - Registro y edición completa (CRUD) de ingresos y gastos.
  - Gestión de estados de movimientos (Pendiente / Pagado o Recibido).
  - Asociación fluida con cuentas bancarias y categorías específicas.
  - **Calendario Lineal Interactivo** en el Dashboard para navegar y visualizar de forma intuitiva las transacciones diarias.
* **Dashboard de Analíticas Avanzadas**:
  - Indicadores clave de rendimiento (KPIs) mediante tarjetas de balance general y parciales (Ingresos/Gastos Pendientes y Realizados).
  - Reportes gráficos dinámicos e interactivos desarrollados con `react-chartjs-2` para monitorear tendencias.
* **Asistente Financiero RAG Integrado**:
  - Chat interactivo capaz de analizar en segundos tu estado financiero general.
  - Implementación de **Búsqueda Vectorial Semántica** mediante embeddings de Gemini y la función RPC `buscar_contexto_ia` en Supabase (`pgvector`).
  - Contextualización exacta que evita alucinaciones de la IA, asegurando consejos fundamentados estrictamente en tus datos reales.
* **Preferencias a Medida**:
  - Persistencia del tema elegido (Modo Claro / Modo Oscuro) almacenado directamente en base de datos.
  - Soporte de divisa principal dinámica para formatear de manera global toda la interfaz de la aplicación.

---

## 🛠️ Stack Tecnológico

El proyecto está construido siguiendo las prácticas de desarrollo más modernas para asegurar el rendimiento, la escalabilidad y una experiencia de usuario sobresaliente.

| Capa | Tecnologías Clave | Propósito y Descripción |
| :--- | :--- | :--- |
| **Frontend Core** | **React 19**, **Vite 7**, **React Router Dom 7** | Motor del cliente SPA con soporte de renderizado eficiente, ruteo avanzado y empaquetamiento ultrarrápido (HMR). |
| **Estilizado e UI** | **Tailwind CSS v4**, **Material-UI v7 (MUI)**, **Lucide React**, **SweetAlert2** | Interfaz moderna con integración nativa `@tailwindcss/vite`, componentes estéticos preconstruidos, iconos vectoriales nítidos y alertas elegantes. |
| **Gestión de Estado** | **Zustand 5**, **TanStack React Query v5** | Zustand maneja el estado global ligero (filtros, modales, UI) mientras React Query sincroniza y cachea de forma óptima el estado del servidor. |
| **Backend & DB** | **Supabase (PostgreSQL)**, **pgvector** | Infraestructura en la nube con base de datos en tiempo real, autenticación integrada y almacenamiento de vectores para búsqueda semántica. |
| **Inteligencia Artificial** | **@google/generative-ai**, **Gemini 2.5 Flash**, **gemini-embedding-001** | Procesamiento semántico y generación de embeddings para las transacciones del usuario, coordinando respuestas ultra-rápidas mediante RAG. |

---

## 📁 Estructura del Proyecto (Atomic Design)

La arquitectura de la aplicación adopta la metodología de **Diseño Atómico** a fin de propiciar la modularidad, facilidad de mantenimiento e independencia de componentes:

```text
frontend/
├── src/
│   ├── assets/            # Recursos estáticos (imágenes, logos, etc.)
│   ├── components/        # Componentes organizados bajo Diseño Atómico
│   │   ├── atomo/         # Componentes indivisibles (Botones, Spinners, Inputs básicos)
│   │   ├── molecula/      # Grupos de átomos con lógica visual (Carousels, Calendario Lineal)
│   │   ├── organismo/     # Bloques complejos e interactivos (Sidebar, Tablas, Formularios, Chatbots)
│   │   └── template/      # Estructuras globales y contenedores de página (HomeTemplate, etc.)
│   ├── constants/         # Definición de constantes e identificadores globales
│   ├── context/           # Proveedores de contexto de React (ej. AuthProvider, seguridad de rutas)
│   ├── hook/              # Custom Hooks reutilizables (Manejo de temas, Queries/Mutations de React Query)
│   ├── pages/             # Páginas principales mapeadas a las rutas del enrutador
│   ├── router/            # Configuración del árbol de enrutamiento (MyRouter)
│   ├── services/          # Conexiones y peticiones externas (APIs de Supabase, Integración Gemini)
│   ├── store/             # Tiendas globales de Zustand para gestión de estados de UI
│   ├── styles/            # Archivos globales de CSS y tokens de diseño
│   ├── supabase/          # Configuración e inicialización del cliente de Supabase
│   └── utils/             # Funciones utilitarias (Formateo de divisas, parseo de fechas, etc.)
```

---

## 📋 Requisitos Previos

Antes de proceder con la instalación local, asegúrate de contar con las siguientes herramientas en tu entorno de desarrollo:

* **Node.js** (Versión 18.0.0 o superior recomendada)
* **npm** (Versión 9.0.0 o superior) o gestor de paquetes alternativo como **yarn** o **pnpm**
* Una cuenta activa en **Supabase** (con extensión `pgvector` activa y la función RPC `buscar_contexto_ia` configurada)
* Una clave de API de **Google Gemini** para ejecutar el asistente financiero inteligente

---

## 🔧 Instalación y Configuración

Sigue estos pasos detallados para poner en marcha una copia local de la aplicación en modo de desarrollo:

### 1. Clonar el repositorio
Obtén los archivos del proyecto clonando el repositorio desde tu cuenta de GitHub:
```bash
git clone https://github.com/tu-usuario/GESTOR-GASTOS.git
cd GESTOR-GASTOS/frontend
```

### 2. Instalar dependencias
Instala el conjunto de librerías y dependencias declaradas en el archivo `package.json` utilizando npm:
```bash
npm install
```

### 3. Configurar variables de entorno
El proyecto requiere claves y URLs específicas de tus servicios en la nube para funcionar correctamente. 

1. Duplica el archivo `.env.example` y renómbralo a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Abre el archivo `.env.local` e introduce tus credenciales correspondientes:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-publica-anonima-de-supabase
   VITE_GEMINI_API_KEY=tu-api-key-de-gemini-generative-ai
   ```

### 4. Ejecutar el servidor de desarrollo
Inicia el entorno local de Vite para visualizar la aplicación con recarga en caliente (Hot Module Replacement):
```bash
npm run dev
```
Una vez levantado, abre en tu navegador la dirección web que se indique en la terminal (usualmente `http://localhost:5173`).

---

## 📈 Hoja de Ruta de Desarrollo

Para evolucionar GESTOR-GASTOS hacia un producto comercial premium de nivel internacional, se ha planificado una hoja de ruta dividida en fases estructuradas:

### 🔹 Fase 1: Optimización de Reportes y Gráficos
*  **Desglose de Categorías**: Gráficos de tipo Dona/Pastel detallados por categorías en la sección de Reportes para identificar fugas de capital.
*  **Comparativas Inter-mensuales**: Gráficos de barras agrupados para comparar ingresos vs. gastos mes a mes.
*  **Filtros Avanzados**: Rangos de fecha dinámicos (este mes, último trimestre, año actual, rango personalizado).

### 🔹 Fase 2: Gestión de Presupuestos (Budgets) y Límites
*  **Establecer Presupuestos**: Configuración de límites mensuales de gasto por categoría (ej. Máximo $200 USD en "Comida").
*   **Alertas de Exceso**: Notificaciones visuales (y sugerencias por parte de la IA) al alcanzar el 80% o rebasar el presupuesto configurado.
*   **Seguimiento Visual**: Barras de progreso integradas en la vista de categorías que demuestren el porcentaje de consumo mensual consumido.

### 🔹 Fase 3: Potenciar el Asistente Financiero Inteligente
*  **Categorización Automática**: Procesamiento de lenguaje natural directo (ej. *"Gasté $15 en Starbucks hoy"*) para crear la transacción en base de datos automáticamente sin formularios.
*  **Recomendaciones Proactivas**: Sugerencias automáticas de ahorro y alarmas basadas en patrones recurrentes del usuario (ej. *"Has gastado un 15% más en entretenimiento que el mes anterior"*).
*  **Herramientas de Simulación**: Proyecciones financieras interactivas (Function Calling) a corto y largo plazo directamente desde el chat.

### 🔹 Fase 4: Experiencia de Usuario y Exportación de Datos
*  **Exportación de Informes**: Botón para exportar el historial filtrado en formato PDF estético o archivos CSV/Excel de alto nivel.
*  **Multi-Cuentas**: Soporte para gestionar billeteras físicas, cuentas de ahorro y tarjetas de crédito de forma independiente pero consolidada.

---

## ✒️ Autor y Colaboradores

* **Desarrollador Principal** - Aaron-Bejar
---
*Desarrollado con pasión utilizando lo último en ingeniería de software frontend e Inteligencia Artificial.*