s
=

A high-performance URL shortener built using Redis + Node.js with a API-backed design.

### Dependencies

- Node.js
- Express.js
- Jade
- Redis

### Run

Start the redis server

    $ redis-server

Start the node app

    $ node app.js

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

Returns the long URL of the passed short URL, if exists. Also increases the hit counter and pushes the hit timestamp.

`GET /:slug`

**Response**

    {
      "status": "success",
      "long_url": "https://news.ycombinator.com/item?id=7202182"
    }

If `slug` does not exist, 

    {
      "status": "success",
      "message": "id not found"
    }
