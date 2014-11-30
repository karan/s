if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var client = require("redis").createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
    console.log('using cloud');
} else {
    var client = require("redis").createClient();
    console.log('using local');
}

var MAX_LENGTH = 3;

exports.index = function(req, res){
  res.render('index', {title: 's - Karan Goel'});
};

exports.create_short = function(req, res) {
    var long_url = req.body.long_url;
    var id = make_id(); // generate an id
    client.get(id, function(err, reply) {
        // check if key exists
        if (err) {
            res.status(500).send({'message': err});
        } else {
            if (reply === null) {
                // key does not exists
                client.mset([
                    id, long_url,
                    id+'-created', new Date().getTime()
                    ], function(arr, set_res) {console.log(set_res);});
                client.lpush(id+'-hits', "");
                res.status(201).send({
                    'short_id': id,
                    'short_url': req.protocol + "://" + req.get('host') + '/' + id,
                    'long_url': long_url
                });
            } else {
                create_short();
            }
        }
    });
};

exports.find_redirect = function(req, res) {
    var id = req.params.slug;
    console.log(id);
    client.get(id, function(err, reply) {
        console.log('reply: ' + reply);
        if (err) {
            res.status(500).send({'message': err});
        } else {
            if (reply === null) {
                // url has not been created
                res.status(404).send({'message': 'id ' + id + ' not found'});
            } else {
                // found, return the long_url
                client.lpush(id+'-hits', new Date().getTime());
                res.redirect(reply);
            }
        }
    });
};

var make_id = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < MAX_LENGTH; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
