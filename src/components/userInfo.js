

export class UserInfo {
    constructor({infUserName, infUserDescription}, getUserInoCallback) {
        this.infUserName = document.querySelector(infUserName);
        this.infUserDescription = document.querySelector(infUserDescription);
        this.getUserInoCallback = getUserInoCallback;
        this.name = "";
        this.description = "";
    }

    getUserInfo(){
        return this.getUserInoCallback()
        .then((result) => {
            this.name = result.userName;
            this.description = result.userDescription;
        })
        
    }

    setUserInfo(){
        this.infUserName.textContent = this.name;
        this.infUserDescription.textContent = this.description;
    }
}

