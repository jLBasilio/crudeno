import { Router } from 'https://deno.land/x/oak/mod.ts';
import {
  getUsers,
  findUserById,
  addUser,
  deleteUserById,
  updateUserById,
} from './handlers/user/user_controller.ts';


const router = new Router();
router
  .get('/users', getUsers)
  .get('/users/:id', findUserById)
  .post('/users', addUser)
  .delete('/users/:id', deleteUserById)
  .put('/users/:id', updateUserById);

export default router;
