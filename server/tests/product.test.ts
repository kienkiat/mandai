import request from 'supertest';
import app from '../src/app';

let token: string;

beforeAll(async () => {
  const res = await request(app).post('/api/login').send({
    email: 'teokienkiat1@gmail.com',
    password: 'kienkiat',
  });
  token = res.body.data.token;
});

describe('Product API', () => {
  let productId: number;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        description: 'A test product',
        price: 19.99,
      });

    productId = res.body.data.id;
  });

  it('should get product by id', async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('name', 'Test Product');
  });

  it('should update product', async () => {
    const res = await request(app)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 29.99 });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.price).toBe(29.99);
  });

  it('should delete product', async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
