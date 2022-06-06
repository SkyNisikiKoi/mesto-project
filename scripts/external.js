//Попап редактирование имени

const body = document.querySelector(".preload");

body.classList.remove('preload');


const btn = document.querySelector(".profile__button-redaction");
const unShadow = document.querySelector('.modal-window__buttons-exit');

btn.addEventListener('click', function () {
  open('.shadow');
}
);

unShadow.addEventListener('click', function () {
  close('.shadow');
}
);

function open(divName) {
  let shadow = document.querySelector(divName);
  shadow.classList.add("shadow_show")
};

function close(divName) {
  let shadow = document.querySelector(divName);
  shadow.classList.remove("shadow_show")
};

//Попап добавление фото

const btnPlus = document.querySelector(".profile__button-plus");
const unShadowPlus = document.querySelector('.modal-window__buttons-exit_plus');

btnPlus.addEventListener('click', function () {
  open('.shadow_plus');

}
);

unShadowPlus.addEventListener('click', function () {
  close('.shadow_plus');
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
const modalImageEx = document.querySelector(".popup__buttons-exit");


const handleClickImage = function (src, alt) {
  modalPic.src = src;
  let shadow = document.querySelector(".popup__shadow");
  let modalText = document.querySelector(".popup__text");
  shadow.classList.add("popup__shadow-show");
  modalText.textContent = alt;
};


modalImageEx.addEventListener('click', function () {

  let shadow = document.querySelector(".popup__shadow")
  shadow.classList.remove("popup__shadow-show")
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
  // cardImage.addEventListener('click', function (data) {

  //   handleClickImage(data.target.src, data.target.alt);
  // });

  const btnlike = cardElement.querySelector(".card__button");

  btnlike.addEventListener('click', function () {
    btnlike.classList.toggle("card__button_active");

  });


  const btnDelete = cardElement.querySelector(".card__basket");
  btnDelete.addEventListener('click', function () {
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
const formPlus = modalPlus.querySelector(".form_plus");

formPlus.addEventListener('submit', function (e) {
  e.preventDefault();
  const textTitle = modalPlus.querySelector("#textTitle");
  const textLink = modalPlus.querySelector("#textLink");

  const data = {
    text: textTitle.value,
    img: textLink.value
  };

  renderCard(data, cardList);

  let shadowPlus = document.querySelector(".shadow_plus");
  shadowPlus.classList.remove("shadow_show");


});

//редактирование формы

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const editForm = document.querySelector('.form');

const textName = editForm.querySelector("#textName");
const textDescription = editForm.querySelector("#textDescription");

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  profileTitle.textContent = textName.value;
  profileSubtitle.textContent = textDescription.value;


  let shadow = document.querySelector(".shadow");
  shadow.classList.remove("shadow_show")

});


