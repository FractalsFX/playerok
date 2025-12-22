const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = 8000;

// Настройка CORS для разрешения запросов с фронтенда
app.use(cors({
  origin: 'http://localhost:3000', // Порт фронтенда из vite.config.js
  credentials: true
}));

app.use(bodyParser.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
