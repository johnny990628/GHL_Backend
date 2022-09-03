const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const REPORT = require('../../models/report')
const SCHEDULE = require('../../models/schedule')
const PATIENT = require('../../models/patient')

const calculateReportandPeople = async matchConditions => {
    let totalReports = await REPORT.aggregate([
        {
            $match: matchConditions,
        },
        {
            $lookup: {
                from: 'patients',
                localField: 'patientID',
                foreignField: 'id',
                as: 'patient',
            },
        },
        {
            $project: {
                gender: { $first: '$patient.gender' },
            },
        },
        {
            $project: {
                male: { $cond: [{ $eq: ['$gender', 'm'] }, 1, 0] },
                female: { $cond: [{ $eq: ['$gender', 'f'] }, 1, 0] },
            },
        },
        { $group: { _id: null, male: { $sum: '$male' }, female: { $sum: '$female' }, total: { $sum: 1 } } },
    ])

    totalReports = totalReports[0]
    if (!totalReports) throw Error('該時段或部門無檢查資料')

    let organCount = await REPORT.aggregate([
        {
            $match: matchConditions,
        },
        {
            $project: {
                lastReport: {
                    $arrayElemAt: ['$records', -1],
                },
            },
        },
        {
            $project: {
                sizeOfLiver: {
                    $size: '$lastReport.liver',
                },
                sizeOfGallbladder: {
                    $size: '$lastReport.gallbladder',
                },
                sizeOfKidney: {
                    $size: '$lastReport.kidney',
                },
                sizeOfPancreas: {
                    $size: '$lastReport.pancreas',
                },
                sizeOfSpleen: {
                    $size: '$lastReport.spleen',
                },
                sizeOfSuggestion: {
                    $size: '$lastReport.suggestion',
                },
            },
        },
        {
            $group: {
                _id: null,
                liver: {
                    $sum: { $cond: [{ $ne: ['$sizeOfLiver', 0] }, 1, 0] },
                },
                gallbladder: {
                    $sum: { $cond: [{ $ne: ['$sizeOfGallbladder', 0] }, 1, 0] },
                },
                kidney: {
                    $sum: { $cond: [{ $ne: ['$sizeOfKidney', 0] }, 1, 0] },
                },
                pancreas: {
                    $sum: { $cond: [{ $ne: ['$sizeOfPancreas', 0] }, 1, 0] },
                },
                spleen: {
                    $sum: { $cond: [{ $ne: ['$sizeOfSpleen', 0] }, 1, 0] },
                },
                spleen: {
                    $sum: { $cond: [{ $ne: ['$sizeOfSpleen', 0] }, 1, 0] },
                },
                suggestion: {
                    $sum: { $cond: [{ $ne: ['$sizeOfSuggestion', 0] }, 1, 0] },
                },
            },
        },
    ])
    organCount = organCount[0]

    const organList = [
        { name: 'liver', cancer: ['FLD', 'SLPL', 'LPL', 'LC', 'PLD', 'HEM', 'IC', 'HEP', 'HEPU'] },
        {
            name: 'gallbladder',
            cancer: ['CL', 'GP'],
        },
        {
            name: 'kidney',
            cancer: ['KS', 'RC', 'KC'],
        },
        {
            name: 'pancreas',
            cancer: [],
        },
        {
            name: 'spleen',
            cancer: ['ES'],
        },
        {
            name: 'suggestion',
            cancer: ['datetime', 'examination'],
        },
    ]

    const aggregates = organList.map(({ name, cancer }) => {
        const cancerGroup = cancer.reduce(
            (a, b) => ({ ...a, [b]: { $sum: { $cond: [{ $eq: [`$lastReport.${name}.name`, b] }, 1, 0] } } }),
            {}
        )
        return [
            {
                $match: matchConditions,
            },
            {
                $project: {
                    lastReport: {
                        $arrayElemAt: ['$records', -1],
                    },
                },
            },
            {
                $unwind: `$lastReport.${name}`,
            },
            {
                $group: {
                    _id: 0,
                    ...cancerGroup,
                },
            },
        ]
    })

    let cancerCount = await Promise.all(
        aggregates.map(async aggregate => {
            return await REPORT.aggregate(aggregate)
        })
    )
    cancerCount = cancerCount.map(cancers => ({ ...cancers[0] }))

    const numsOfPeople = [
        {
            name: 'total',
            label: '超音波檢查總次數',
            amount: totalReports.total || 0,
            totalFemale: {
                name: 'totalFemale',
                label: '女',
                value: totalReports.female || 0,
            },
            totalMale: {
                name: 'totalMale',
                label: '男',
                value: totalReports.male || 0,
            },
        },
        {
            name: 'reserve',
            label: '預約總人數',
            amount: totalReports.total || 0,
            reserveFemale: {
                name: 'reserveFemale',
                label: '女',
                value: totalReports.female || 0,
            },
            reserveMale: {
                name: 'reserveMale',
                label: '男',
                value: totalReports.male || 0,
            },
        },
        {
            name: 'absent',
            label: '未報到人數',
            amount: 0,
            absentFemale: {
                name: 'absentFemale',
                label: '女',
                value: 0,
            },
            absentMale: {
                name: 'absentMale',
                label: '男',
                value: 0,
            },
        },
    ]
    const numsOfReport = [
        {
            name: 'liver',
            label: '肝臟異常',
            amount: organCount.liver || 0,
            FLD: {
                name: 'FLD',
                label: '脂肪肝',
                value: cancerCount[0].FLD || 0,
            },
            SLPL: {
                name: 'SLPL',
                label: '疑似肝實質病變',
                value: cancerCount[0].SLPL || 0,
            },
            LPL: { name: 'LPL', label: '肝實質病變', value: cancerCount[0].LPL || 0 },
            LC: {
                name: 'LC',
                label: '肝硬化',
                value: cancerCount[0].LC || 0,
            },
            PLD: {
                name: 'PLD',
                label: '肝囊腫',
                value: cancerCount[0].PLD || 0,
            },
            HEM: {
                name: 'HEM',
                label: '血管瘤',
                value: cancerCount[0].HEM || 0,
            },
            IC: {
                name: 'IC',
                label: '肝內鈣化點',
                value: cancerCount[0].IC || 0,
            },
            HEP: {
                name: 'HEP',
                label: '肝腫瘤(疑似肝癌)',
                value: cancerCount[0].HEP || 0,
            },
            HEPU: {
                name: 'HEPU',
                label: '肝腫瘤(性質不明)',
                value: cancerCount[0].HEPU || 0,
            },
        },
        {
            name: 'gallbladder',
            label: '膽囊異常',
            amount: organCount.gallbladder,
            CL: {
                name: 'CL',
                label: '膽結石',
                value: cancerCount[1].CL || 0,
            },
            GP: {
                name: 'GP',
                label: '膽息肉',
                type: 'radio',
                value: cancerCount[1].GP || 0,
            },
        },
        {
            name: 'kidney',
            label: '腎臟異常',
            amount: organCount.kidney,
            KS: {
                name: 'KS',
                label: '腎結石',
                value: cancerCount[2].KS || 0,
            },
            RC: {
                name: 'RC',
                label: '腎囊腫',
                value: cancerCount[2].RC || 0,
            },
            KC: {
                name: 'KC',
                label: '腎腫瘤',
                value: cancerCount[2].KC || 0,
            },
        },
        {
            name: 'pancreas',
            label: '胰臟異常',
            amount: organCount.pancreas,
        },
        {
            name: 'spleen',
            label: '脾臟異常',
            amount: organCount.spleen,
            ES: {
                name: 'ES',
                label: '脾臟腫大',
                value: cancerCount[4].ES || 0,
            },
        },
        {
            name: 'suggestion',
            label: '需進一步檢查',
            amount: organCount.suggestion,
            datetime: {
                name: 'datetime',
                label: '請每隔幾年幾月定期追蹤一次',
                value: cancerCount[5].datetime || 0,
            },
            examination: {
                name: 'examination',
                label: '請至各大醫院近一步詳細檢查',
                value: cancerCount[5].examination || 0,
            },
        },
    ]
    return { numsOfPeople, numsOfReport }
}

