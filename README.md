# ☕ Coffee Wheel: Random Payer Selector

**Coffee Wheel** es una herramienta web interactiva diseñada para resolver el dilema diario en la oficina: ¿A quién le toca pagar la ronda de café? Basada en una ruleta de decisión aleatoria, permite gestionar grupos de hasta 12 personas de forma justa, visual y rápida.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://coffee-wheel.vercel.app)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)

---

<img width="1131" height="874" alt="{DC132C36-9F34-4B20-BE4C-C99A60E3E9FB}" src="https://github.com/user-attachments/assets/7eb16b80-9935-4f31-8372-ed8c024678da" />


<img width="1196" height="820" alt="{C688B4DF-92E5-4558-A485-21FA319D62FC}" src="https://github.com/user-attachments/assets/650c525a-e3b1-41e2-afca-3a7481a557d0" />


<img width="1086" height="779" alt="{D35BD62E-D529-4E05-B419-8869A1E7152E}" src="https://github.com/user-attachments/assets/a8884fc8-94b6-4536-b77b-40ff230a8c98" />





## 🎯 Propósito del Proyecto
Olvídate de las discusiones sobre quién pagó la última vez. Esta aplicación utiliza un motor de rotación aleatoria para elegir a una "víctima" entre los nombres introducidos. Es la solución ideal para equipos que buscan transparencia y un toque de emoción antes del break.

## ✨ Características Principales
* **Gestión Dinámica:** Soporte para un mínimo de 2 y un máximo de **12 participantes**.
* **Generación de Segmentos:** La ruleta se recalcula visualmente en tiempo real cada vez que se añade o elimina un nombre.
* **Animación de Giro Realista:** Implementada con una desaceleración (easing) orgánica para aumentar el suspense.
* **UI Moderno:** Interfaz limpia, oscura y *mobile-first* construida con Tailwind CSS.
* **Efecto Ganador:** Notificación visual inmediata del nombre seleccionado tras el frenado de la ruleta.
* Historial de ganadores pasados
* Reducción de tiempo de animación de movimiento de giro de ruleta
* Disponible en Español o Inglés
---

## 🛠️ Stack Técnico

* **Framework:** React 18 (Vite).
* **Styling:** Tailwind CSS (Diseño responsivo y utilitario).
* **Iconos:** Lucide React.
* **Despliegue:** Optimizado para Vercel.

---

## 🚀 Instalación y Uso Local

Si deseas clonar el repositorio y ejecutarlo en tu máquina:

### 1. Clonar el repo
```bash
git clone [https://github.com/aisurf3r/Coffee-Wheel.git](https://github.com/aisurf3r/Coffee-Wheel.git)
cd Coffee-Wheel
```

2. Instalar dependencias
```bash
npm install
```
3. Scripts de ejecución
Vite utiliza puertos específicos para diferentes estados del ciclo de vida:

Desarrollo: Para trabajar con Hot Module Replacement (HMR).

```bash
npm run dev
```
Acceso en: http://localhost:5173


Producción (Preview): Para probar el build final antes de desplegar.

```bash
npm run build
npm run preview
```
Acceso en: http://localhost:4173

## ⚙️ Lógica de Sorteo (Deep Dive)

La aplicación utiliza un motor de rotación basado en estados de React y cálculos geométricos dinámicos. El flujo de selección sigue este algoritmo:

1. **Cálculo de Segmentos:** Se divide el círculo (`360°`) entre el número de participantes para obtener el `segmentAngle`.
2. **Determinación del Objetivo:** ```javascript
   const targetAngle = 360 - (winnerIndex * segmentAngle) - (segmentAngle / 2);

Esto garantiza que la ruleta siempre gire varias veces antes de detenerse en un segmento calculado de forma aleatoria basándose en el índice del array de participantes.
Este cálculo garantiza que la ruleta se detenga exactamente en el centro de la porción del ganador.

3. Física del Giro:

Inercia: Se añaden 5 vueltas completas (360 * 5) para crear el efecto de velocidad.

Offset Aleatorio: Se suma un pequeño margen de error (±5°) para evitar una detención estática artificial.

Accesibilidad: Soporte nativo para reduceMotion, reduciendo las vueltas y la duración de la animación para usuarios con sensibilidad visual.

## 🤝 Contribuciones
¿Tienes ideas para mejorar la app? (Ej: historial de pagos, integración con Slack, sonidos). 
1. Haz un **Fork** del proyecto.
2. Crea una rama para tu mejora (`git checkout -b feature/MejoraX`).
3. Haz un **Pull Request**.

## 📜 Licencia
Este proyecto está bajo la Licencia **MIT**. Eres libre de usarlo, modificarlo y distribuirlo (bajo tu propio riesgo económico si te toca pagar el café).

---
**Desarrollado para mantener la paz (y la cafeína) en el equipo.** Made with ❤️ by @aisurf3r
