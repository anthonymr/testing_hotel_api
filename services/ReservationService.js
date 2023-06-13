const reservationsResource = 'reservations';

const ReservationsService = {
  create(token, user_id, room_id, hotel_id, start_date, end_date) {
    return Service.post(reservationsResource, {
      user_id,
      hotel_id,
      room_id,
      start_date,
      end_date
    }, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  },
  all(token) {
    return Service.get(reservationsResource, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  },

  find(token, id) {
    return Service.get(`${reservationsResource}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  },

  delete(token, id) {
    return Service.delete(`${reservationsResource}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  }
}