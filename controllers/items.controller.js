/* eslint-disable prefer-destructuring */
const ItemsTable = require('../db/models/items.model');

const getItems = async (req, res, next) => {
  try {
    // eslint-disable-next-line radix
    const page = parseInt(req.query.page);
    const limit = page ? 10 : null;
    const start = page ? (page - 1) * limit : null;
    const items = await ItemsTable.findAndCountAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      // eslint-disable-next-line object-shorthand
      limit: limit,
      offset: start,
    });
    const isItemExist = items.rows && items.rows.length > 0;
    if (!isItemExist) {
      // kalo ngga ada data, maka return status
      return res.status(404).json({
        message: 'item not found',
      });
    }
    console.log(isItemExist);
    // pagination
    const pagination = {
      currenPage: page,
      nextPage: Math.min(Math.ceil(items.count / page), page + 1),
      prevPage: Math.max(1, page - 1),
      totalPage: Math.ceil(items.count / limit),
      totalFindings: items.count,
    };

    // kalo ada data, return datanya
    return res.status(200).json({
      message: `success show item`,
      data: items.rows,
      pagination: page ? pagination : null,
    });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      codes: req.body.codes,
      total_items: req.body.total_items,
      image_product: req.body.image_product,
    };
    const searchData = await ItemsTable.findOne({
      where: { name: payload.name },
    });
    if (searchData) {
      return res.status(402).json({
        message: 'product already in database',
      });
    }
    const data = await ItemsTable.create(payload);
    res.status(201).json({
      Data: {
        id: data.id,
        name: data.name,
        codes: data.codes,
        total_items: data.total_items,
        image_product: data.image_product,
      },
      message: `success create item`,
    });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const item = await ItemsTable.findByPk(req.params.iditem);
    console.log(item);
    if (!item) {
      return res.status(400).json({
        message: 'item not found',
      });
    }
    const body = req.body;
    await item.set({ ...item, ...body });
    await item.save();
    return res.status(200).json({
      message: 'item berhasil diupdate',
      Data: {
        name: item.name,
        codes: item.codes,
        totalItems: item.total_items,
        image_product: item.image_product,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { iditem } = req.params;
    const findItem = await ItemsTable.findByPk(iditem);
    if (!findItem)
      return res.status(400).json({
        message: 'item not found',
      });
    await ItemsTable.destroy({ where: { id: iditem } });
    res.status(200).json({
      message: 'success remove items',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
