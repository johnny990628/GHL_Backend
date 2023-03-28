require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();
const PATIENT = require("../../models/patient");
const { sendWorkItem } = require("../../dcm4chee/sendWorkItem");

router.route("/:patientID").get(async (req, res) => {
  try {
    const { patientID } = req.params;
    var patient = await PATIENT.findOne({ id: patientID });
    const headers = {
      Accept: "application/dicom+json",
      "Content-Type": "application/dicom+json",
    };
    var dicomTagData = await sendWorkItem(patient);

    axios.post(process.env.WORKLIST_API_URL, dicomTagData, { headers });

    return res.status(200).json(patient);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;