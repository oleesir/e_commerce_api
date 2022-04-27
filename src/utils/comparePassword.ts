import bcrypt from "bcryptjs";

const comparePassword = (password: string, hash: string) => bcrypt.compareSync(password, hash);

export default comparePassword;
