import { Router } from 'express';

import appointmentRouter from '../routes/appointments.routes';
import usersRouter from '../routes/users.routes';
import sessionsRouter from './sessions.routes';


const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
