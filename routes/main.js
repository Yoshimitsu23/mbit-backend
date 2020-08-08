const express = require('express');
const router = express.Router();
const axios = require('axios');
const request = require('request');



const url = "https://msbit-exam-products-store.firebaseio.com/deliveryProducts/products.json";

router.get('/', async (req, res) => {
    axios.get(url)
        .then(data => res.json(data.data));

});

router.get('/status1', async (req, res) => {

    let validProds = [];
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);

            body.map(item => {
                if (item.status != 0) {
                    (item.type == 1 ? item = item.fedex : item = item);
                    (item.type == 2 ? item = item.ups[ 0 ] : item = item);
                    let newProd =
                    {
                        'id': item.id,
                        'name': item.name,
                        'description': item.description,
                        'url': item.thumbnailUrl
                    };
                    validProds.push(newProd);
                }
            });
            res.json(validProds);
        }
    })
});
module.exports = router;

