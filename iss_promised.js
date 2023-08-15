const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
  fetchedIp = JSON.parse(body);
  return request(`http://ipwho.is/${fetchedIp.ip}`);
};

const fetchISSFlyOverTimes = function (body) {
  fetchedCoords = JSON.parse(body);
  const { latitude, longitude } = fetchedCoords;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
}

module.exports = { nextISSTimesForMyLocation };
