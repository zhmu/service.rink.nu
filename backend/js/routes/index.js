const artist = require('./artist')
const disc = require('./disc')
const track = require('./track')
const file = require('./file')

module.exports = (app) => {
    app.use('/artist', artist),
    app.use('/disc', disc),
    app.use('/track', track),
    app.use('/file', file)
}
