import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET = 'secretkey';
const usersArray = [
    { name: 'Mehmood', email: 'meh@gmial.com', hashedPassword: '' }
]

export default mutation = {
    login: async (_, { email, password }, { }) => {
        // get the user from the database by email
        // const user = await User.findOne({ where: { email } });
        const user = usersArray.find((user) => user.email === email)

        // check if the user exists and the password is correct
        if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
            throw new Error('Invalid login');
        }

        // create the token
        const token = jwt.sign({ userId: user.id }, SECRET);

        return { token };
    },
    signUp: async (_, { email, password }, { }) => {
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // create a new user
        const user = await usersArray.push({
            email,
            hashedPassword: hashedPassword
        })

        // create the token
        const token = jwt.sign({ userId: user.id }, SECRET);

        return { token };
    },

}