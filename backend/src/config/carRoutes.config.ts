const routes = {
  create: '/api/create-car',
  update: '/api/update-car',
  delete: '/api/delete-car/:id',
  validateLicensePlate: '/api/validate-license-plate/:licensePlate',
  validateCarLicensePlate: '/api/validate-license-plate/:id/:licensePlate',
  createImage: '/api/create-car-image',
  updateImage: '/api/update-car-image/:id',
  deleteImage: '/api/delete-car-image/:id',
  deleteTempImage: '/api/delete-temp-car-image/:image',
  getCar: '/api/car/:id/:language',
  getCars: '/api/cars/:page/:size',
  getBookingCars: '/api/booking-cars/:page/:size',
  getFrontendCars: '/api/frontend-cars/:page/:size',
  getHomeCars: '/api/home-cars',
  getMaintenance: '/api/car-maintenance',
  updateMaintenance: '/api/update-car-maintenance',
  checkCar: '/api/check-car/:id',
}

export default routes
