const { User } = require("../models");

const data = [
	{
		displayName: "Joe",
		email: "example@example.com",
		password: "DougTheR@t27",
	}, {
		displayName: "Loki",
		email: "godofmischief@asguard.co.uk",
		password: "Y0ur-Ruler",
	}, {
		displayName: "Alex",
		email: "techno@never.dies",
		password: "The_B1ade",
	}, {
		displayName: "Darius",
		email: "martyr@hotmail.com",
		password: "Achillies77!",
	}, {
		displayName: "Andrew",
		email: "andrew@gmail.com",
		password: "@Password12",
	},
];

const seedUsers = async () => {
	await User.bulkCreate(data, {
		hooks: true,
		validate: true,
	});
};

module.exports = seedUsers;
