
const consul = require('consul')()

console.log('listening to service 2')
// Web keeps track of changes to Data
let known_data_instances = []

const watcher = consul.watch({
  method: consul.health.service,
  options: {
    service: 'service-2',
    passing: true
  }
})

watcher.on('change', data => {
  console.log('listening to changes', data)
  known_data_instances = []
  data.forEach(entry => {
    known_data_instances.push(`http://${entry.Service.Address}:${entry.Service.Port}/`)
  })
})

// Web Service looks for a random Data Service
function getData (cb) {
  let url = known_data_instances[Math.floor(Math.random() * known_data_instances.length)]

  console.log(url)
  // Do something with the requests
  // request(url, {json: true}, (err, res, data) => {
  //   if (err) return cb(err)

  //   cb(null, data)
  // })
}

getData()
