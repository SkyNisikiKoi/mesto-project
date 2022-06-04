//Попап редактирование имени

const body = document.querySelector(".preload");

body.classList.remove('preload');


const btn = document.querySelector(".profile__button-redaction");
const unShadow = document.querySelector('.modal-window__buttons-exit');

btn.addEventListener('click', function () {

  let shadow = document.querySelector(".shadow");
  shadow.classList.add("shadow_show")
}
);
unShadow.addEventListener('click', function () {

  let shadow = document.querySelector(".shadow");
  shadow.classList.remove("shadow_show")
}
);

//Попап добавление фото

const btnPlus = document.querySelector(".profile__button-plus");
const unShadowPlus = document.querySelector('.modal-window__buttons-exit_plus');

btnPlus.addEventListener('click', function () {

  let shadowPlus = document.querySelector(".shadow_plus");
  shadowPlus.classList.add("shadow_show")
}
);

unShadowPlus.addEventListener('click', function () {

  let shadowPlus = document.querySelector(".shadow_plus");
  shadowPlus.classList.remove("shadow_show");
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
const CardsTemplate = document.querySelector("#card-template").content.querySelector('.card')


const modalPic = document.querySelector(".popup__image");
const modalImageEx = document.querySelector(".popup__buttons-exit");


const handleClickImage = function (data) {
  modalPic.src = data.src;
  let shadow = document.querySelector(".popup__shadow");
  let modalText = document.querySelector(".popup__text");
  shadow.classList.add("popup__shadow-show");
  modalText.textContent = data.alt;
};


modalImageEx.addEventListener('click', function () {

  let shadow = document.querySelector(".popup__shadow")
  shadow.classList.remove("popup__shadow-show")
}
);

const createCard = function (data) {
  const cardElement = CardsTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardText = cardElement.querySelector('.card__text');

  cardImage.src = data.img;
  cardText.textContent = data.text;
  cardImage.setAttribute('alt', data.text)

  cardImage.addEventListener('click', function (data) {

    handleClickImage(data.target);
  });

  const btnlike = cardElement.querySelector(".card__button");

  btnlike.addEventListener('click', function (data) {
    if (btnlike.classList.contains("card__button_active")) {
      btnlike.classList.remove("card__button_active")
    } else {
      btnlike.classList.add("card__button_active")
    };
  });


  const btnDelete = cardElement.querySelector(".card__basket");
  btnDelete.addEventListener('click', function (data) {
    cardElement.remove();
  });

  return cardElement;
}

const renderCard = function (data, container) {
  const newcard = createCard(data);
  container.prepend(newcard);
};

cardsOld.forEach(function (item) {
  renderCard(item, cardList);
});


//добавление карточки
const modalPlus = document.querySelector(".modal-window_plus");
const btnSave = modalPlus.querySelector(".form__button-save");

btnSave.addEventListener('click', function () {

  const modalInputs = modalPlus.querySelectorAll(".form__item");
  const modalName = modalInputs[0].value;
  const modallink = modalInputs[1].value;

  const data = {
    text: modalName,
    img: modallink
  };

  renderCard(data, cardList);

  let shadowPlus = document.querySelector(".shadow_plus");
  shadowPlus.classList.remove("shadow_show");


});

//редактирование формы

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editForm = document.querySelector('.form');

const inputContact = document.querySelectorAll('.form__item');
const btnSavePr = document.querySelector('.form__button-save')

btnSavePr.addEventListener('click', () => {

  profileTitle.textContent = inputContact[0].value;
  profileSubtitle.textContent = inputContact[1].value;


  let shadow = document.querySelector(".shadow");
  shadow.classList.remove("shadow_show")

});


