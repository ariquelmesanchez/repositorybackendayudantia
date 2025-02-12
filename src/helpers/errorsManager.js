// errors[err.message]   err.message = SERVER_ERROR
// // errors['SERVER_ERROR'] =  {
//          id: 'serverError',
//          message: "Error interno en el servidor",
//          description: "Ocurió un error en el servidor intenta más tarde",
//          code: 500
//     },

module.exports = {
	SERVER_ERROR: {
		id: 'serverError',
		message: 'Error interno en el servidor',
		description: 'Ocurió un error en el servidor intenta más tarde',
		code: 500,
	},
	NOT_FOUND: {
		id: 'notFound',
		message: 'Registro no encontrado',
		description: 'El registro buscado no existe en la base de datos',
		code: 404,
	},
	USER_NOT_FOUND: {
		id: 'userNotFound',
		message: 'Usuario no encontrado',
		description: 'El usuario buscado no existe en la base de datos',
		code: 404,
	},
	BAD_REQUEST: {
		id: 'badRequest',
		message: 'Solicitud incorrecta',
		description: 'Faltan campos o ingresaste campos erroneos',
		code: 400,
	},
	AUTH_ERROR: {
		id: 'authError',
		message: 'Credenciales Incorrectas',
		description: 'Las credenciales no son correctas para el usuario',
		code: 401,
	},
};
