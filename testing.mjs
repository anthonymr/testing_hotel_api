import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1/';
const loginEndpoint = 'authentication';
const roomsEndpoint = 'rooms';
const usersEndpoint = 'users';

async function login(username, password) {
  return await axios.post(baseURL + loginEndpoint, {username, password});
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

// Login
const { data: { token } } = await login('antmartin', 'newpassword2')

// Geat all rooms
// const { data: rooms } = await getAllRooms(token)

// Get room by id
// const { data: room } = await getRoom(token, 1)

// Create room
// const response = await createRoom(token, 'Room 2', 'Room 2 description', 100, 50, 15, 5)

// Delete room
// const response = await deleteRoom(token, 6)

// Get current user info
//const { data: user } = await getCurrentUserInfo(token)

// Change user password
//const { data: user } = await changeUserPassword(token, 'newpassword2')
