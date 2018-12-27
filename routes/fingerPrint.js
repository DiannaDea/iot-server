const router = require('koa-joi-router');
const mongoose = require('mongoose');

const FingerPrint = require('../models/FingerPrint');

const fingerPrintRouter = router();
const { Joi } = router;

fingerPrintRouter.prefix('/api/fingerprint');

const createFingerPrint = async (ctx) => {
  try {
    const fingerPrint = await FingerPrint.create({
      _id: new mongoose.Types.ObjectId(),
      ...ctx.request.body,
    });

    return (fingerPrint) ? ctx.send(200) : ctx.send(204);
  } catch (error) {
    return ctx.send(500, error);
  }
};

const getFingerPrints = async (ctx) => {
  const { email, hash } = ctx.query;

  try {
    const fingerprint = await FingerPrint.findOne({
      email, hash
    });

    if (!fingerprint) {
        const fingePrintWithEmail = await FingerPrint.findOne({
            email
        });

        if (fingePrintWithEmail) {
            const addedFingerPrint = await FingerPrint.create({
                _id: new mongoose.Types.ObjectId(),
                email, hash,
                userId: 'dldlkfkfkf',
            });

            return (addedFingerPrint)
                ? ctx.send(200)
                : ctx.send(204);
        }
        return ctx.send(204);
    }
    return ctx.send(200);
  } catch (error) {
    return ctx.send(500, error);
  }
};

fingerPrintRouter.route({
  method: 'post',
  path: '/',
  validate: {
      body: {
          hash: Joi.string().alphanum().required(),
          userId: Joi.string().alphanum().min(1).max(30).required(),
          email: Joi.string().email(),
      },
      type: 'json',
  },
  handler: createFingerPrint,
});

fingerPrintRouter.route({
  method: 'get',
  path: '/',
  validate: {
      query: {
          hash: Joi.string().alphanum().required(),
          email: Joi.string().email(),
      },
  },
  handler: getFingerPrints,
});

module.exports = fingerPrintRouter;
