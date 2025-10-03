const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Данные (в памяти)
let users = [
  { 
    _id: 'me', 
    name: 'Жак-Ив Кусто', 
    about: 'Исследователь океана', 
    avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    cohort: 'cohort-13'
  }
];

let cards = [
  {
    _id: '1',
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/resources/arkhyz_1604399757.jpeg',
    owner: { _id: 'me' },
    likes: [],
    createdAt: new Date().toISOString()
  }
];

let nextCardId = 2;

// 1. ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
app.get('/users/me', (req, res) => {
  res.json(users[0]);
});

app.patch('/users/me', (req, res) => {
  const { name, about } = req.body;
  if (name) users[0].name = name;
  if (about) users[0].about = about;
  res.json(users[0]);
});

app.patch('/users/me/avatar', (req, res) => {
  const { avatar } = req.body;
  if (avatar) users[0].avatar = avatar;
  res.json(users[0]);
});

// 2. КАРТОЧКИ
app.get('/cards', (req, res) => {
  res.json(cards);
});

app.post('/cards', (req, res) => {
  const { name, link } = req.body;
  const newCard = {
    _id: String(nextCardId++),
    name,
    link,
    owner: { _id: 'me' },
    likes: [],
    createdAt: new Date().toISOString()
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

app.delete('/cards/:cardId', (req, res) => {
  const cardId = req.params.cardId;
  const cardIndex = cards.findIndex(card => card._id === cardId);
  
  if (cardIndex === -1) {
    return res.status(404).json({ message: 'Карточка не найдена' });
  }
  
  cards.splice(cardIndex, 1);
  res.json({ message: 'Карточка удалена' });
});

// 3. ЛАЙКИ
app.put('/cards/likes/:cardId', (req, res) => {
  const cardId = req.params.cardId;
  const card = cards.find(card => card._id === cardId);
  
  if (!card) {
    return res.status(404).json({ message: 'Карточка не найдена' });
  }
  
  if (!card.likes.includes('me')) {
    card.likes.push('me');
  }
  
  res.json(card);
});

app.delete('/cards/likes/:cardId', (req, res) => {
  const cardId = req.params.cardId;
  const card = cards.find(card => card._id === cardId);
  
  if (!card) {
    return res.status(404).json({ message: 'Карточка не найдена' });
  }
  
  card.likes = card.likes.filter(userId => userId !== 'me');
  res.json(card);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Mesto backend running on port ${PORT}`);
});