import { Diary } from '../models';
/**
 *
 *
 * @class DiaryController
 */
class DiaryController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @memberof DiaryController
   * @returns {boject} -
   */
  addEntry(req, res, next) {
    const { title, text } = req.body;
    const { _id } = req.decoded;
    Diary.create({
      _id,
      title,
      text
    }).then(entry => res.status(201).json({
      status: 'success',
      message: 'Entry created succesfully',
      entry
    })).catch(err => next(err));

    return this;
  }
}

const diary = new DiaryController();

export default diary;
