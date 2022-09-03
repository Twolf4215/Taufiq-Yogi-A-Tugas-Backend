const TodoController = require("./controller/ArtikelController");

const _routes = [
    ['/artikel', TodoController]
]

const routes = (app) => {
    _routes.forEach((route) => {
        const [ url, controller ] = route
        app.use(`/api${url}`, controller)
    });
}

module.exports = routes