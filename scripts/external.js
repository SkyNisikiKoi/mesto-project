//Попап редактирование имени

const preload = document.querySelector(".preload");
preload.classList.remove('preload');


const profileButtonRedaction = document.querySelector(".profile__button-redaction");
const modalWindowButtonExit = document.querySelector('.modal-window__buttons-exit');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editProfileForm = document.querySelector('.form');

const textName = editProfileForm.querySelector("#textName");
const textDescription = editProfileForm.querySelector("#textDescription");

const popupText = document.querySelector(".popup__text");

const profilePopup = document.querySelector(".shadow");
const imagePopup = document.querySelector(".popup__shadow");
const addCardPopup = document.querySelector(".shadow_plus");

const textTitle = addCardPopup.querySelector("#textTitle");
const textLink = addCardPopup.querySelector("#textLink");

profileButtonRedaction.addEventListener('click', function () {
  openPopup(profilePopup);
  textName.value = profileTitle.textContent;
  textDescription.value = profileSubtitle.textContent;
}
);

modalWindowButtonExit.addEventListener('click', function () {
  closePopup(profilePopup);
}
);

function openPopup(popup) {
  popup.classList.add("shadow_show")
};

function closePopup(popup) {
  popup.classList.remove("shadow_show")
};

//Попап добавление

const addCardButton = document.querySelector(".profile__button-plus");
const exitButtonCardPopup = document.querySelector('.modal-window__buttons-exit_plus');

addCardButton.addEventListener('click', function () {
  openPopup(addCardPopup);
  textTitle.value = '';
  textLink.value = '';
}
);

exitButtonCardPopup.addEventListener('click', function () {
  closePopup(addCardPopup);
}
);

//cards

const cardsOld = [
  {
    text: 'Карачаевск',
    img: "./images/kirill-pershin-1088404-unsplash.png"
  },
  {
    text: "Гора Эльбрус",
    img: "./images/kirill-pershin-1404681-unsplash.png"
  },
  {
    text: "Домбай",
    img: "./images/kirill-pershin-1556355-unsplash.png"
  },
  {
    text: "Гора Эльбрус",
    img: "./images/kirill-pershin-1404681-unsplash.png"
  },
  {
    text: "Домбай",
    img: "./images/kirill-pershin-1556355-unsplash.png"
  },
  {
    text: "Карачаево-Черкесия",
    img: "./images/kirill-pershin-1088404-unsplash.png"
  }
];

const cardList = document.querySelector(".elements");
const cardsTemplate = document.querySelector("#card-template").content.querySelector('.card')


const modalPic = document.querySelector(".popup__image");
const exitButtonModalPic = document.querySelector(".popup__buttons-exit");

// попап изображения
const handleClickImage = function (src, alt) {
  modalPic.src = src;
  modalPic.alt = alt;
  openPopup(imagePopup);;
  popupText.textContent = alt;
};


exitButtonModalPic.addEventListener('click', function () {
  closePopup(imagePopup);
}
);

const createCard = function (data) {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardText = cardElement.querySelector('.card__text');

  cardImage.src = data.img;
  cardText.textContent = data.text;
  cardImage.setAttribute('alt', data.text)

  cardImage.addEventListener('click', () => handleClickImage(data.img, data.text));

  const buttonLike = cardElement.querySelector(".card__button");

  buttonLike.addEventListener('click', function () {
    buttonLike.classList.toggle("card__button_active");

  });


  const buttonDelete = cardElement.querySelector(".card__basket");
  buttonDelete.addEventListener('click', function () {
    cardElement.remove();
  });
  return cardElement;
}

const renderCard = function (data, container) {
  const newCard = createCard(data);
  container.prepend(newCard);
};

cardsOld.forEach(function (item) {
  renderCard(item, cardList);
});


//добавление карточки
const addCardForm = addCardPopup.querySelector(".form_plus");

addCardForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    text: textTitle.value,
    img: textLink.value
  };

  renderCard(data, cardList);

  closePopup(addCardPopup);


});

//редактирование профиля

editProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  profileTitle.textContent = textName.value;
  profileSubtitle.textContent = textDescription.value;

  closePopup(profilePopup);
});


