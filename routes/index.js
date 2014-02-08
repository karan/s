var redis = require('redis'),
    client = redis.createClient();

var MAX_LENGTH = 3;

client.on("error", function(err) {
    console.log(err);
})

exports.index = function(req, res){
  res.json({'status': 'success'});
};

exports.create_short = function(req, res) {
    var long_url = req.body.long_url;
    while (1) {
        var id = make_id(); // generate an id
        client.get(id, function(err, reply) {
            // check if key exists
            if (err) {
                console.log(err);
            } else {
                if (reply == null) {
                    // key does not exists
                    client.set(id, long_url);
                    res.json({
                        'status': 'success', 
                        'short_id': id, 
                        'long_url': long_url,
                        'created': new Date().getTime()
                    })
                }
            }
        })
    }
    res.render('index', { title: 'Create'});
}

var make_id = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < MAX_LENGTH; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
