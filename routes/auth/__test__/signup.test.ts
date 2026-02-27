import request from 'supertest';
import { app } from '../../../src/app';


it("returns a 201 on successful signup", async()=>{
    return request(app).post('/api/auth/signup').send({
        email: "test@test.com",
        password: "password"
    }).expect(201);
});

it("sets a cookie after successful signup", async()=>{
    const res = await request(app).post('/api/auth/signup').send({
        email: "test@test.com",
        password: "password"
    }).expect(201);
    
    expect(res.get('Set-Cookie')).toBeDefined();
});