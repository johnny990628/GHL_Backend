module.exports = function patientConvertToJSON(data) {
    const jsonData = {
        id: data.identifier[0].value,
        name: data.name[0].text,
        phone: data.telecom[0].value,
        department: "FHIR",
        birth: data.birthDate,
        gender: data.gender.slice(0, 1),
    };
    return jsonData;
};
