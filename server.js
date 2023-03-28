const app = require('./app');
const connect_DB = require('./db');

const PORT = process.env.PORT;

connect_DB();

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
