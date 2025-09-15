
# Gestor de Inventario IA

Una aplicación web moderna y responsiva para la gestión de inventarios de almacenes, construida con React, TypeScript y Tailwind CSS. Incluye un asistente de IA impulsado por la API de Gemini para proporcionar información y automatizar tareas.

## ✨ Características

- **Gestión Completa de Productos (CRUD):** Añade, visualiza, edita y elimina productos del inventario.
- **Panel de Control Interactivo:** Visualiza métricas clave como el valor total del inventario, el número de productos y los artículos con bajo stock.
- **Persistencia Local:** El estado del inventario se guarda en el `localStorage` de tu navegador, por lo que tus datos no se pierden al recargar la página.
- **Diseño Moderno:** Interfaz de usuario limpia, intuitiva y completamente responsiva construida con Tailwind CSS.
- **Asistente de IA:** Chatea con un asistente de IA para obtener información sobre tu inventario, generar descripciones de productos y más.

## 🚀 Cómo Empezar

Sigue estos pasos para ejecutar la aplicación en tu máquina local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18.x o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### 1. Configuración del Proyecto

Primero, clona este repositorio (o descarga los archivos) y navega al directorio del proyecto:

```bash
# Navega al directorio donde están los archivos
cd tu-directorio-del-proyecto
```

Instala las dependencias necesarias:

```bash
npm install
```

### 2. Variables de Entorno

Esta aplicación utiliza la API de Google Gemini. Necesitarás una clave de API para que el asistente de IA funcione.

1.  Crea un archivo llamado `.env` en la raíz del proyecto.
2.  Añade tu clave de API de Google AI Studio al archivo:

```
API_KEY=TU_CLAVE_DE_API_DE_GEMINI_AQUI
```

**Importante:** La aplicación frontend no puede acceder directamente a `process.env`. Para el desarrollo local, los frameworks como Vite o Create React App lo hacen disponible. Al desplegar, necesitarás configurar esta variable de entorno en tu proveedor de hosting.

### 3. Ejecutar la Aplicación Localmente

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```
O si estás usando una configuración estándar de React:
```bash
npm start
```

Abre [http://localhost:5173](http://localhost:5173) (o el puerto que se indique en tu terminal) en tu navegador para ver la aplicación.

## ☁️ Despliegue

Puedes desplegar esta aplicación en cualquier servicio de hosting de sitios estáticos. Aquí tienes los pasos generales usando **Vercel** o **Netlify**, que son opciones excelentes y gratuitas.

### Pasos Generales para el Despliegue:

1.  **Crea un Repositorio en Git:**
    - Sube el código de tu proyecto a un repositorio de GitHub, GitLab o Bitbucket.

2.  **Elige un Proveedor de Hosting:**
    - Crea una cuenta en [Vercel](https://vercel.com/) o [Netlify](https://www.netlify.com/).

3.  **Importa tu Proyecto:**
    - En el panel de control de tu proveedor, elige "Importar Proyecto" o "Nuevo Sitio desde Git".
    - Conecta tu cuenta de Git y selecciona el repositorio de tu aplicación de inventario.

4.  **Configura los Ajustes de Build:**
    - El proveedor generalmente detectará que es un proyecto de React y autocompletará estos ajustes. Si no, úsalos:
      - **Comando de Build:** `npm run build` o `vite build`
      - **Directorio de Publicación:** `dist` o `build`

5.  **Añade tus Variables de Entorno:**
    - Este es el paso más importante para que la API de Gemini funcione en producción.
    - En la configuración de tu sitio en Vercel/Netlify, busca la sección "Environment Variables" (Variables de Entorno).
    - Añade una nueva variable:
      - **Key (Clave):** `API_KEY` (o `VITE_API_KEY` si usas Vite)
      - **Value (Valor):** `TU_CLAVE_DE_API_DE_GEMINI_AQUI`

6.  **Despliega:**
    - Haz clic en el botón "Deploy Site".
    - ¡Tu aplicación estará en vivo en una URL pública en pocos minutos! Cada vez que hagas `git push` a tu rama principal, el sitio se volverá a desplegar automáticamente.
