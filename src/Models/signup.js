const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pswd: {
        type: String,
        required: true
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, "Lorem ipsum dolor sit amet consectetur")
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (e) {
        console.log(e)
    }
}

userSchema.pre('save', async function(next) {
    if (this.isModified("pswd")) {
        this.pswd = await bcrypt.hash(this.pswd, 10);
    }
    next();
});


const SignUp = mongoose.model('userinfo', userSchema);

module.exports = SignUp;