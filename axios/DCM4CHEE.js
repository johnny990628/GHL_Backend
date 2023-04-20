const { instance } = require("./DCM4CHEE_APIConfig");
// const POST_DCM4CHEE_workitems = async (dicomTagData) => {};

const POST_DCM4CHEE_workitems = (dicomTagData) =>
  instance.post("workitems", dicomTagData);

const POST_DCM4CHEE_mwlitems = (dicomTagData) =>
  instance.post("mwlitems", dicomTagData);

module.exports = { POST_DCM4CHEE_workitems, POST_DCM4CHEE_mwlitems };
