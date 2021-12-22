const Express = require('express');
const sequelize = require('./config/database');
const routes = require('./route/route');
const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const morgan = require('morgan');
const session = require('express-session');


var app = Express();

//front-end html template engine
app.engine('ejs', engine);
if (process.env.ENV === 'dev')
    app.use(morgan('tiny'));
app.use(Express.static(path.join(__dirname, 'public')));
app.use(Express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET || 'Lemmi secret sauce',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
//

app.use(Express.json());
app.use(routes);

app.listen(process.env.PORT || 8080, async () => {
    try {
        await sequelize.authenticate();
        console.log(`Server running at http://localhost:${process.env.PORT}`);
    }
    catch (err) {
        console.log(err);
    }
});