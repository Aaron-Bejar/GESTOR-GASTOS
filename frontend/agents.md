# 🤖 Plan y Guía del Proyecto: Gestor de Gastos Inteligente (GESTOR-GASTOS)

Este documento sirve como hoja de ruta, plano arquitectónico y guía de desarrollo para los agentes de Inteligencia Artificial y desarrolladores humanos que colaboren en este repositorio. Define el estado actual, la estructura del proyecto y los planes futuros.

---

## 📌 1. Visión General del Proyecto
**GESTOR-GASTOS** es una aplicación web moderna de finanzas personales diseñada para ayudar a los usuarios a registrar, categorizar y analizar sus ingresos y gastos diarios. El valor diferencial clave del proyecto es la integración de un **Asistente de Finanzas Inteligente** basado en Inteligencia Artificial (Gemini) utilizando técnicas de **RAG (Retrieval-Augmented Generation)** y búsquedas vectoriales en la base de datos para responder de manera precisa y personalizada sobre la salud financiera del usuario.

---

## 🛠️ 2. Stack Tecnológico de Vanguardia
La aplicación está construida sobre un conjunto de tecnologías modernas de alto rendimiento:

1. **Frontend Core**:
   - **React (v19)** como biblioteca de interfaz de usuario.
   - **Vite (v7)** como entorno de desarrollo rápido y empaquetador de assets.
   - **React Router Dom (v7)** para el enrutamiento de páginas declarativo y seguro.
2. **Estilizado y UI**:
   - **Tailwind CSS (v4)** integrado nativamente con Vite (`@tailwindcss/vite`) para estilos rápidos, responsivos e interactivos.
   - **Material-UI (MUI v7)** para componentes de UI específicos y consistentes.
   - **Lucide React** para iconos vectoriales limpios y consistentes.
   - **SweetAlert2** para alertas e interacciones pulidas con el usuario.
3. **Gestión de Estado y Datos**:
   - **Zustand (v5)** para el manejo de estado global ligero (UI, filtros activos, estados del modal, datos seleccionados).
   - **TanStack React Query (v5)** para la sincronización y almacenamiento en caché del estado del servidor, optimizando peticiones y mejorando la UX.
4. **Backend y Persistencia**:
   - **Supabase**: Base de datos Postgres en la nube, autenticación e infraestructura en tiempo real.
   - **pgvector**: Extensión de Supabase para almacenar y comparar embeddings directamente en Postgres.
5. **Inteligencia Artificial**:
   - **@google/generative-ai**: Integración con modelos Gemini.
   - **`gemini-embedding-001`**: Para generar vectores representativos de las transacciones financieras del usuario.
   - **`gemini-2.5-flash`**: Modelo de lenguaje ultra-rápido para procesar el contexto y formular respuestas empáticas en el chat del asistente.

---

## 📁 3. Estructura del Proyecto (Atomic Design)
El frontend sigue la metodología de **Diseño Atómico** para garantizar la modularidad, escalabilidad y reusabilidad de los componentes:

```text
frontend/
├── src/
│   ├── assets/            # Recursos estáticos (imágenes, logos, etc.)
│   ├── components/        # Estructura Atomic Design
│   │   ├── atomo/         # Componentes indivisibles (Botones, Spinners, Inputs)
│   │   ├── molecula/      # Grupos de átomos (Carousels, Calendarios Lineales)
│   │   ├── organismo/     # Combinaciones complejas (Sidebar, Tablas, Formularios, Chatbots)
│   │   └── template/      # Estructuras de página completas (HomeTemplate, MotionTemplate, etc.)
│   ├── constants/         # Valores constantes globales
│   ├── context/           # Contextos de React (ej. AuthProvider, rutas públicas y protegidas)
│   ├── hook/              # Hooks personalizados (ej. useTheme, queries de React Query)
│   ├── pages/             # Páginas y vistas principales que se mapean a las rutas
│   ├── router/            # Configuración de rutas (MyRouter)
│   ├── services/          # Llamadas directas de red y lógica externa (APIs, Supabase, Gemini)
│   ├── store/             # Tiendas de Zustand para la gestión de estados específicos de la UI
│   ├── styles/            # Archivos adicionales de estilos y tokens CSS
│   ├── supabase/          # Configuración del cliente oficial de Supabase
│   └── utils/             # Funciones utilitarias y formateadores (fechas, monedas, números)
```

---

## 🚀 4. Funcionalidades Implementadas
El proyecto cuenta con las siguientes capacidades listas para usar:

