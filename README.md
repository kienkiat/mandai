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
    - Jest

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
    ├── tests/
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
    
    License
    MIT License © [Teo Kien Kiat]

<img width="2540" height="1291" alt="image" src="https://github.com/user-attachments/assets/b4945385-ea62-4200-85c2-29f0459d8204" />
<img width="2542" height="1286" alt="Screenshot 2025-07-21 at 5 12 34 AM" src="https://github.com/user-attachments/assets/a5177484-6a74-42df-aaaa-a071be933ddd" />
<img width="1903" height="973" alt="Screenshot 2025-07-21 at 5 23 25 AM" src="https://github.com/user-attachments/assets/71cc9005-8990-4d56-8a5e-9f32249dfb29" />
<img width="1897" height="971" alt="Screenshot 2025-07-21 at 5 23 06 AM" src="https://github.com/user-attachments/assets/586926d9-59d8-4b03-aada-00b60f4f716d" />
<img width="1893" height="953" alt="Screenshot 2025-07-21 at 5 22 42 AM" src="https://github.com/user-attachments/assets/293737c2-8baa-41c8-95c0-a8b6d7d57f06" />
<img width="1895" height="973" alt="Screenshot 2025-07-21 at 5 21 08 AM" src="https://github.com/user-attachments/assets/a8fbb8d3-1794-49eb-a6b2-6f6dee6e3132" />
