import client from '../../database/client.ts';
import { User, mapUser } from '../../models/User.ts';


const queries = {
  get:
    `SELECT user_id,\
      first_name,\
      last_name,\
      description\
    FROM users`,

  findById:
    `SELECT user_id,\
      first_name,\
      last_name,\
      description\
    FROM users\
    WHERE user_id = $1`,
  
  add:
    `INSERT INTO users (\
      first_name,\
      last_name,\
      description\
    ) VALUES ($1, $2, $3)\
    RETURNING user_id`,

  delete:
    `DELETE FROM users\
    WHERE user_id = $1`,

  edit:
    `UPDATE users\
    SET first_name = $1,\
    last_name = $2,\
    description = $3
    WHERE user_id = $4`,
};

const getUsersService = async (): Promise<User[] | undefined> => {
  await client.connect();
  const { rows } = await client.query(queries.get);
  await client.end();
  const mappedUsers = rows.map(r => mapUser(r));
  return mappedUsers;
}

const findUserByIdService = async (id: string): Promise<User | null> => {
  await client.connect();
  const { rows } = await client.query({
    text: queries.findById,
    args: [id],
  });
  await client.end();
  if (!rows.length) return null;
  return mapUser(rows[0]);
}

const addUserService = async (
  { firstName, lastName, description } :
  { firstName: string, lastName: string, description: string }
) : Promise<number | undefined> => {
  await client.connect();
  const { rows: [id] } = await client.query({
    text: queries.add,
    args: [firstName, lastName, description],
  });
  await client.end();
  return id;
}

const deleteUserService = async (id: string): Promise<boolean | undefined> => {
  await client.connect();
  await client.query({
    text: queries.delete,
    args: [id],
  });
  await client.end();
  return true;
};

const updateUserService = async (
  { id, firstName, lastName, description } :
  { 
    id: string,
    firstName: string,
    lastName: string,
    description: string,
  },
): Promise<boolean | undefined> => {
  await client.connect();
  await client.query({
    text: queries.edit,
    args: [firstName, lastName, description, id],
  });
  await client.end();
  return true;
}

export {
  getUsersService,
  findUserByIdService,
  addUserService,
  deleteUserService,
  updateUserService,
}
