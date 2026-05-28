Xuayua Cloud Forest

Xuayua Cloud Forest es una página web turística moderna y responsiva desarrollada para promocionar un hospedaje ubicado en Juayúa, en el corazón de la Ruta de las Flores.

El proyecto fue desarrollado utilizando únicamente tecnologías frontend modernas, priorizando rendimiento, diseño visual, experiencia de usuario y simplicidad de mantenimiento.

Características Principales
Diseño moderno y totalmente responsivo
Compatible con dispositivos móviles, tablets y escritorio
Sistema de traducción Español / Inglés
Integración dinámica de eventos mediante Google Sheets
Formulario de contacto funcional con EmailJS
Protección anti-spam mediante Google reCAPTCHA
Galería interactiva de imágenes
Integración con Google Maps
Animaciones y efectos visuales modernos
Optimización para GitHub Pages
Arquitectura estática segura y ligera
Tecnologías Utilizadas
HTML5
CSS3
JavaScript Vanilla
EmailJS
Google Sheets API
Google reCAPTCHA
Font Awesome
GitHub Pages
Seguridad Implementada

El proyecto incluye múltiples medidas básicas de seguridad frontend:

Validación de formularios
Protección contra spam mediante reCAPTCHA
Validación de longitud de mensajes
Validación de nombres
Prevención de múltiples envíos consecutivos
Arquitectura sin backend expuesto
Uso de HTTPS mediante GitHub Pages

Estructura del Proyecto

project/
│
├── index.html
├── static/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── icons/


Configuración de Eventos Dinámicos

La sección de eventos se alimenta automáticamente desde Google Sheets.

La hoja debe contener columnas para:

Título
Fecha
Lugar
Imagen
Descripción
Traducciones al inglés
Configuración del Formulario

El formulario utiliza:

EmailJS para envío de correos
Google reCAPTCHA para protección anti-spam

Es necesario configurar:

Public Key de EmailJS
Service ID
Template ID
Site Key de reCAPTCHA
Publicación

El proyecto está preparado para desplegarse fácilmente en:

GitHub Pages
Netlify
Vercel
Objetivo del Proyecto

El objetivo principal es ofrecer una experiencia digital moderna para promocionar hospedajes turísticos en la Ruta de las Flores, permitiendo a los visitantes conocer el destino, explorar la propiedad y contactar fácilmente a los anfitriones.

Estado del Proyecto

Proyecto actualmente funcional y optimizado para producción frontend estática.