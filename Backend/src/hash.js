import bcrypt from "bcryptjs";

const password = "12345";

const hashPassword = await bcrypt.hash(password, 10);
console.log("Hashed password:", hashPassword);