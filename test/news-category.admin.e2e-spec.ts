import 'dotenv/config';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request = require('supertest');

import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

describe('NewsCategoryController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  it('POST /auth/sign-in -> should respond with a jwt token and 201', async () => {
    const res = await request(app.getHttpServer()).post('/admin/login').send({ login: 'saidovdavron@gmail.com', password: '11111' }).expect(201);
    expect(res.body.accessToken).toBeDefined();
    jwtToken = res.body.accessToken;
  });

  it('POST /admin/news-category -> tokensiz yaratmoqchi bulsa 401', async () => {
    const res = await request(app.getHttpServer()).post('/admin/news-category').send({ title: 'Category 3' }).expect(401);
  });

  it('POST /admin/news-category -> should respond with 201', async () => {
    const res = await request(app.getHttpServer()).post('/admin/news-category').set('Authorization', `Bearer ${jwtToken}`).send({ title: 'Category 4' }).expect(201);
    expect(res.body.id).toEqual(1);
    expect(res.body.title).toEqual('Category 3');
  });

  it('Post /admin/news-category -> unique nomi uchun test yozish bilan 400', async () => {
    const res = await request(app.getHttpServer()).post('/admin/news-category').send({ title: 'Category 3' }).expect(400);
  });

  it("Get-All /admin/news-category/:id -> agar id mavjut bo'lmasa 404", async () => {
    const res = await request(app.getHttpServer()).get('/admin/news-category/7').expect(404);
  });
});
