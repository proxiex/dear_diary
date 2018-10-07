import bcrypt from 'bcrypt';
import { User } from '../models';
import Auth from '../util/authenticate';
/**
 *
 * @class UserController
 */
class UserController {
  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @memberof UserController
   * @returns {boject} - user object or error object
   */
  signup(req, res, next) {
    const {
      avatar, name, email, username, password
    } = req.body;

    User.create({
      avatar, name, email, username, password: bcrypt.hashSync(password, 10)
    }).then((user) => {
      const payload = {
        id: user._id,
        email: user.email,
        username: user.username
      };

      const token = Auth.createToken(payload);

      return res.status(201).json({
        status: 'success',
        message: 'Signup successfull!',
        token
      });
    }).catch(err => next(err));

    return this;
  }
}

const user = new UserController();
export default user;
