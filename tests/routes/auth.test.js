const request = require('supertest');
const app = require('../../src/app');

const { comparePassword, hashPassword } = require('../../src/helpers/bcrypt');
const { signToken } = require('../../src/helpers/jwt');
const Auth = require('../../src/models/Auth');

jest.mock('../../src/helpers/bcrypt');
jest.mock('../../src/helpers/jwt');
jest.mock('../../src/models/Auth');

describe('API Routes', () => {
	describe('Auth Routes', () => {
		test('POST exitoso /api/v2/auth/login', async () => {
			let user = {
				email: 'test@example.com',
				password: 'password',
				email_verified: true,
				role: 'guest',
			};

			Auth.login.mockResolvedValue(user);
			comparePassword.mockReturnValueOnce(true);
			signToken.mockReturnValueOnce('token12345');

			const response = await request(app).post('/api/v2/auth/login').send({
				email: user.email,
				password: user.password,
			});

			expect(response.status).toBe(200);
			expect(response.body.msg).toBe('Login exitoso');
			expect(response.body.data).toEqual({
				email: user.email,
				token: 'token12345',
			});
		});
	});
});
