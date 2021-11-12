import { Router } from 'express';
import appointmentRouter from '../routes/appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);

export default routes;
