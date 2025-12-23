const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/users.json');

// Функция для загрузки данных из файла
function loadData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      // Проверяем, что файл не пустой
      if (data.trim().length === 0) {
        return getDefaultData();
      }
      const parsed = JSON.parse(data);
      return {
        users: parsed.users || [],
        favorites: parsed.favorites || {}
      };
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
  // Возвращаем начальные данные, если файл не существует или произошла ошибка
  return getDefaultData();
}

// Функция для получения начальных данных
function getDefaultData() {
  return {
    users: [{
      username: '333',
      password: '$2a$10$tsTeTs1ooEJltlEUfbUX1.QIQeNb7HmRuJhEhWG1e03nqqwY/CAy6'
    }],
    favorites: {}
  };
}

// Функция для сохранения данных в файл
function saveData() {
  try {
    const data = {
      users,
      favorites
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
  }
}

// Загружаем данные при инициализации модуля
let { users, favorites } = loadData();

// Сохраняем начальные данные в файл, если файл был пустым
saveData();

const User = {
  create: (username, password) => {
    const user = { username, password };
    users.push(user);
    favorites[username] = [];
    saveData(); // Сохраняем данные в файл
    return user;
  },

  find: (username) => {
    return users.find((user) => user.username === username);
  },

  addFavorite: (username, trackId) => {
    if (!favorites[username]) {
      favorites[username] = [];
    }
    if (!favorites[username].includes(trackId)) {
      favorites[username].push(trackId);
      saveData(); // Сохраняем данные в файл
    }
  },

  removeFavorite: (username, trackId) => {
    if (favorites[username]) {
      const index = favorites[username].indexOf(trackId);
      if (index > -1) {
        favorites[username].splice(index, 1);
        saveData(); // Сохраняем данные в файл
      }
    }
  },

  getFavorites: (username) => {
    console.log('User.getFavorites called with username:', username);
    console.log('Current favorites object:', JSON.stringify(favorites, null, 2));
    const result = favorites[username] || [];
    console.log('Returning:', result);
    return result;
  },
};

module.exports = User;