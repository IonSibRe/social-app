const Joi = require("joi");

// Register validation
const registerValidate = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(4).required(),
		password: Joi.string().min(4).required(),
		confirmPassword: Joi.string().required().valid(Joi.ref("password")),
		email: Joi.string().email().required(),
	});

	return schema.validate(data);
};

// Login validation
const loginValidate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(4).required(),
	});

	return schema.validate(data);
};

module.exports = { registerValidate, loginValidate };

// Joi.string()
// 			.required()
// 			.valid(Joi.ref("password"))
// 			.options({
// 				language: {
// 					any: {
// 						allowOnly: "Passwords do not match",
// 					},
// 				},
// 			}),
