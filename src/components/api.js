const config = {
    baseUrl: 'http://localhost:3001',
    headers: {
        authorization: '15612dfc-e819-4f89-bf79-39ea6734df41',
        'Content-Type': 'application/json'
    }
};

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

export function loadUserData() {
   return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
}


export function loadCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
};

export function saveEditProfile(nameProfile, infProfile) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameProfile,
            about: infProfile
        })
    })
};

export function saveNewCard(nameCard, linkImageCard) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: nameCard,
            link: linkImageCard
        })
    })
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
        body: JSON.stringify({
            id: cardId
        })
    })
};

export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
        body: JSON.stringify({
            id: cardId
        })
    })
};

export function deleteLikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
        body: JSON.stringify({
            id: cardId
        })
    })
};

export function saveEditAvatar(linkAvatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: linkAvatar
        })
    })
}

