const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("Get IP worked! IP:", ip);
// });

// fetchCoordsByIP('23.17.177.105', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("Get coordinates worked!\nCoordinates:", data);
// });


// const latLong = { latitude: 51.0486151, longitude: -114.0708459 };

// fetchISSFlyOverTimes(latLong, (error, iss) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("Get ISS passes worked! ISS:", iss);
// });
