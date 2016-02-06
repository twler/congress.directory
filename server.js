var express   = require('express')
, morgan      = require('morgan')
, path        = require('path')
, serveStatic = require('serve-static')
, bodyParser  = require('body-parser')
, compression = require('compression')

if (process.env.NODE_ENV !== 'production') { process.env.PORT = 8000 }

var app = express()

app.use(compression())

// redirectToApex = (req, res, next) ->
//   if req.headers.host is 'www.eeosk.com'
//     res.writeHead 301,
//       Location: [
//         'https://eeosk.com'
//         req.url
//       ].join('')
//       Expires: (new Date).toGMTString()
//
//     res.end()
//   else
//     next()
//   return

if (process.env.NODE_ENV === 'production'){
  // Force SSL and redirect on eeosk properties only
  // app.use(redirectToApex)
  // app.use forceSsl
  app.use(morgan('common'))
} else {
  app.use(morgan('dev'))
}

app.all('/favicon.ico', function (req, res, next) {
  res.redirect('https://res.cloudinary.com/eeosk/image/upload/v1450206151/favicon_e.ico')
  return
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(serveStatic(path.join(__dirname, '')))
app.all('/*', function (req, res, next) {
  // Send builder.html to support HTML5Mode
  res.sendfile('index.html', { root: path.join(__dirname, 'app') })
  return
})

app.listen(process.env.PORT, function () {
  console.log('Frontend listening on port ' + process.env.PORT)
  return
})
