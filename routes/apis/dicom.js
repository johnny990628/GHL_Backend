const express = require('express')
const router = express.Router()
const axios = require('axios')
const dicomTag = require('../../assets/DICOM-Tags.json')

router.route('/').get(async (req, res) => {
    /* 	
            #swagger.tags = ['Dicom']
            #swagger.description = '取得DICOM JSON Data' 
        */
    try {
        const { data } = await axios.get(process.env.PACS_URL)
        const result = data.map(d => {
            const patient = dicomTag.patient.reduce((accumulator, currentValue) => {
                return { ...accumulator, [currentValue.keyword]: d[currentValue.tag]['Value'] || null }
            }, {})
            const study = dicomTag.study.reduce((accumulator, currentValue) => {
                return { ...accumulator, [currentValue.keyword]: d[currentValue.tag]['Value'] || null }
            }, {})
            return { ...patient, ...study }
        })

        return res.status(200).json({ results: result })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

router.route('/:id').get(async (req, res) => {
    /* 	
            #swagger.tags = ['Dicom']
            #swagger.description = '取得單一DICOM' 
        */
    try {
        const { id } = req.params

        if (!id) return res.status(404).json({ message: '找不到DICOM' })
        return res.status(200).json(id)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

module.exports = router
