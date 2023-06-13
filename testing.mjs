import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1/';
const loginEndpoint = 'authentication';
const roomsEndpoint = 'rooms';
const usersEndpoint = 'users';
const hotelsEndpoint = 'hotels';
const reservationsEndpoint = 'reservations';

async function login(username, password) {
  return await axios.post(baseURL + loginEndpoint, {username, password});
}

async function logout(token) {
  return await axios.delete(baseURL + loginEndpoint, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

async function getAllRooms(token) {
  return await axios.get(baseURL + roomsEndpoint, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

async function getRoom(token, id) {
  return await axios.get(`${baseURL}${roomsEndpoint}/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
}

async function createRoom(token, name, description, full_price, reservation_price, reservation_fee, rating) {
  return await axios.post(`${baseURL}${roomsEndpoint}`, {
    name,
    description,
    full_price,
    reservation_price,
    reservation_fee,
    rating,
  }, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}


async function deleteRoom(token, id) {
  return await axios.delete(`${baseURL}${roomsEndpoint}/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

async function getCurrentUserInfo(token) {
  return await axios.get(`${baseURL}${loginEndpoint}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

async function changeUserPassword(token, password) {
  return await axios.patch(`${baseURL}${usersEndpoint}`, { password }, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

async function getAllHotels(token) {
  return await axios.get(`${baseURL}${hotelsEndpoint}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

async function createReservation(token, userId, roomId, hotelId, startDate, endDate) {
  return await axios.post(
    `${baseURL}${reservationsEndpoint}`,
    {
      user_id: userId,
      room_id: roomId,
      hotel_id: hotelId,
      start_date: startDate,
      end_date: endDate,
    }, 
    {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }
  );
}

async function getAllReservations(token) {
  return await axios.get(`${baseURL}${reservationsEndpoint}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

async function getReservation(token, id) {
  return await axios.get(`${baseURL}${reservationsEndpoint}/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

async function deleteReservation(token, id) {
  return await axios.delete(`${baseURL}${reservationsEndpoint}/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  });
}

// Login
const { data: { token } } = await login('antmartin', 'newpassword2')

// Geat all rooms
const { data: rooms } = await getAllRooms(token)
console.log(`GET ${baseURL}${roomsEndpoint}:`)
console.log(rooms)

// Get room by id
const { data: room } = await getRoom(token, 7)
console.log(`GET ${baseURL}${roomsEndpoint}/7:`)
console.log(room)

// Create room
// const { data: newRoom } = await createRoom(token, 'Room 2', 'Room 2 description', 100, 50, 15, 5)
// console.log(newRoom)

// Delete room
// const { data: deletedRoom } = await deleteRoom(token, newRoom.id)
// console.log(deletedRoom)

// Get current user info
const { data: user } = await getCurrentUserInfo(token)
console.log(`GET ${baseURL}${loginEndpoint}:`)
console.log(user)

// Change user password
const { data: newUser } = await changeUserPassword(token, 'newpassword2')
console.log(`PATCH ${baseURL}${usersEndpoint}:`)
console.log(newUser)

// Get all hotels
const { data: hotels } = await getAllHotels(token)
console.log(`GET ${baseURL}${hotelsEndpoint}:`)
console.log(hotels)

// Create reservation
const { data: newReservation } = await createReservation(token, 1, 7, 1, '2021-01-01', '2021-01-02')
console.log(`POST ${baseURL}${reservationsEndpoint}:`)
console.log(newReservation)

// Get all reservations
const { data: reservations } = await getAllReservations(token)
console.log(`GET ${baseURL}${reservationsEndpoint}:`)
console.log(reservations)

// Get one reservation
const { data: reservation } = await getReservation(token, newReservation.id)
console.log(`GET ${baseURL}${reservationsEndpoint}/${newReservation.id}:`)
console.log(reservation)

// Delete reservation
const { data: deletedReservation } = await deleteReservation(token, reservation.id)
console.log(`DELETE ${baseURL}${reservationsEndpoint}/${reservation.id}:`)
console.log(deletedReservation)

// Logout
await logout(token)
