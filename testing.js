async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

async function testAPI() {
  // Login
  const { data: { token } } = await AuthenticationService.login('admin', 'admin')
  console.log(token)

  try {
    // Create room
    const base64 = await fileToBase64(document.getElementById('file').files[0])
    const { data: newRoom } = await RoomsService.create(token, 'Room 2', 'Room 2 description', 100, 50, 15, 5, base64)
    console.log(newRoom)

    // Geat all rooms
    const { data: rooms } = await RoomsService.all(token)
    console.log(rooms)

    // Create room to be deleted
    const { data: roomToBeDeleted } = await RoomsService.create(token, 'Room 2', 'Room 2 description', 100, 50, 15, 5, base64)
    console.log(roomToBeDeleted)

    // Get room by id
    const { data: room } = await RoomsService.find(token, rooms[0].id)
    console.log(room)

    // Delete room
    const { data: deletedRoom } = await RoomsService.delete(token, roomToBeDeleted.id)
    console.log(deletedRoom)

    // Get current user info
    const { data: user } = await AuthenticationService.getSessionInfo(token)
    console.log(user)

    // Change user password
    const { data: newUser } = await UsersService.changePassword(token, 'admin')
    console.log(newUser)

    // Get all hotels
    const { data: hotels } = await HotelsService.all(token)
    console.log(hotels)

    // Create reservation
    const { data: newReservation } = await ReservationsService.create(token, rooms[0].id, hotels[0].id, '2030-01-01', '2030-01-02')
    console.log(newReservation)

    // Get all reservations
    const { data: reservations } = await ReservationsService.all(token)
    console.log(reservations)

    // Get one reservation
    const { data: reservation } = await ReservationsService.find(token, newReservation.id)
    console.log(reservation)

    // Delete reservation
    const { data: deletedReservation } = await ReservationsService.delete(token, reservation.id)
    console.log(deletedReservation)

    // Logout
    const logotResult = await AuthenticationService.logout(token)
    if (logotResult.status === 200) console.log('Logout successful')
  } catch (error) {
    console.log(error)
    // Logout
    if (token) {
      const logotResult = await AuthenticationService.logout(token)
      if (logotResult.status === 200) console.log('Logout successful')
    }
  }
}
