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
    const { id } = req.decoded;
    Diary.create({
      usere_id: id,
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

  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @memberof DiaryController
   * @returns {object} -
   */
  getEntry(req, res) {
    const { entryId } = req.params;
    const { id } = req.decoded;
    Diary.find({})
      .where({ user_id: id, _id: entryId })
      .exec((err, entry) => {
        if (err) {
          return res.status(404).json({
            status: 'failed',
            message: 'Entry not found'
          });
        }
        return res.status(200).json({
          status: 'sucess',
          entry
        });
      });

    return this;
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof DiaryController
   * @returns {object} -
   */
  modifyEntry(req, res) {
    const { title, text } = req.body;
    const { entryId } = req.params;
    const { id } = req.decoded;
    const updateData = {};
    if (title) {
      updateData.title = title;
    }

    if (text) {
      updateData.text = text;
    }

    // {$set:{name:"Naomi"}}, {new: true}
    if (Object.keys(updateData).length === 0 && updateData.constructor === Object) {
      return res.status(200).json({
        status: 'sucess',
        message: 'Nothing to update'
      });
    }
    updateData.updatedAt = new Date();
    Diary.findOneAndUpdate(
      { user_id: id, _id: entryId },
      { $set: updateData },
      { new: true },
      (err, doc) => {
        if (err) {
          return res.status(404).json({
            status: 'failed',
            message: 'Entry not found'
          });
        }
        return res.status(200).json({
          status: 'success',
          message: 'Entry updated successfully',
          entry: doc
        });
      }
    );
    return this;
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof DiaryController
   * @returns {object} -
   */
  archiveEntry(req, res) {
    const { entries } = req.body;
    let criteria;
    let msg = 'Not found';
    if (typeof entries === 'string') {
      criteria = {
        _id: { $in: entries }
      };
    } else if (typeof entries === 'object') {
      criteria = {
        _id: entries
      };

      msg = entries.length > 1 ? "One or more of the entry id's was not found!" : msg;
    }
    Diary.updateMany(criteria, { archive: true }, null, (err) => {
      if (err) {
        return res.status(404).json({
          status: 'failed',
          message: msg
        });
      }
      Diary.find(criteria, (err, updated) => {
        if (err) {
          return res.status(400).josn({
            err
          });
        }
        return res.status(200).json({
          entries: updated
        });
      });
    });

    return this;
  }
}

const diary = new DiaryController();

export default diary;
