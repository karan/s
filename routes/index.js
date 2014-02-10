var redis = require('redis'),
    client = redis.createClient();

var MAX_LENGTH = 3;

client.on("error", function(err) {
    console.log(err);
})

exports.index = function(req, res){
  res.render('index', {title: 'Homepage'});
};

exports.create_short = function(req, res) {
    var long_url = req.body.long_url;
    var id = make_id(); // generate an id
    client.get(id, function(err, reply) {
        // check if key exists
        if (err) {
            res.json({'status': 'failed', 'message': err});
        } else {
            if (reply == null) {
                // key does not exists
                client.mset([
                    id, long_url,
                    id+'-created', new Date().getTime()
                    ], redis.print);
                client.lpush(id+'-hits', "");
                res.json({
                    'status': 'success', 
                    'short_id': id, 
                    'short_url': req.protocol + "://" + req.get('host') + '/' + id,
                    'long_url': long_url
                });
            } else {
                create_short();
            }
        }
    });
}

exports.find_redirect = function(req, res) {
    var id = req.params.slug;
    console.log(id);
    client.get(id, function(err, reply) {
        console.log('reply: ' + reply);
        if (err) {
            res.json({'status': 'failed', 'message': err});
        } else {
            if (reply == null) {
                // url has not been created
                res.json({'status': 'success', 'message': 'id not found'});
            } else {
                // found, return the long_url
                client.lpush(id+'-hits', new Date().getTime());
                res.redirect(reply);
            }
        }
    })
}

var make_id = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < MAX_LENGTH; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
