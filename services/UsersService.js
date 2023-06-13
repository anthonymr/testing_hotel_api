const usersResources = 'users';

const UsersService = {
  create(name, username, password, email) {
    return Service.post(usersResources, {name, username, password, email});
  },
  changePassword(token, password) {
    return Service.patch(usersResources, { password }, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  }
}