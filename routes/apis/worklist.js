require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();
const PATIENT = require("../../models/patient");
const { sendWorkItem } = require("../../dcm4chee/sendWorkItem");
const {
  POST_DCM4CHEE_workitems,
  POST_DCM4CHEE_mwlitems,
} = require("../../axios/DCM4CHEE");

router.route("/:patientID").get(async (req, res) => {
  try {
    const { patientID } = req.params;
    var patient = await PATIENT.findOne({ id: patientID });
    var dicomTagData = await sendWorkItem(patient);
    await POST_DCM4CHEE_workitems(dicomTagData);
    const mwlitems = await POST_DCM4CHEE_mwlitems(dicomTagData);
    
    return res.status(200).json(mwlitems.data["0020000D"].Value);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
