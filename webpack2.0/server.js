let express = require('express');

let app = express();

app.get('/api/user', (req, res) => {
    res.json({name: '11'});
});


app.listen(4000)