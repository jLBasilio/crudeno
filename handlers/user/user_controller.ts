import {
  getUsersService,
  findUserByIdService,
  addUserService,
  deleteUserService,
  updateUserService,
} from './user_service.ts';


const getUsers = async (
  { response } :
  { response: any }
) => {
  const users = await getUsersService();
  response.status = 200;
  response.body = {
    status: 200,
    message: 'Successfully fetched users',
    data: users,
  };
}


const findUserById = async (
  { params: { id }, response } :
  { params: { id: string }, response: any }
) => {
  const user = await findUserByIdService(id);
  if (!user) {
    response.status = 404;
    response.body = {
      status: 404,
      message: 'User not found',
    };
    return;
  }

  response.status = 200;
  response.body = {
    status: 200,
    message: 'Successfully fetched user',
    data: user,
  };
}


const addUser = async (
  { request, response } :
  { request: any, response: any }
) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      status: 400,
      message: 'Missing user data'
    };
    return;
  }

  const { value: { firstName, lastName, description } } = await request.body();
  if (!(firstName && lastName && description)) {
    response.status = 400;
    response.body = {
      status: 400,
      message: 'Invalid user data',
    };
    return;
  }

  const id = await addUserService({ firstName, lastName, description });
  response.status = 201;
  response.body = {
    status: 201,
    message: 'Successfully created user',
    data: id,
  }
}


const deleteUserById = async (
  { params: { id }, response }:
  { params: { id: string }; response: any }
) => {
  const existingUser = await findUserByIdService(id);
  if (!existingUser) {
    response.status = 404;
    response.body = {
      status: 404,
      message: 'User not found',
    };
    return;
  }

  await deleteUserService(id);
  response.status = 200;
  response.body = {
    status: 200,
    message: 'Successfully deleted user',
  };
};


const updateUserById = async (
  { params: { id }, request, response } :
  { params: { id: string }, request: any, response: any }
) => {
  const existingUser = await findUserByIdService(id);
  if (!existingUser) {
    response.status = 404;
    response.body = {
      status: 404,
      message: 'User not found',
    };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      status: 400,
      message: 'Missing user data',
    };
    return;
  }

  const { value: { firstName, lastName, description } } = await request.body();
  if (!(firstName && lastName && description)) {
    response.status = 400;
    response.body = {
      status: 400,
      message: 'Invalid user data',
    };
    return;
  }

  await updateUserService({ id, firstName, lastName, description });
  response.status = 200;
  response.body = {
    status: 200,
    message: 'Successfully updated user',
  };
};


export {
  getUsers,
  findUserById,
  addUser,
  deleteUserById,
  updateUserById
}
