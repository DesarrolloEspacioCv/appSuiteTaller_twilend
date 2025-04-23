
# App Suite Taller – Gestión integral para talleres de cartelería

**App Suite Taller** es una aplicación web moderna desarrollada con **Next.js (App Router)**, **TypeScript**, y **Tailwind CSS**, diseñada para gestionar de forma eficiente todos los recursos y operaciones internas de un taller de cartelería, como Espacio CV.

Este sistema permite controlar herramientas, materiales, empleados, tareas, horarios, órdenes de compra y mucho más desde una única plataforma optimizada para móviles y escritorio.

---

## 🚀 Tecnologías utilizadas

- ⚛️ **Next.js 14** (estructura `app/`)
- 🔡 **TypeScript**
- 💨 **Tailwind CSS**
- 🔐 **Firebase Auth**
- ☁️ **Firestore**
- 🔄 **Axios** (consumo de APIs PHP/MySQL)
- 🧠 **Context API** (manejo global de autenticación)
- 🎨 Diseño Mobile-first, estilo iOS/Material Design

---

## 📁 Estructura general del proyecto

```
appSuiteTaller/
├── src/
│   ├── app/                   # Rutas y vistas
│   │   ├── login/
│   │   ├── dashboardPatron/
│   │   ├── dashboardEmpleado/
│   │   ├── empleados/
│   │   ├── herramientas/
│   │   ├── materiales/
│   │   ├── compras/
│   │   ├── gestionEstacion/
│   │   ├── gestionTareas/
│   │   ├── perfilEmpleado/
│   │   └── imprimir/[id]/
│   ├── components/            # Componentes reutilizables
│   │   ├── BottomNav.tsx
│   │   └── BottomNavWrapper.tsx
│   ├── context/               # Contexto de autenticación
│   ├── lib/                   # Servicios y lógica de conexión
│   │   ├── usuarioService.ts
│   │   ├── herramientaService.ts
│   │   ├── materialService.ts
│   │   ├── tareaService.ts
│   │   └── estacionService.ts
├── firebase.json
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## 🔐 Autenticación

- Manejo de login con Firebase Authentication
- Separación de roles:  
  👤 **Empleado**  
  👨‍💼 **Patrón** (admin)
- Uso de `AuthContext.tsx` para rutas protegidas, control de sesión y redirección automática según el rol

---

## 📦 Módulos implementados

### 🛠 Herramientas
- Registro, estado (bueno, reparación, roto)
- Asignación a empleados y estaciones

### 📦 Materiales
- Inventario, unidades, proveedor, cantidad disponible
- Control por compras y uso en tareas

### 🧾 Compras
- Registro de órdenes de compra
- Impresión de comprobantes personalizados

### 👷 Empleados
- Alta, modificación, baja
- Vista y edición del perfil

### ⏱ Horarios
- Registro de entrada/salida
- Campo especial: `ajustado_por_patron`

### 🧩 Estaciones de trabajo
- Asignación de empleados, herramientas y tareas por estación
- Vista por parte del patrón y del empleado

### ✅ Tareas
- Creación, asignación, estado de avance y comentarios
- Seguimiento visual y organizado

---

## 📱 Interfaz y diseño

- Estética moderna inspirada en iOS + Material Design
- Totalmente responsive (adaptada a móviles y escritorio)
- Menú inferior tipo app móvil (`BottomNav`)
- Colores institucionales definidos por el cliente

---

## 📌 Estado del proyecto

- 🔄 En desarrollo activo por Marían
- ✅ Firebase conectado y funcional
- 🧪 Módulos en pruebas y ajustes visuales
- 🛠 Backend MySQL vía PHP en integración
- 📦 Proyecto subido a:  
  [https://github.com/DesarrolloEspacioCv/appSuiteTaller_twilend](https://github.com/DesarrolloEspacioCv/appSuiteTaller_twilend)

---

## 👨‍💻 Instalación local

```bash
# Clonar el repo
git clone https://github.com/DesarrolloEspacioCv/appSuiteTaller_twilend.git

# Entrar a la carpeta
cd appSuiteTaller_twilend

# Instalar dependencias
npm install

# Iniciar servidor local
npm run dev
```

Accedé en: [http://localhost:3000](http://localhost:3000)

---

## 📬 Contacto

Proyecto desarrollado por **Espacio CV**  
Sitio web: [https://espacio.uy](https://espacio.uy)  
Desarrollador: Marían

---
