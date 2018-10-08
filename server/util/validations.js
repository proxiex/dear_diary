import Validator from 'validatorjs';
/**
 *
 *
 * @class Validate
 */
class Validate {
  /**
   *
   * @param {request} request
   *
   * @param {response} response
   *
   * @param {function} next
   *
   * @returns {Object} - JSON object and status code
   *
   * @memberof Validate
   */
  static isNum(request, response, next) {
    const { entryId } = request.params;

    if (typeof parseInt(entryId, 10) !== 'number') {
      return response.status(400).json({
        status: 'failed',
        message: 'Parameter must be a number!'
      });
    }
    return next();
  }

  /**
   *
   * @static
   *
   * @param {object} request
   *
   * @param {object} response
   *
   * @param {function} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
   */
  static signup(request, response, next) {
    const {
      avatar,
      name,
      email,
      username,
      password

    } = request.body;

    const userData = {
      avatar,
      name,
      email,
      username,
      password
    };

    const userDataRules = {
      email: 'required|string|email',
      password: 'required|min:6',
      username: 'required|string|min:5',
      name: 'required|string|alpha|min:3',
      avatar: 'string'
    };

    const validation = new Validator(userData, userDataRules);
    if (validation.passes()) {
      request.body = {
        avatar: avatar.trim(),
        name: name.trim(),
        email: email.trim(),
        username: username.trim(),
        password: password.trim()
      };
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400).json({ message: errors });
    }
  }

  /**
   *
   * @static
   * @param {object} request
   *
   * @param {object} response
   *
   * @param {function} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
   */
  static login(request, response, next) {
    const {
      identifier,
      password
    } = request.body;

    const userData = {
      identifier,
      password
    };

    const userDataRules = {
      identifier: 'required|string',
      password: 'required|min:6',
    };

    const validation = new Validator(userData, userDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400).json({ message: errors });
    }
  }

  /**
   *
   *
   * @static
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @memberof Validate
   * @returns {object} -
   */
  static entries(request, response, next) {
    const { title, text } = request.body;
    const entryData = {
      title,
      text
    };

    const entryDataRules = {
      title: 'required|string|min:2',
      text: 'required|min:6',
    };

    const validation = new Validator(entryData, entryDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400).json({ message: errors });
    }
  }
}

export default Validate;
