const { Op } = require("sequelize");
class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }

    async create(firstName, lastName, username, salt, encryptedPassword) {
        return this.User.create(
            {
                FirstName: firstName,
                LastName: lastName,
                Username: username,
                Salt: salt,
                EncryptedPassword: encryptedPassword
            }
        ) 
    }

    async getAll() {
        return this.User.findAll({
            where: {}
        })
    }
    


    async deleteUser(userId) {
        return this.User.destroy({
            where: {
                id: userId,
                Role: {
                    [Op.not]: 'Admin'
                }
            }
        })
    }
}
module.exports = UserService;