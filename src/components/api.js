export class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl,
      this.headers = options.headers
    }
  
    checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    };
    
    loadUserData() {
       return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this.checkResponse)
    }
    
    
    loadCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this.checkResponse)
    };
    
    saveEditProfile(nameProfile, infProfile) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: nameProfile,
                about: infProfile
            })
        })
        .then(this.checkResponse)
    };
    
    saveNewCard(nameCard, linkImageCard) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: nameCard,
                link: linkImageCard
            })
        })
        .then(this.checkResponse)
    }
    
    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({
                id: cardId
            })
        })
        .then(this.checkResponse)
    };
    
    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify({
                id: cardId
            })
        })
        .then(this.checkResponse)
    };
    
    deleteLikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({
                id: cardId
            })
        })
        .then(this.checkResponse)
    };
    
    saveEditAvatar(linkAvatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: linkAvatar
            })
        })
        .then(this.checkResponse)
    }
  }
  
  






