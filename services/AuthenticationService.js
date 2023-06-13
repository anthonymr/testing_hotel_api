const authenticationResource = 'authentication';

const AuthenticationService = {
  login(username, password) {
    return Service.post(authenticationResource, {username, password});
  },
  
  logout(token) {
    return Service.delete(authenticationResource, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },

  getSessionInfo(token) {
    return Service.get(authenticationResource, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  }
}