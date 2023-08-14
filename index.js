const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  //Take unix time and convert into UTC *apparently
  let time = passTimes.risetime;
  let date = new Date(time * 1000);

  // success, print out the deets!
  console.log(`Next pass at ${date} for ${passTimes.duration} seconds!`);
});