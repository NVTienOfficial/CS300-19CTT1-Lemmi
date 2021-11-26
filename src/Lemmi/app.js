const Express = require('express');
const sequelize = require('./config/database');
const routes = require('./routes/route');

var app = Express();

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

app.get("/", (req, res) => {
    try {
        res.status(200).send("Lemmi site");
    }
    catch (err) {
        res.status(200).send(err);
    }
});