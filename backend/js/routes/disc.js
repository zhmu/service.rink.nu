const db = require('../db')
const router = require('express').Router()

router.get('/:id', (request, response) => {
    const discId = parseInt(request.params.id)
    db.query('SELECT tr.trackid,tr.num,tr.length,tr.title,EXISTS(SELECT NULL FROM paragraph p WHERE p.trackid=tr.trackid) AS have_lyrics FROM track tr WHERE tr.discid=$1', [discId], (err, data) => {
        if (err) throw err
        response.status(200).json(data.rows)
    })
})

router.get('/:id/enqueue', (request, response) => {
    const discId = parseInt(request.params.id)
    db.query('SELECT t.num,f.fileid FROM track t, file f WHERE t.discid=$1 AND t.trackid=f.trackid AND f.filetype=$2', [discId, 'mp3'], (err, data) => {
        if (err) throw err
        let result = { }
        data.rows.forEach((r) => {
            result[r.num] = { fileid: r.fileid }
        })
        response.status(200).json(result)
    })
})

module.exports = router
