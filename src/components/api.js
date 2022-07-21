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
    }
    
    
    loadCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
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
    }
    
    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({
                id: cardId
            })
        })
    };
    
    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify({
                id: cardId
            })
        })
    };
    
    deleteLikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({
                id: cardId
            })
        })
    };
    
    saveEditAvatar(linkAvatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: linkAvatar
            })
        })
    }
  }
  
  






