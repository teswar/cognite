import users from './users.json';

export const api = {
    users: {
        get: function (userId) {
            return Promise.resolve(JSON.parse(users));
        }
    },
    messages: {
        get: function (connectionId) {
            return Promise.resolve([]);
        }
    },
}