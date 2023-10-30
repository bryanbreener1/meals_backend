import User from "./user.model.js"

export class UserService {

    async createUser(data){
        return await User.create(data)
    }

    async findUserByEmail(email){
        return await User.findOne({
            where:{
                email,
                status: true
            }
        })
    }

    async findOneUserById(id){
        return await User.findOne({
            where:{
                id,
                status:true
            }
        })
    }

    async updateUser(user,data){
        return await user.update(data)
    }

    async deleteUser(user){
        return await user.update({status:false})
    }
}
