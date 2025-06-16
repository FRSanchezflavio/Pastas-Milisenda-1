# Pastas Milisenda

Aplicación de e-commerce para venta de pastas desarrollada con Node.js y MongoDB.

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env` con:
```
PORT=8080
MONGO_URI=mongodb://localhost:27017/pastasMilisenda
JWT_SECRET=mi_clave_secreta
JWT_EXPIRATION=24h
ADMIN_EMAIL=admin@milisenda.com
```

## Ejecutar

```bash
npm start
```

## Estructura

- `models/` - Modelos de MongoDB
- `dao/` - Acceso a datos
- `controllers/` - Lógica de controladores
- `routes/` - Definición de rutas
- `middlewares/` - Middlewares de autenticación

## API

### Autenticación
- `POST /api/sessions/register` - Registro
- `POST /api/sessions/login` - Login
- `GET /api/sessions/current` - Usuario actual

### Productos
- `GET /api/products` - Listar productos
- `POST /api/products` - Crear producto (admin)
- `PUT /api/products/:id` - Actualizar producto (admin)
- `DELETE /api/products/:id` - Eliminar producto (admin)

### Carrito
- `POST /api/carts/:cid/product/:pid` - Agregar producto
- `POST /api/carts/:cid/purchase` - Finalizar compra

## Tecnologías

- Node.js
- Express
- MongoDB
- JWT
- Bcrypt
