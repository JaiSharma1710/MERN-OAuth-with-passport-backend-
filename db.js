const mongoose = require('mongoose');

const connect_DB = async () => {
  const DB = process.env.MONGO_URI.replace(
    '<password>',
    process.env.MONGO_PASSWORD,
  );

  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('connection was successful');
  } catch (err) {
    console.log('not able to connect with db', err);
    process.exit(1);
  }
};

module.exports = connect_DB;
