import request from 'supertest';
import app from '../src/app';

let token: string;
let productId: number;

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
      name: 'Cart Test Product',
      description: 'Used for cart tests',
      price: 10.0,
    });

  productId = productRes.body.data.id;
});

describe('Cart API', () => {
  it('should add a product to the cart', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId,
        quantity: 1,
        type: 'add',
      });

    expect(res.statusCode).toBe(200);
  });

  it('should get the cart items', async () => {
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should get cart summary', async () => {
    const res = await request(app)
      .get('/api/cart/summary')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('totalItems');
    expect(res.body.data).toHaveProperty('totalPrice');
  });

  it('should remove item from cart', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId,
        quantity: 1,
        type: 'remove',
      });

    expect(res.statusCode).toBe(200);
  });

  it('should clear the cart', async () => {
    await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId,
        quantity: 1,
        type: 'add',
      });

    const res = await request(app)
      .delete('/api/cart')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
