const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class user {
    contructor() { }

    get = async (req, res) => {
        const token = req.headers.authorization;
        const decoded = await jwt.verify(token, 'UsEr', (err) => {
            if (err) return res.sendStatus(403);
            next();
        });
        const Userid = decoded.userId
        const data = await this.model.find(Userid)
        return res.status(200).json(this.apiSend(data))

    }
    create = async (req, res) => {
        const { User_Name, User_Email, User_Password } = req.body
        const hashpw = await bcrypt.hash(User_Password, 10)

        const data = await this.model.create({
            User_Name,
            User_Email,
            User_Password: hashpw
        })
        return res.status(200).json(this.apiSend(data))
    }
    creates = async (req, res) => {
        const { User_Email } = req.body

        const User = await this.model.findOne(User_Email)

        if (!User) {
            res.send('invalid user')
        }

        const Pw = await bcrypt.compareSync(req.body.User_Password, User.User_Password)

        if (!Pw) {
            res.send('invalid PASSSWORD')

        }

        const token = await jwt.sign({
            userId: this.model._id
        }, "UsEr")

        r
        return res.status(200).json(this.apiSend(token))
    }


    apiSend = (json) => {
        return {
            data: json
        }
    }

}

module.exports = user;

