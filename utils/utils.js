const jwt = require("jsonwebtoken");

// Generate JWT Token
const genToken = ({ _id: id, username, email }) => {
	return jwt.sign(
		{
			id,
			username,
			email,
		},
		process.env.JWT_KEY,
		{ expiresIn: "1d" }
	);
};

// Convert stream to Base64 String
const streamToBase64 = async (stream) => {
	return new Promise((resolve, reject) => {
		let buffers = [];

		stream.on("data", (chunk) => buffers.push(chunk));
		stream.once("end", () => {
			let buffer = Buffer.concat(buffers);
			resolve(buffer.toString("base64"));
		});
		stream.once("error", (err) => reject(err));
	});
};

// JPEG, JPG and PNG file signatures
const supportedSignatures = [
	"89504e470d0a1a0a",
	"ffd8ffdB",
	"ffd8ffe0",
	"ffd8ffee",
	"ffd8ffe1",
];

// Check File formats
const checkFileFormats = (base64File) => {
	const fileBuffer = Buffer.from(
		base64File.replace(/^data:image\/\w+;base64,/, ""),
		"base64"
	);

	return supportedSignatures.some((signature) => {
		const fileHexString = fileBuffer
			.toString("hex")
			.substr(0, signature.length);

		return fileHexString === signature;
	});
};

module.exports = {
	genToken,
	streamToBase64,
	checkFileFormats,
	supportedSignatures,
};
