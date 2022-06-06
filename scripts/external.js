//Попап редактирование имени

const preload = document.querySelector(".preload");
preload.classList.remove('preload');


const profileButtonRedaction = document.querySelector(".profile__button-redaction");
const modalWindowButtonsExit = document.querySelector('.modal-window__buttons-exit');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editProfileForm = document.querySelector('.form');

const textName = editProfileForm.querySelector("#textName");
const textDescription = editProfileForm.querySelector("#textDescription");

const popupShadow = document.querySelector(".popup__shadow");
const popupText = document.querySelector(".popup__text");

const profilePopup = document.querySelector(".shadow");

profileButtonRedaction.addEventListener('click', function () {
  openPopup('.shadow');
  textName.value = profileTitle.textContent;
  textDescription.value = profileSubtitle.textContent;
}
);

modalWindowButtonsExit.addEventListener('click', function () {
  closePopup('.shadow');
}
);

function openPopup(divName) {
  const shadowPopup = document.querySelector(divName);
  shadowPopup.classList.add("shadow_show")
};

function closePopup(divName) {
  const shadowPopup = document.querySelector(divName);
  shadowPopup.classList.remove("shadow_show")
};

//Попап добавление

const addCardButton = document.querySelector(".profile__button-plus");
const exitButtonCardPopup = document.querySelector('.modal-window__buttons-exit_plus');

addCardButton.addEventListener('click', function () {
  openPopup('.shadow_plus');

}
);

exitButtonCardPopup.addEventListener('click', function () {
  closePopup('.shadow_plus');
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


const handleClickImage = function (src, alt) {
  modalPic.src = src;
  popupShadow.classList.add("popup__shadow-show");
  popupText.textContent = alt;
};


exitButtonModalPic.addEventListener('click', function () {
  popupShadow.classList.remove("popup__shadow-show")
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
const addCardPopup = document.querySelector(".modal-window_plus");
const addCardForm = addCardPopup.querySelector(".form_plus");

addCardForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const textTitle = addCardPopup.querySelector("#textTitle");
  const textLink = addCardPopup.querySelector("#textLink");

  const data = {
    text: textTitle.value,
    img: textLink.value
  };

  renderCard(data, cardList);

  const addCardShadowPopup = document.querySelector(".shadow_plus");
  addCardShadowPopup.classList.remove("shadow_show");



});

//редактирование профиля

editProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  profileTitle.textContent = textName.value;
  profileSubtitle.textContent = textDescription.value;

  profilePopup.classList.remove("shadow_show")
});


