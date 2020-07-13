import { Application } from "express"
import Pastes from '../Models/paste.model'

export const init = (app: Application) => {
    app.get('/', async (req, res) => {
        res.render('home')
    })

    app.get('/:id', async (req, res) => {
        const paste = await Pastes.findById(req.params.id)
        if (paste) {
            // Port old pastes into new ones!
            if (req.query && paste.syntax === null) {
                paste.syntax = Object.keys(req.query)[0]
                await paste.save()
                console.log(`Patched old Paste to syntax=${paste.syntax}`)
            }

            res.render('view', {
                paste: paste.paste,
                syntax: paste.syntax
            })
        } else {
            res.status(404).send({
                error: 'Paste not found'
            })
        }
    })

    app.put('/', async (req, res) => {
        try {
            const paste = new Pastes()
            paste.paste = req.body.paste
            paste.syntax = req.body.syntax
            paste.expiresAt = new Date(Date.now() + parseInt(req.body.expiry))
            await paste.save()

            res.json({
                shortid: paste._id
            })
        } catch (ex) {
            console.error(ex)
            res.status(500).send({
                error: ex
            })
        }
    })
}