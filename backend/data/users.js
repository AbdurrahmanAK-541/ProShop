import bcrypt from "bcryptjs"

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('12345', 10), 
        isAdmin: true
    },
    {
        name: 'Abdu Alkawash',
        email: 'abdu@example.com',
        password: bcrypt.hashSync('12345', 10),  
        
    },
    {
        name: 'Mohammed Alkawash',
        email: 'mohammed@example.com',
        password: bcrypt.hashSync('12345', 10), 
       
    },
]

export default users