const redis = require('redis');

const redisClient = redis.createClient(6379);

async function redisConnect() {
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  await redisClient.connect();
}

redisClient.on('connect', function () {
  console.log(`connected to redis`);
});

module.exports = {
  redisClient,
  redisConnect,
};
