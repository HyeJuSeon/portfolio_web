import { User } from "../db";
const bcrypt = require("bcrypt");

class passwordService {
  static async getUser({ email }) {
    const user = await User.findByEmail({ email });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    return user;
  }
  static async setUser({ email, newPassword, passwordReset }) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.updatePassword({
      email,
      newPassword: hashedPassword,
      passwordReset,
    });

    return user;
  }
}

export { passwordService };
