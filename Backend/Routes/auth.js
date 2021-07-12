const router = require("express").Router();
const User = require("../Models/User");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');









router.post('/register', async (req, res) => {

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send({ message: 'email exist' });
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        password: req.body.password

    });

    try {

        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
})


router.post('/login', async (req, res) => {

    const emailExist = await User.findOne({ email: req.body.email });
    if (!emailExist) {
        return res.status(400).send({ message: 'invalid email' });
    }
    const user = await User.findOne({ email: req.body.email });
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send({ message: 'invalid password' });
    }


    const token = jwt.sign({ user }, "houssemferjani",
        {
            expiresIn: 86400
        });
    res.status(200).send({
        _id: user._id,
        email: user.email,
        accessToken: token
    });

});

 

module.exports = router;