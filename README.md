*`s`*
=

**Release status: *alpha***

A high-performance, anonymous URL shortener built using Redis + Node.js with a API-backed design.

[Demo](http://s.goel.im)

### Features

- **High performance** - mean response time for `POST` methods is 40ms
- **Anonymous** - No user data is stored, only timestamps of hits on links are stored for analtics
- **Extendible** - The code is very simple and minimal to make it easier to extend it's features as needed.

### Quickstart
    $ brew install redis
    $ npm install
    $ redis-server
    $ node app

### Performance

`s` uses Redis as the primary data store which provides excellent performance even at scale. Below are the benchmark results with 10,000 `POST` requests (10 concurrent connections).

    This is ApacheBench, Version 2.3 <$Revision: 655654 $>
    Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
    Licensed to The Apache Software Foundation, http://www.apache.org/

    Benchmarking s.goel.im (be patient)
    Completed 1000 requests
    Completed 2000 requests
    Completed 3000 requests
    Completed 4000 requests
    Completed 5000 requests
    Completed 6000 requests
    Completed 7000 requests
    Completed 8000 requests
    Completed 9000 requests
    Completed 10000 requests
    Finished 10000 requests


    Server Software:        MochiWeb/1.0
    Server Hostname:        s.goel.im
    Server Port:            80

    Document Path:          /new
    Document Length:        409 bytes


    Concurrency Level:      10
    Time taken for tests:   170.267 seconds
    Complete requests:      10000
    Failed requests:        12
     (Connect: 0, Receive: 0, Length: 12, Exceptions: 0)
    Write errors:           0
    Non-2xx responses:      9993
    Total transferred:      6163636 bytes
    Total POSTed:           1810724
    HTML transferred:       4085092 bytes
    Requests per second:    58.73 [#/sec] (mean)
    Time per request:       170.267 [ms] (mean)
    Time per request:       17.027 [ms] (mean, across all concurrent requests)
    Transfer rate:          35.35 [Kbytes/sec] received
                          10.39 kb/s sent
                          45.74 kb/s total

    Connection Times (ms)
                min  mean[+/-sd] median   max
    Connect:       67   71  22.6     68    1070
    Processing:    69  100  48.5     78     746
    Waiting:        0   99  48.5     78     746
    Total:        137  170  56.8    148    1277

    Percentage of the requests served within a certain time (ms)
    50%    148
    66%    164
    75%    179
    80%    191
    90%    223
    95%    262
    98%    331
    99%    394
    100%   1277 (longest request)

### Dependencies

- Node.js (the server)
- Express.js (lightweight framework on top of node)
- Redis (simple key-value data store)
- Angular.js (for client side JS)
- Jade (HTML rendering engine)

### Develop locally

Start the redis server

    $ redis-server

Start the node app

    $ node app

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