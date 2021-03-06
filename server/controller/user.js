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

    User.findOne({ email }).then((foundUser) => {
      if (foundUser !== null) {
        return res.status(409).json({
          status: 'failed',
          message: `The email address: ${email} is already associated with an account`
        });
      }

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
      });
    }).catch(err => next(err));

    return this;
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @memberof UserController
   * @returns {object} - user object or error object
   */
  login(req, res, next) {
    const { identifier, password } = req.body;

    User.findOne({
      $or: [
        { username: identifier },
        { email: identifier }
      ]
    }).then((foundUser) => {
      if (foundUser !== null) {
        if (bcrypt.compareSync(password, foundUser.password)) {
          const { _id, email, username } = foundUser;
          const payload = {
            id: _id,
            email,
            username
          };
          const token = Auth.createToken(payload);
          return res.status(200).json({
            status: 'success',
            message: 'Login successfull!',
            token
          });
        }
        return res.status(400).json({
          status: 'fail',
          message: 'Incorrect signin credentials!'
        });
      }

      return res.status(400).json({
        status: 'fail',
        message: 'Incorrect signin credentials!'
      });
    }).catch(err => next(err));

    return this;
  }
}

const user = new UserController();
export default user;