* **🔐 Autenticación**: Flujo de inicio de sesión público y protegido en base a la sesión del usuario a través de Google Cloud y Supabase.
* **📂 Gestión Dinámica de Categorías**: Creación, edición y borrado de categorías de ingresos y gastos con colores personalizados y selectores de emojis integrados.
* **💸 Registro y Gestión de Movimientos**: 
  - Gestión completa de ingresos y gastos (CRUD).
  - Estado del movimiento (Pendiente / Pagado o Recibido).
  - Asociación con cuentas bancarias y categorías específicas.
  - Interfaz de calendario lineal para visualizar movimientos diarios de forma intuitiva.
* **📊 Visualización Financiera**:
  - Resumen automatizado de totales mediante tarjetas visuales (Ingresos/Gastos Pendientes, Recibidos/Pagados y balance General).
  - Informes dinámicos usando gráficos analíticos (`react-chartjs-2`).
* **🤖 Asistente Financiero RAG en Tiempo Real**:
  - Chat interactivo que utiliza IA para analizar las finanzas del usuario.
  - Búsqueda vectorial local con la función RPC `buscar_contexto_ia` en Supabase para obtener transacciones relevantes como contexto histórico.
  - Respuestas personalizadas basadas única y verazmente en el historial del usuario.
* **⚙️ Configuración Personalizada**:
  - Guardado en base de datos del tema preferido del usuario (Modo Claro u Oscuro).
  - Selección de la divisa principal para el formateo de monedas de manera global.

---

## 📈 5. Plan de Acción y Hoja de Ruta (Futuro)
Para llevar este Gestor de Gastos a un nivel de producto comercial premium, proponemos la implementación estructurada de las siguientes características:

### Fase 1: Optimización de Reportes y Gráficos
- [ ] **Desglose de Categorías**: Implementar gráficos de tipo Dona/Pastel detallados por categorías en la sección de Reportes para ver en qué se gasta más.
- [ ] **Comparativas Mensuales**: Añadir gráficos de barras para comparar ingresos vs. gastos mes a mes.
- [ ] **Filtros Avanzados**: Permitir filtrar reportes por rangos de fecha personalizados (este mes, último trimestre, año actual).

### Fase 2: Gestión de Presupuestos (Budgets) y Límites
- [ ] **Establecer Presupuestos**: Permitir que el usuario configure límites de gasto por categoría (ej. Máximo $200 USD mensuales en "Comida").
- [ ] **Alertas de Gasto**: Notificaciones en pantalla (y sugeridas por la IA) cuando el usuario esté cerca del 80% o sobrepase el presupuesto configurado.
- [ ] **Seguimiento Visual**: Barras de progreso en la página de categorías que muestren visualmente el consumo del presupuesto mensual.

### Fase 3: Potenciar el Asistente Financiero Inteligente
- [ ] **Categorización Automática**: Permitir que el asistente analice una frase escrita (ej: *"Gasté 15 USD en Starbucks hoy"*) y cree automáticamente la transacción en la base de datos sin necesidad de llenar el formulario.
- [ ] **Recomendaciones Proactivas**: Consejos automatizados de ahorro y alertas basados en patrones de consumo del usuario (ej: *"Este mes has gastado un 15% más en entretenimiento que el anterior"*).
- [ ] **Herramientas de Simulación (Function Calling)**: Capacitar al chatbot para que calcule proyecciones de ahorro a largo plazo a través de funciones interactivas.

### Fase 4: Experiencia de Usuario y Exportación de Datos
- [ ] **Exportación de Informes**: Botón para exportar el historial de movimientos a archivos PDF formateados estéticamente o archivos CSV/Excel.
- [ ] **Multi-Cuentas**: Soporte real para gestionar billeteras, cuentas de ahorro y tarjetas de crédito de forma separada pero integrada.

---

## 📑 6. Normas de Desarrollo para Agentes
Cuando edites o agregues código en este repositorio, asegúrate de seguir estas directrices:

1. **Mantener la consistencia del Diseño Atómico**: 
   - No coloques lógica masiva en las páginas. 
   - Si creas un componente simple, colócalo en `atomo` o `molecula`.
   - Si contiene lógica de API o Supabase combinada con múltiples elementos visuales, va en `organismo`.
   - Si organiza la estructura visual global de una vista, va en `template`.
2. **Consultas a través de TanStack Query**: Evita usar `useEffect` directos para peticiones de datos de Supabase. Usa o amplía los hooks existentes de React Query en la carpeta `src/hook` para mantener la sincronización y la cacheabilidad.
3. **Estilos de Alta Gama**: La estética del proyecto es de nivel premium. Utiliza fondos degradados, efectos de cristal (glassmorphic), bordes limpios, transiciones suaves y micro-animaciones usando Tailwind CSS.
4. **Respeto a las variables de entorno**: Las claves de API (como Supabase o Gemini) siempre deben consumirse desde `import.meta.env` y nunca quedar registradas de forma explícita en el código.
