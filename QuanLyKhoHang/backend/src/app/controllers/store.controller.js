const { generateRandomCode } = require("../../utils/myUtil");
const createError = require("http-errors");
const storeModel = require("../models/store.model");
const { validateCreateStore } = require("../../utils/validate");

const storeController = {
  // check duplicate code
  async checkCodeExisted(code, next) {
    try {
      const storeFound = await storeModel.findOneWithDeleted({ code });
      if (storeFound) {
        return next(createError(400, "Code is already exist"));
      } else {
        return code;
      }
    } catch (error) {
      next(error);
    }
  },
  // create
  async create(req, res, next) {
    try {
      let { code, name } = req.body;
      const { error } = validateCreateStore({ code, name });
      if (error) {
        return next(error);
      }
      code = await storeController.checkCodeExisted(code, next);
      if (!code) {
        return;
      }
      const storeSaved = await storeModel.create({ ...req.body, code });
      return res.status(200).json(storeSaved);
    } catch (error) {
      next(error);
    }
  },
  // update store
  async update(req, res, next) {
    try {
      const { code, ...rest } = req.body;
      if (!code) {
        return next(createError(400, "Missing code of store to update"));
      }
      const storeSaved = await storeModel.findOne({ code });
      if (!storeSaved) {
        return next(createError(404, "Store not found"));
      }
      await storeModel.updateOne(
        { code },
        { ...rest, updatedBy: req.user._id }
      );
      const storeUpdated = await storeModel.findOne({ code });
      return res.status(200).json(storeUpdated);
    } catch (error) {
      next(error);
    }
  },
  // delete
  async delete(req, res, next) {
    try {
      const code = req.params.code;
      if (!code) {
        return next(
          createError(400, "Missing code of store in query to delete")
        );
      }
      const store = await storeModel.findOne({ code });
      if (!store) {
        return next(createError(404, "Store not found"));
      }
      await store.delete(req.user._id);
      return res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  },
  // destroy
  async destroy(req, res, next) {
    try {
      const { code } = req.params;
      if (!code) {
        return next(createError("Missing code in param to destroy"));
      }
      const store = await storeModel.findOneDeleted({ code });
      if (!store) {
        return next(createError(404, "Store not found in trash"));
      }

      await storeModel.deleteOne({ code });
      return res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  },
  // restore
  async restore(req, res, next) {
    try {
      const { code } = req.body;
      if (!code) {
        return next(createError(400, "Missing code in body to restore"));
      }
      // find existing store to check duplicate code
      const storeExisted = await storeModel.findOne({ code });
      if (storeExisted) {
        return next(
          createError(
            400,
            `Restore failure!. Duplicate code with store named '${storeExisted.name}'. Change the code of '${storeExisted.name}' before restoring`
          )
        );
      }
      const storeDeleted = await storeModel.findOneDeleted({ code });
      if (!storeDeleted) {
        return next(createError(404, "Store not found in trash"));
      }
      await storeModel.restore({ code });
      const storeRestored = await storeModel.findOne({ code });
      return res.status(200).json(storeRestored);
    } catch (error) {
      next(error);
    }
  },
  // search
  async search(req, res, next) {
    try {
      let { limit, page, ...condition } = req.body;
      if (!limit) {
        limit = 20;
      }
      if (!page) {
        page = 1;
      }
      const skip = limit * (page - 1);
      const stores = await storeModel.find(condition).skip(skip).limit(limit);
      const count = await storeModel.find(condition).count();
      return res.status(200).json({ data: stores, count });
    } catch (error) {
      next(error);
    }
  },
  // searchDeleted
  async searchDeleted(req, res, next) {
    try {
      let { limit, page, ...condition } = req.body;
      if (!limit) {
        limit = 20;
      }
      if (!page) {
        page = 1;
      }
      const skip = limit * (page - 1);
      const stores = await storeModel
        .findDeleted(condition)
        .skip(skip)
        .limit(limit)
        .populate("deletedBy");
      const count = await storeModel.findDeleted(condition).count();
      return res.status(200).json({ data: stores, count });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = storeController;
