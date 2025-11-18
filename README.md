# 📚 API REST - Gestión de Productos (Libros)

## 📌 Descripción del proyecto
Esta API REST permite gestionar un catálogo de **productos** (libros) utilizando una arquitectura **MVC**, con base de datos MongoDB y servidor Express en TypeScript.

El sistema soporta las operaciones CRUD completas:

- **Crear** un producto
- **Listar** todos los productos
- **Obtener** un producto por ID
- **Actualizar** un producto existente
- **Eliminar** un producto por ID

Además, el proyecto incluye:
- Validación de IDs de MongoDB
- Manejo de errores con respuestas claras
- Middlewares esenciales
- Logging con **morgan** a consola y archivo
- Carpeta de logs generada automáticamente
- Verificación del estado del servidor y base de datos (`/status`)
- Estructura profesional y modular con patrón MVC

---

## 📁 Estructura del proyecto

```
evaluacion-arq-mvc/
 ├── src/
 │   ├── config/
 │   │   └── mongodb.ts
 │   ├── controllers/
 │   │   └── ProductController.ts
 │   ├── interfaces/
 │   │   └── IProduct.ts
 │   ├── models/
 │   │   └── ProductModel.ts
 │   ├── routes/
 │   │   └── productRoutes.ts
 │   ├── app.ts (si corresponde)
 │   └── index.ts / server.ts
 ├── logs/
 ├── package.json
 ├── tsconfig.json
 ├── .env
 └── README.md
```

---

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **Morgan** (logging)
- **CORS**
- **Dotenv**
- Sistema de rutas + controladores bajo arquitectura **MVC**

---


## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/NicoleGluj/evaluacion-arq-mvc.git
cd evaluacion-arq-mvc
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno

```
MONGO_URI=
PORT=
JWT_SECRET=
NODE_ENV=
```

### 4️⃣ Ejecutar servidor en modo desarrollo
```bash
npm run dev
```
---

## 🧪 Probar la API (Bruno / Thunder Client / Postman)

Usar las siguientes rutas:

- `GET http://localhost:3000/products`
- `POST http://localhost:3000/products`
- `GET http://localhost:3000/products/:id`
- `PUT http://localhost:3000/products/:id`
- `DELETE http://localhost:3000/products/:id`

---

## 👨‍💻 Autor
Proyecto desarrollado por **Nicole Gluj** como parte de la evaluación de la materia **Backend Full Stack** de la **UTN**.

---