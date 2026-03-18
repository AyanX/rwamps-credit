require('dotenv').config();
const app = require('./app');
const {createServer} = require('http');

const server = createServer(app);
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
