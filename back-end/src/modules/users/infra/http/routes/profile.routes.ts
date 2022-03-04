import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

const profileController = new ProfileController();

profileRouter.get('/', profileController.show);
profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password')),
  }
}), profileController.update);

export default profileRouter;
