const hotelsResource = 'hotels';

const HotelsService = {
  all(token) {
    return Service.get(hotelsResource, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  }
}