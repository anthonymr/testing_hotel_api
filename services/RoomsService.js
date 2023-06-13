const roomsResource = 'rooms';

const RoomsService = {
  find(token, id) {
    return Service.get(`${roomsResource}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  all(token) {
    return Service.get(roomsResource, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  create(token, name, description, full_price, reservation_price, reservation_fee, rating, image) {
    return Service.post(
      roomsResource,
      {
        name,
        description,
        full_price,
        reservation_price,
        reservation_fee,
        rating,
        image,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      }
    );
  },
  delete(token, id) {
    return Service.delete(`${roomsResource}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  },
}