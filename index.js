const express = require('express');
const app = express();

app.get("/", function(req, res, next) {
    res.send({ hello: "Mundo Mundial" });
});

const server = app.listen(8000, () => {
    console.log(`Listening http://localhost:${server.address().port}`);
});