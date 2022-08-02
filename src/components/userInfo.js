export class UserInfo {
    constructor({infUserName, infUserDescription, userAvatarSelector }, getUserInoCallback) {
        this.infUserName = document.querySelector(infUserName),
        this.infUserDescription = document.querySelector(infUserDescription),
        this.userAvatar = document.querySelector(userAvatarSelector),
        this.getUserInoCallback = getUserInoCallback,
        this.name = "",
        this.description = ""
    }

    getUserInfo(){
        return this.getUserInoCallback()
        .then((result) => {
            this.name = result.name;
            this.description = result.about;
            return result;
        }) 
    }

    setUserInfo({ name, about, avatar, _id}){
        this.infUserName.textContent = name;
        this.infUserDescription.textContent = about;
        this.userAvatar.setAttribute('src', avatar);
        this.userId = _id;
    }
}

