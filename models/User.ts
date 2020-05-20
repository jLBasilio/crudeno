interface User {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
};

const mapUser = (user: Array<number | string>): User => ({
  id: user[0] as number,
  firstName: user[1] as string,
  lastName: user[2] as string,
  description: user[3] as string,
});

export {
  User,
  mapUser,
}
