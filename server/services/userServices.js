const User = require("../models/User");

module.exports = {
    createUser: async (data) => {
        try {
            const userExists = await User.findOne({ username: data.username });
            if (userExists) {
                const err = new Error("Usuário já existe.");
                err.status = 409; // Conflict
                throw err;
            }

            await User.create(data);
        }
        catch (err) {
            if (!err.status) {
                err.status = 500;
            }

            throw err;
        }
    },

    login: async (data) => {
        try {
            const user = await User.findOne({ username: data.username });

            if (!user) {
                const err = new Error("Usuário não encontrado");
                err.status = 401; //unauthorized
                throw err;
            }

            if (user.password != data.password) {
                const err = new Error("Credenciais incorretas");
                err.status = 403; //forbidden - incorrect password
                throw err;
            }

            return user;
        }
        catch (err) {
            if (!err.status) {
                err.status = 500;
            }

            throw err;
        }
    }
};