router.route('/').get(async (req, res) => {
    try {
        const { dateFrom, dateTo } = req.query

        const matchConditions =
            dateFrom && dateTo
                ? {
                      $and: [
                          {
                              createdAt: {
                                  $gte: new Date(dateFrom),
                                  $lte: new Date(dateTo),
                              },
                          },
                          { status: 'finished' },
                      ],
                  }
                : {
                      $and: [{ status: 'finished' }],
                  }

        const { numsOfPeople, numsOfReport } = await calculateReportandPeople(matchConditions)
        return res.status(200).json({ numsOfPeople, numsOfReport })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})
router.route('/:departmentID').get(async (req, res) => {
    try {
        const { dateFrom, dateTo } = req.query
        const { departmentID } = req.params

        let patientsOfDepartment = await PATIENT.aggregate([
            {
                $lookup: {
                    from: 'departments',
                    localField: 'department',
                    foreignField: 'name',
                    as: 'department',
                },
            },
            {
                $project: {
                    id: 1,
                    department: { $arrayElemAt: ['$department', -1] },
                },
            },
            {
                $match: {
                    'department._id': mongoose.Types.ObjectId(departmentID),
                },
            },
            {
                $project: {
                    id: 1,
                },
            },
        ])

        if (patientsOfDepartment.length === 0) return res.status(404).json({ message: '此部門無檢查資料' })

        const patientIDCondition = patientsOfDepartment
            .map(patient => patient.id)
            .map(id => ({
                patientID: id,
            }))

        const matchConditions =
            dateFrom && dateTo
                ? {
                      $and: [
                          {
                              $or: patientIDCondition,
                          },
                          {
                              createdAt: {
                                  $gte: new Date(dateFrom),
                                  $lte: new Date(dateTo),
                              },
                          },
                          { status: 'finished' },
                      ],
                  }
                : {
                      $and: [
                          {
                              $or: patientIDCondition,
                          },
                          { status: 'finished' },
                      ],
                  }

        const { numsOfPeople, numsOfReport } = await calculateReportandPeople(matchConditions)

        // let reportsOfDepartment = await REPORT.aggregate([
        //     {
        //         $match: matchConditions,
        //     },
        //     // {
        //     //     $lookup: {
        //     //         from: 'patients',
        //     //         localField: 'patientID',
        //     //         foreignField: 'id',
        //     //         as: 'patient',
        //     //     },
        //     // },
        //     // {
        //     //     $lookup: {
        //     //         from: 'departments',
        //     //         localField: 'patient.department',
        //     //         foreignField: 'name',
        //     //         as: 'department',
        //     //     },
        //     // },

        //     // {
        //     //     $match: {
        //     //         'department._id': mongoose.Types.ObjectId(departmentID),
        //     //     },
        //     // },
        //     {
        //         $project: {
        //             procedureCode: 0,
        //             blood: 0,
        //         },
        //     },
        // ])

        return res.status(200).json({ numsOfPeople, numsOfReport })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

module.exports = router