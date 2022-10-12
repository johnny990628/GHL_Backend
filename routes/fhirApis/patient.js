const express = require("express");
const router = express.Router();

const PATIENT = require("../../models/patient");
const REPORT = require("../../models/report");
const BLOOD = require("../../models/blood");
const SCHEDULE = require("../../models/schedule");

const patientConvertToFHIR = require("./convert/ghlJsonToFhir");
const patientConvertToJSON = require("./convert/FhirToGhlJson");
router
    .route("/")
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '取得病人' 
        */
        try {
            const { _id, identifier, name, gender, birthDate, status } =
                req.query;
            // if (!limit || !offset)
            //     return res
            //         .status(400)
            //         .json({ message: "Need a limit and offset" });
            var search = false;
            if (identifier || name || gender || birthDate || _id) {
                search = true;
            }

            var searchArray = [];
            var searchQuery = {};

            if (search) {
                if (identifier)
                    searchArray.push({ id: new RegExp(identifier) });
                if (name) searchArray.push({ name: new RegExp(name) });
                if (gender)
                    searchArray.push({
                        gender: new RegExp(gender.slice(0, 1)),
                    });
                if (birthDate)
                    searchArray.push({ birth: new RegExp(birthDate) });
                if (_id) searchArray.push({ id: new RegExp(_id) });
                searchQuery = { $or: searchArray };
            }

            let statusMatch = {};
            if (status) {
                switch (status) {
                    case "finish":
                        statusMatch["schedule.0"] = { $exists: false };
                        statusMatch["report.0"] = { $exists: true };
                        break;
                    case "yet":
                        statusMatch["schedule.0"] = { $exists: false };
                        statusMatch["report.0"] = { $exists: false };
                        break;
                    case "processing":
                        statusMatch["schedule.0"] = { $exists: true };
                        break;
                    default:
                        break;
                }
            }
            const patients = await PATIENT.aggregate([{ $match: searchQuery }]);

            const count = await PATIENT.find(searchQuery).countDocuments();

            // const patients = await PATIENT.find(searchQuery)
            //     .sort({ [sort]: desc })
            //     .limit(limit)
            //     .skip(limit * offset)
            //     .populate('schedule')
            //     .populate('blood')
            //     .populate('report')

            const fhirJSON = await patientConvertToFHIR(patients);
            return res.status(200).json({ fhirJSON });
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    })
    .post(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '新增病人' 
        */
        try {
            const patientJSON = await patientConvertToJSON(req.body);
            var patient = new PATIENT(patientJSON);
            patient = await patient.save();

            return res.status(200).json(req.body);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    })
    .delete(async (req, res) => {
        try {
            const { _id } = req.body;
            const patient = await PATIENT.findOneAndDelete({ id: _id });
            await REPORT.findOneAndDelete({ _id, status: "pending" });
            await SCHEDULE.findOneAndDelete({ _id });
            await BLOOD.findOneAndDelete({ _id });
            return res.status(200).json(patient);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: e.message });
        }
    });

router
    .route("/:patientID")
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '取得一個病人' 
        */
        try {
            const { patientID } = req.params;
            var patient = await PATIENT.findOne({ id: patientID });
            patient = await patientConvertToFHIR([patient]);
            return res.status(200).json(patient);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    })
    .patch(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '修改病人' 
        */
        try {
            const { patientID } = req.params;
            const patientJSON = await patientConvertToJSON(req.body);

            const patient = await PATIENT.findOneAndUpdate(
                { id: patientID },
                { $set: { ...patientJSON } },
                { returnDocument: "after" }
            );

            const  responseJSON= await patientConvertToFHIR([patient]);
            return res.status(200).json(responseJSON[0]);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    })
    .delete(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '刪除病人' 
        */
        try {
            const { patientID } = req.params;
            const patient = await PATIENT.findOneAndDelete({ id: patientID });
            return res.status(200).json(patient);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    });

module.exports = router;
