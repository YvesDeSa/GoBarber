import { request, response, Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateService = new UpdateUserAvatarService();

    const user = await updateService.execute({
      user_id: request.user.id,
      avatarFileName: request.file?.filename,
    });

    delete user.password;

    return response.json(user);
})

export default usersRouter;
