const EVENT = require('../../models/event')

const checkEvent = async (req, res, next) => {
    try {
        const eventID = req.cookies.event
        if (eventID) {
            const event = await EVENT.findOne({ _id: eventID })
            req.event = eventID
            req.department = event.departmentID
        }
        return next()
    } catch (e) {
        return next()
    }
}

module.exports = { checkEvent }
