import { profileTitle } from './modal.js';
import { profileSubtitle } from './modal.js';
import { imageAvatar } from './modal.js';


function loadUserData() {
    fetch('https://mesto.nomoreparties.co/v1/plus-cohort-13/users/me', {
        method: 'GET',
        headers: {
            authorization: '15612dfc-e819-4f89-bf79-39ea6734df41'
        }
    })
        .then(res => res.json())
        .then((result) => {
            const dataUser = result;
            profileTitle.textContent = dataUser.name;
            profileSubtitle.textContent = dataUser.about;
            imageAvatar.setAttribute("src", dataUser.avatar);
            profileSubtitle.textContent = dataUser.about;
        });

}

loadUserData();

export function loadCards() {
    return fetch('https://mesto.nomoreparties.co/v1/plus-cohort-13/cards', {
        method: 'GET',
        headers: {
            authorization: '15612dfc-e819-4f89-bf79-39ea6734df41'
        }
    })
        .then(res => res.json())
        .then((result) => {
            return result;
        });
};

export function saveEditProfile(nameProfile,infProfile) {
   return fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '15612dfc-e819-4f89-bf79-39ea6734df41',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameProfile,
            about: infProfile
        })
    })
    .then(res => res.ok);
};

export function saveNewCard(nameCard, linkImageCard) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-13//cards', {
        method: 'POST',
        headers: {
            authorization: '15612dfc-e819-4f89-bf79-39ea6734df41',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameCard,
            link: linkImageCard
        })
    })
    .then(res => res.ok);
}