class User {
    constructor(name) {
        this.name = name;
        this.isAdmin = false;
    }
}

const user = new User("영규");

console.log(user);