const { DB } = require('../config/db');
const format = require('pg-format');
const { comparePassword } = require('../helpers/bcrypt');

const verifyCredentials = async (email, password) => {
	try {
		const SQLQuery = format(
			`
                SELECT * FROM users
                WHERE email = %L AND password = %L
            `,
			email,
			password
		);

		const {
			rows: [user],
			rowCount,
		} = await DB.query(SQLQuery);

		if (!rowCount) {
			throw new Error('USER_NOT_FOUND');
		} else {
			return Boolean(rowCount);
		}
	} catch (error) {
		throw error;
	}
};

const login = async (email, password) => {
	try {
		// const user = await verifyCredentials(email, password)

		const userExists = await exists(email);

		const math = comparePassword(password, userExists.password);

		if (!math) {
			throw new Error('AUTH_ERROR');
		} else {
			return userExists;
		}
	} catch (error) {
		throw error;
	}
};

const exists = async (email) => {
	try {
		const SQLQuery = format(
			`
                SELECT * FROM users
                WHERE email = %L
            `,
			email
		);

		const {
			rows: [user],
			rowCount,
		} = await DB.query(SQLQuery);

		if (!rowCount) {
			throw new Error('NOT_FOUND');
		} else {
			return user;
		}
	} catch (error) {
		throw error;
	}
};

const register = async (email, password, role = 'USER') => {
	try {
		const SQLQuery = format(
			`
                INSERT INTO users (email, password, role)
                VALUES (%L, %L, %L)
                RETURNING *
            `,
			email,
			password,
			role
		);

		const {
			rows: [user],
			rowCount,
		} = await DB.query(SQLQuery);

		if (!rowCount) {
			throw new Error('BAD_REQUEST');
		} else {
			return user;
		}
	} catch (error) {
		throw error;
	}
};

module.exports = {
	login,
	register,
	verifyCredentials,
	exists,
};
