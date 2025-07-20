Product Management Application

A full-stack web application for managing products and enabling end-users to browse and purchase them. The app supports role-based access for admins (CRUD operations on products) and users (shopping functionality).

    Features:
    Authentication & Authorization
    - JWT-based login and signup
    - Role-based access (admin, user)
    - Secure API access via Bearer token

    Product Management
    - Admin: Create, Read, Update, Delete (CRUD) products
    - Users: View and purchase products

    Shopping Cart
    - Add, remove, update quantity
    - Clear all items
    - Place order

    Responsive UI
    - Mobile-friendly design
    - Modern, clean layout using CSS Modules

    Tech Stack
    Frontend:
    - React (TypeScript)
    - React Router
    - Axios
    - CSS Modules

    Backend:
    - Node.js
    - Express.js (TypeScript)
    - JWT Authentication
    - MikroORM
    - PostgreSQL

    Folder Structure (Frontend)
    Mandai/client/src
    ├── api/
    ├── components/
    ├── context/
    ├── pages/
    ├── routes/
    ├── utils/
    ├── styles/
    └── App.tsx

    Folder Structure (Backend)
    Mandai/server/src
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── validators/
    ├── utils/
    ├── uploads/
    └── orm.ts
    └── mikro-orm.config.ts
    └── server.ts

    Installation and running application
    git clone https://github.com/kienkiat/mandai.git
    cd mandai

    (Backend)
    cd server
    npm install
    npm start

    (Frontend)
    cd client
    npm start

    API Endpoints
    Auth:
    | Method | Endpoint           | Description  |
    | ------ | ------------------ | -------------|
    | POST   | `/api/login`  | Login user        |
    | POST   | `/api/signup` | Register new user |

    Products:
    | Method | Endpoint                      | Description        |
    | ------ | ----------------------------- | ------------------ |
    | GET    | `/api/products`               | Get all products   |
    | GET    | `/api/products/:id`           | Get product details|
    | POST   | `/api/products` *(admin)*     | Create new product |
    | PUT    | `/api/products/:id` *(admin)* | Update product     |
    | DELETE | `/api/products/:id` *(admin)* | Delete product     |
    | GET    | `/api/inventory`              | Get all stocks     |
    | PUT    | `/api/inventory/:id`          | Update stocks      |

    Cart:
    | Method | Endpoint           | Description            |
    | ------ | -----------------  | ---------------------- |
    | GET    | `/api/cart`        | Get user cart          |
    | GET    | `/api/cart/summary`| Get cart summary       |
    | DELETE | `/api/cart`        | Delete cart            |
    | POST   | `/api/cart`        | Add/update/remove item |

    Orders:
    | Method | Endpoint                     | Description            |
    | ------ | -----------------            | ---------------------- |
    | GET    | `/api/orders`                | Get user orders        |
    | GET    | `/api/orders/:id`            | Get order details      |
    | POST   | `/api/orders`                | Create order           |
    | POST   | `/api/admin/orders` *(admin)*| Get all users' orders  |

     Roles
    - admin: Full CRUD access on products
    - user: Can browse and buy products

    License
    MIT License © [Teo Kien Kiat]

    Acknowledgments
    - React
    - Express
    - MikroORM
    - PostgreSQL

    Database Schemas
    - CartItem
    - Inventory
    - Order
    - OrderItem
    - Product
    - User
