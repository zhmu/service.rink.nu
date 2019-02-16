const db = require('../db')
const router = require('express').Router()

router.get('/', (request, response) => {
    db.query('SELECT artistid,name FROM artist', [], (error, results) => {
        if (error) throw error
        response.status(200).json(results.rows)
    })
})

router.get('/:id', (request, response) => {
    const artistId = parseInt(request.params.id)
    db.query('SELECT al.albumid,al.year,al.name,d.discid,d.volume FROM album al,disc d WHERE al.artistid=$1 AND d.albumid=al.albumid', [artistId], (err, data) => {
        if (err) throw err
        let result = { }
        data.rows.forEach((r) => {
            if (r.albumid in result) {
                result[r.albumid].discs.push({ discid: r.discid, volume: r.volume })
            } else {
                result[r.albumid] = { albumid: r.albumid, year: r.year, name: r.name, discs: [ { discid: r.discid, volume: r.volume } ] }
            }
        })
        response.status(200).json(result)
    })
})

module.exports = router
