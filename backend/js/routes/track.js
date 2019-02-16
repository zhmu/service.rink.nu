const db = require('../db')
const router = require('express').Router()

router.get('/:id/lyrics', (request, response) => {
    const trackId = parseInt(request.params.id)
    db.query('SELECT p.ordernum AS porder,l.ordernum AS lorder,p.header,l.content FROM paragraph p,line l WHERE p.trackid=$1 AND p.paragraphid=l.paragraphid', [trackId], (err, data) => {
        if (err) throw err
        let result = { }
        data.rows.forEach((r) => {
            const key = r.porder
            if (!(key in result)) {
                result[key] = { header: r.header, lines: { } }
            }
            result[key].lines[r.lorder] = r.content
        })
        response.status(200).json(result)
    })
})

router.get('/:id/enqueue', (request, response) => {
    const trackId = parseInt(request.params.id)
    db.query('SELECT f.fileid FROM file f WHERE f.trackid=$1 AND f.filetype=$2', [trackId, 'mp3'], (err, data) => {
        if (err) throw err
        response.status(200).json(data.rows)
    })
})

module.exports = router
