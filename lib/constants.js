const Roles = Object.freeze({
    Tpo: 'tpo',
    Teacher: 'teacher',
    Student: 'student',
});

const Secrets = Object.freeze({
    Jwt: 'secret',
});

const Server = Object.freeze({
    Port: 5000,
});

module.exports = { Roles, Secrets, Server };
