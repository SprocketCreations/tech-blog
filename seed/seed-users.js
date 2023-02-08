const { User } = require("../models");

const data = [
	{
		displayName: "Joe",
		email: "example@example.com",
		password: "doug",
	}, {
		displayName: "Loki",
		email: "godofmischief@asguard.co.uk",
		password: "ruler",
	}, {
		displayName: "Alex",
		email: "techno@never.dies",
		password: "the_blade",
	}, {
		displayName: "Darius",
		email: "martyr@hotmail.com",
		password: "achillies",
	}, {
		displayName: "Andrew",
		email: "andrew@gmail.com",
		password: "password12",
	},
];

const seedUsers = async () => {
	await User.bulkCreate(data);
};

module.exports = seedUsers;
