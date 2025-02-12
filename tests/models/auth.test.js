const {
	verifyCredentials,
	exists,
	login,
	register,
} = require('../../src/models/Auth');
const { DB } = require('../../src/config/db');

jest.mock('../../src/config/db.js');

describe('Auth model', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('verifyCredentials', () => {
		test('Usuario y contraseña correctos', async () => {
			const email = 'test@example.com';
			const password = 'password';

			DB.query.mockResolvedValue({
				rows: [{ email, password }],
				rowCount: 1,
			});

			const result = await verifyCredentials(email, password);

			expect(result).toBe(true);
			expect(DB.query).toHaveBeenCalledTimes(1);
		});

		test('Usuario y contraseña incorrectos', async () => {
			const email = 'notExist@example.com';
			const password = 'password';

			DB.query.mockResolvedValue({
				rows: [],
				rowCount: 0,
			});

			await expect(verifyCredentials(email, password)).rejects.toThrow(
				'USER_NOT_FOUND'
			);
		});
	});

	describe('register', () => {
		test('Usuario registrado correctamente', async () => {
			const email = 'newuser@example.com';
			const password = 'hashedPassword';

			const mockUser = {
				id: 2,
				email,
			};

			DB.query.mockResolvedValue({
				rows: [mockUser],
				rowCount: 1,
			});

			const user = await register(email, password);

			expect(user).toEqual(mockUser);
			expect(DB.query).toHaveBeenCalledTimes(1);
		});

		test('Usuario no registrado', async () => {
			const email = 'erroruser@example.com';
			const password = 'hashedPassword';

			DB.query.mockRejectedValue(new Error('Database error'));

			await expect(register(email, password)).rejects.toThrow('Database error');
		});
	});
});
