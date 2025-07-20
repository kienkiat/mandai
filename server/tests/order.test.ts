import request from 'supertest';
import app from '../src/app';

let token: string;
let productId: number;
let orderId: number;

beforeAll(async () => {
  const loginRes = await request(app).post('/api/login').send({
    email: 'teokienkiat1@gmail.com',
    password: 'kienkiat',
  });
  token = loginRes.body.data.token;

  const productRes = await request(app)
    .post('/api/products')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Order Test Product',
      description: 'Product for testing order',
      price: 25.0,
    });

  productId = productRes.body.data.id;

  await request(app)
    .post('/api/cart')
    .set('Authorization', `Bearer ${token}`)
    .send({
      productId,
      quantity: 2,
      type: 'add',
    });
});

describe('Order API', () => {
  it('should create an order from cart', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);

    orderId = res.body.data.orderId;
  });

  it('should return a list of orders', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it('should return order details by ID', async () => {
    const res = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
