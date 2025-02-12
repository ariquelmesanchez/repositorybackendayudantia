const {
	handleLogin,
	handleRegister,
} = require('../../src/controllers/auth.controller');
const { comparePassword, hashPassword } = require('../../src/helpers/bcrypt');
const { signToken } = require('../../src/helpers/jwt');
const Auth = require('../../src/models/Auth');

jest.mock('../../src/helpers/bcrypt');
jest.mock('../../src/helpers/jwt');
jest.mock('../../src/models/Auth');

describe('Auth Controller', () => {
	let req, res, next;

	beforeEach(() => {
		req = {};
		res = {
			send: jest.fn(),
			json: jest.fn(),
			status: jest.fn().mockReturnThis(),
		};
		next = jest.fn();
	});

	describe('HandleLogin', () => {
		test('Login exitoso', async () => {
			let user = {
				email: 'test@example.com',
				password: 'password',
			};

			req.body = user;

			user.email_verified = true;
			user.role = 'guest';

			Auth.login.mockResolvedValue(user);
			comparePassword.mockReturnValueOnce(true);
			signToken.mockReturnValueOnce('token12345');

			await handleLogin(req, res, next);

			expect(Auth.login).toHaveBeenCalledWith(user.email, user.password);
			expect(signToken).toHaveBeenCalledWith({
				email: user.email,
				email_verified: true,
				role: user.role,
			});
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.send).toHaveBeenCalledWith({
				msg: 'Login exitoso',
				data: {
					token: 'token12345',
					email: user.email,
				},
			});
		});
	});
});
