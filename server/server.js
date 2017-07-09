const consul = require('consul')()

// Create a unique GUID
const CONSUL_ID = require('uuid/v4')()
const options = {
  name: 'service-2',
  // Works if we pass in the node id from the consul ui => '172.21.0.2'
  // and not using docker to run nodejs
  address: process.env.ADDRESS || '172.21.0.2',
  // port: 8500,
  id: CONSUL_ID,
  check: {
    ttl: '10s',
    deregister_critical_service_after: '1m'
  }
}

consul.agent.service.register(options, err => {
  if (err) {
    console.log(err)
    return
  }
  // schedule heartbeat
  setInterval(() => {
    consul.agent.check.pass({id: `service:${CONSUL_ID}`}, err => {
      if (err) {
        throw new Error(err)
      }
      console.log('told Consul that we are healthy')
    })
  }, 5 * 1000)
})

process.on('SIGINT', () => {
  console.log('SIGINT. De-Registering...')
  let details = {id: CONSUL_ID}

  consul.agent.service.deregister(details, (err) => {
    console.log('de-registered.', err)
    process.exit()
  })
})
