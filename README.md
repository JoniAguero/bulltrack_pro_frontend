# 🐂 Bulltrack Pro - Frontend

Premium bull classification and management platform built with the latest bleeding-edge web technologies.

## 🚀 Deployment
**Live Demo:** [https://bulltrack-pro-frontend-blush.vercel.app/](https://bulltrack-pro-frontend-blush.vercel.app/)

> [!NOTE]
> La aplicación utiliza un backend remoto en Railway. Para probarlo en local, asegúrate de configurar las variables de entorno correctamente.

---

## ✨ Características (Features)
- **Visualización Dual:** Alterna entre vista de lista y grilla para explorar los toros.
- **Filtrado Avanzado:** Filtra por origen (Propio/Catálogo), uso (Vaquillona/Vaca), pelaje y búsqueda por texto.
- **Métricas Técnicas (Radar Charts):** Gráficos interactivos de radar que visualizan Crecimiento, Reproducción, Moderación, Carcasa y Facilidad de Parto.
- **Sistema de Favoritos:** Guarda y gestiona tus toros preferidos con persistencia inmediata.
- **Panel de Detalle:** Drawer lateral premium con información técnica extendida y fotos de alta resolución.
- **Exportación a Excel:** Descarga los resultados filtrados directamente a un archivo .xlsx.
- **Carga Progresiva (Streaming):** Interfaz ultra-rápida que muestra esqueletos de carga (Skeletons) mientras se obtienen los datos.
- **Autenticación:** Sistema de login seguro manejado con React 19 Server Actions.

---

## 🛠️ Local Setup

### Prerequisites
- Node.js 20+
- A running instance of the [Bulltrack Backend](https://github.com/JoniAguero/bulltrack_pro_backend)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/JoniAguero/bulltrack_pro_frontend.git
   cd bulltrack_pro_frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root. Para apuntar al backend de producción o uno local, modifica:
   ```env
   BACKEND_API_URL=https://valiant-grace-production.up.railway.app/
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).
