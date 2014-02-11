s
=

A high-performance, anonymous URL shortener built using Redis + Node.js with a API-backed design.

### Features

- **High performance** - mean response time for `POST` methods is 40ms
- **Anonymous** - No user data is stored, only timestamps of hits on links are stored for analtics
- **Extendible** - The code is very simple and minimal to make it easier to extend it's features as needed. 

### Dependencies

- Node.js
- Express.js
- Jade
- Redis

### Develop locally

Start the redis server

    $ redis-server

Start the node app

    $ node app.js

### Deploy on Heroku

    $ heroku create                     // create a heroku app
    $ heroku addons:add redistogo       // add the redistogo addon
    $ foreman start                     // start the foreman server to test locally
    $ git push heroku master            // to the moon

If you have any issues, please find help in the [Heroku Help](https://devcenter.heroku.com/) center first. If that doesn't help, [create an issue](https://github.com/karan/s/issues) and I'll see if there's something I can help with.

### API end points

#### Shorten a URL

`POST /new`

Generates a new short URL for the given long url.

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `long_url` | `string` | **Required.** The URL to be shortened.

**Response**

    {
      "status": "success",
      "short_id": "dLC",
      "short_url": "http://localhost:8000/dLC",
      "long_url": "https://news.ycombinator.com/item?id=7202182"
    }

#### Get the long URL

Redirects to the long URL of the passed short URL, if exists. Also increases the hit counter and pushes the hit timestamp.

`GET /:slug`

### License

MIT

Basically, you can do whatever you want as long as you include the original copyright.
