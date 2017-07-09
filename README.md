# nodejs-consul


Using Consul for service discovery.


## Docker

Get the latest version of Consul with the following command:

```bash
$ docker pull consul
```

Running a three node cluster for development by starting up two more instances and telling them to join the first node.

```bash
# Setup the consul
$ docker-compose up -d

# Register the service on the server side
$ cd ./server && node server.js

# Listen to the changes of the registered service
$ cd ./client && node client.js
```


### UI
For displaying the ui, the following is needed
```bash
$ ... -ui -client=0.0.0.0 -bind='{{ GetPrivateIP }}'
```