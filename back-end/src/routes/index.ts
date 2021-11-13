import { Router } from 'express';
import appointmentRouter from '../routes/appointments.routes';
import usersRouter from '../routes/users.routes';


const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);

export default routes;
