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

  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @memberof DiaryController
   * @returns {object} -
   */
  getEntries(req, res, next) {
    const limit = parseInt((req.query.limit <= 0) ? 6 : req.query.limit || 6, 10);
    const page = parseInt((req.query.page <= 0) ? 0 : req.query.page - 1 || 0, 10);
    const { id } = req.decoded;
    Diary.find({})
      .limit(limit)
      .skip(limit * page)
      .where({ user_id: id })
      .sort({ createdAt: -1 })
      .exec((err, entries) => {
        if (err) return next(err);
        Diary.count().where({ user_id: id }).exec((err, count) => {
          if (err) return next(err);
          const pageCount = Math.ceil(count / limit);
          res.status(200).json({
            status: 'sucess',
            total: count,
            pageCount,
            page: page + 1,
            entries
          });
        });
      });

    return this;
  }
}

const diary = new DiaryController();

export default diary;
