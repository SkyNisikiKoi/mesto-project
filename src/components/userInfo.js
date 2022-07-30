

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
            this.name = result.userName;
            this.description = result.userDescription;
        })
        
    }


    
    setUserInfo({ name, about, avatar}){
        this.infUserName.textContent = name;
        this.infUserDescription.textContent = about;
        this.userAvatar.setAttribute('src', avatar);
    }
}

