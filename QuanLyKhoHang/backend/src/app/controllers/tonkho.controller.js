const createError = require("http-errors");
const soKhoModel = require("../models/soKho.model");
const vatTuModel = require("../models/vatTu.model");
const khoModel = require("../models/kho.model");

const tonKhoController = {
  async checkVatTu(ma_vt, next) {
    let error = false;
    try {
      if (!ma_vt) {
        error = true;
        next(createError(400, "Không xác định được hàng hóa"));
      }
      const vatTu = await vatTuModel.findOne({ ma_vt });
      if (!vatTu) {
        error = true;
        next(createError(404, `Hàng hóa '${ma_vt}' không tồn tại`));
      }
    } catch (error) {
      next(error);
    } finally {
      return error;
    }
  },
  async getTotalInventory(req, res, next) {
    try {
      const { ma_vt } = req.body;
      const isError = await tonKhoController.checkVatTu(ma_vt, next);
      if (isError) {
        return;
      }
      const existed = await soKhoModel.findOne({ ma_vt });
      if (!existed) {
        return res.status(200).json({ tong_ton_kho: 0 });
      }
      const tonKho = await soKhoModel.aggregate([
        {
          $match: { ma_vt },
        },
        {
          $sort: { ngay_ct: -1 },
        },
        {
          $group: {
            _id: { ma_kho: "$ma_kho" },
            ton_cuoi: { $first: "$ton_cuoi" },
          },
        },
        { $group: { _id: null, tong_ton_kho: { $sum: "$ton_cuoi" } } },
        { $project: { _id: 0, tong_ton_kho: 1 } },
      ]);
      return res.status(200).json(tonKho[0]);
    } catch (error) {
      next(error);
    }
  },
  async getDetailInventory(req, res, next) {
    try {
      const { ma_vt } = req.body;
      const isError = await tonKhoController.checkVatTu(ma_vt, next);
      if (isError) {
        return;
      }
      const existed = await soKhoModel.findOne({ ma_vt });
      if (!existed) {
        return res.status(200).json([]);
      }
      const tonKho = await soKhoModel.aggregate([
        {
          $match: { ma_vt },
        },
        {
          $sort: { ngay_ct: -1 },
        },
        {
          $group: {
            _id: { ma_kho: "$ma_kho" },
            ten_kho: { $first: "$ten_kho" },
            ton_cuoi: { $first: "$ton_cuoi" },
          },
        },
        {
          $project: {
            _id: 0,
            ma_kho: "$_id.ma_kho",
            ten_kho: "$ten_kho",
            ton_kho: "$ton_cuoi",
          },
        },
      ]);
      return res.status(200).json(tonKho);
    } catch (error) {
      return next(error);
    }
  },
  async getInventoryOnStore(req, res, next) {
    try {
      const { ma_vt, ma_kho } = req.body;
      if (!ma_kho) {
        return next(createError(400, "Không xác định được kho"));
      }
      const kho = await khoModel.findOne({ ma_kho });
      if (!kho) {
        return next(createError(400, `Kho '${ma_kho}' không tồn tại`));
      }
      const isError = await tonKhoController.checkVatTu(ma_vt, next);
      if (isError) {
        return;
      }
      const existed = await soKhoModel.findOne({ ma_vt });
      if (!existed) {
        return res.status(200).json({ ton_cuoi: 0 });
      }
      const tonKho = await soKhoModel
        .findOne({ ma_kho, ma_vt })
        .sort({ ngay_ct: -1 })
        .select(["-_id", "ton_cuoi"]);
      return res.status(200).json(tonKho);
    } catch (error) {
      return next(error);
    }
  },
};
module.exports = tonKhoController;
