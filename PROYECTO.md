
# 🧠 Documentación detallada – Proyecto: App Suite Taller

**App Suite Taller** es una aplicación web desarrollada para gestionar eficientemente los procesos internos de un taller de cartelería como Espacio CV. Esta documentación proporciona un panorama completo de su estructura técnica, funcionalidades implementadas y pendientes, estado actual, tecnologías utilizadas y componentes clave.

---

## 📘 Información General

- **Nombre del Proyecto:** App Suite Taller
- **Versión:** 1.0 (en desarrollo activo)
- **Desarrollador:** Marían
- **Cliente:** Espacio CV
- **Repositorio:** [GitHub - DesarrolloEspacioCv/appSuiteTaller_twilend](https://github.com/DesarrolloEspacioCv/appSuiteTaller_twilend)
- **Editor visual:** Firebase Studio
- **IDE:** Visual Studio Code

---

## 🛠 Tecnologías Utilizadas

- **Framework principal:** [Next.js 14](https://nextjs.org/)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Backend:** Firebase (Firestore, Auth, Hosting), PHP + MySQL (módulos externos)
- **API:** Axios
- **Estado global:** React Context API
- **Routing:** App Router (`/app` structure)

---

## 📁 Estructura del Proyecto

```
src/
├── app/                           # Rutas y páginas
│   ├── login/                     # Login de usuarios
│   ├── dashboardEmpleado/         # Panel de usuario
│   ├── dashboardPatron/           # Panel administrador
│   ├── empleados/                 # ABM de empleados
│   ├── herramientas/              # Control de herramientas
│   ├── materiales/                # Control de materiales
│   ├── compras/                   # Módulo de compras
│   ├── gestionEstacion/           # Gestión de estaciones de trabajo
│   ├── gestionTareas/             # Gestión de tareas
│   ├── perfilEmpleado/            # Visualización y edición del perfil
│   ├── tareaEmpleado/             # Tareas asignadas al empleado
│   └── imprimir/[id]/             # Plantilla de impresión de órdenes
│
├── components/                    # Componentes UI
│   ├── BottomNav.tsx              # Navegación inferior (móvil)
│   └── BottomNavWrapper.tsx       # Contenedor de navegación
│
├── context/                       # Autenticación global
│   └── AuthContext.tsx
│
├── lib/                           # Servicios y lógica de negocio
│   ├── usuarioService.ts
│   ├── herramientaService.ts
│   ├── materialService.ts
│   ├── tareaService.ts
│   └── estacionService.ts
```

---

## 🔐 Autenticación y Seguridad

- Sistema de autenticación con Firebase Auth.
- Roles:
  - 👨‍💼 Patrón (admin): acceso a todas las funciones.
  - 👤 Empleado: acceso limitado a tareas y perfil.
- `AuthContext.tsx`: Manejo global de sesión y control de rutas protegidas.

---

## 📦 Módulos y Funcionalidades

### Herramientas
- ABM de herramientas.
- Estados: bueno, reparación, roto.
- Asignación a empleados y estaciones.

### Materiales
- Inventario por nombre, proveedor, unidad, cantidad.
- Asociado a órdenes de compra y uso en tareas.

### Compras
- Registro y listado de compras.
- Asociación con proveedor y materiales.
- Plantilla de impresión personalizada.

### Empleados
- ABM de empleados.
- Vista de perfil y edición por parte del usuario.

### Horarios
- Registro de entradas y salidas.
- Campo `ajustado_por_patron` para modificaciones manuales.

### Estaciones de trabajo
- Se crean con nombre, descripción y fecha límite.
- Permite asignar empleados, herramientas y tareas.

### Tareas
- Pertenecen a una estación de trabajo.
- Asignación de empleados (incluso si no están en la estación).
- Estados de avance, comentarios, fechas límite.

---

## 🔄 Estado Actual del Proyecto

| Módulo              | Estado       | Notas                                                                 |
|---------------------|--------------|-----------------------------------------------------------------------|
| Autenticación       | ✅ Completo  | Redirección y control de rol funcional con `AuthContext`.             |
| Herramientas        | ✅ Completo  | Listado, alta, edición, baja, asignación.                            |
| Materiales          | ✅ Completo  | Stock conectado a compras.                                            |
| Compras             | 🟡 En progreso | Impresión personalizada funcional, se están puliendo detalles.       |
| Empleados           | ✅ Completo  | ABM funcional, conexión con Firestore.                               |
| Horarios            | 🟡 En progreso | Se implementó, falta validar interfaz y reporte.                     |
| Estaciones          | ✅ Completo  | Crear, editar, eliminar, asignar.                                    |
| Tareas              | 🟡 En progreso | Creación funcional, falta diseño visual y filtros.                   |
| Dashboard           | 🟡 En progreso | Adaptación por rol, resumen y novedades en curso.                   |

---

## 📌 Tareas Pendientes

- [ ] Mejorar diseño responsive general en pantallas más pequeñas.
- [ ] Agregar exportación a PDF o Excel de órdenes y reportes.
- [ ] Filtros en listados (por fechas, nombre, estado).
- [ ] Notificaciones visuales y mejoras UX.
- [ ] Animaciones suaves (integración con Framer Motion).
- [ ] Configuración de permisos más detallada por usuario.

---

## 📬 Contacto

Proyecto desarrollado por **Espacio CV**  
Sitio web: [https://espacio.uy](https://espacio.uy)  
Desarrollador principal: Marían  
Repositorio del proyecto: [GitHub](https://github.com/DesarrolloEspacioCv/appSuiteTaller_twilend)

---
