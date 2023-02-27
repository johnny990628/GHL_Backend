module.exports = function patientConvertToFHIR(data) {
    var fhirArray = [];
    for (var i = 0; i < data.length; i++) {
        const BirthYear = new Date(data[i].birth).getFullYear().toString();
        const birthMonth = new Date(data[i].birth).getMonth().toString();
        const birthDate = new Date(data[i].birth).getDate().toString();
        const birth = () => {
            if (birthMonth.length === 1 && birthDate.length === 1) {
                return BirthYear + "-0" + birthMonth + "-0" + birthDate;
            } else if (birthMonth.length === 1 && birthDate.length === 2) {
                return BirthYear + "-0" + birthMonth + "-" + birthDate;
            } else if (birthMonth.length === 2 && birthDate.length === 1) {
                return BirthYear + "-" + birthMonth + "-0" + birthDate;
            } else {
                return BirthYear + "-" + birthMonth + "-" + birthDate;
            }
        };

        let age = new Date().getFullYear() - new Date(birth()).getFullYear();
        let fhirJSON = {
            resource: {
                resourceType: "Patient",
                id: data[i].id,
                text: {
                    status: "empty",
                    div: '<div xmlns="http://www.w3.org/1999/xhtml">目前為空值，日後依院內使用情境產出所需的病患摘要資訊</div>',
                },
                extension: [
                    {
                        url: "https://twcore.mohw.gov.tw/fhir/StructureDefinition/person-age",
                        valueInteger: parseInt(String(age)),
                    },
                ],
                identifier: [
                    {
                        use: "official",
                        type: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                                    code: "EN",
                                },
                            ],
                        },
                        system: "http://www.moi.gov.tw/",
                        value: data[i].id,
                    },
                ],
                active: true,
                name: [
                    {
                        use: "official",
                        text: data[i].name,
                        family: data[i].name.slice(0, 1),
                        given: [data[i].name.substr(1)],
                    },
                ],
                telecom: [
                    {
                        system: "phone",
                        value: data[i].phone,
                        use: "mobile",
                        period: {
                            start: "2022-07-31",
                            end: "2069-07-31",
                        },
                    },
                ],
                gender: data[i].gender === "f" ? "female" : "male",
                birthDate: birth(),
                address: [
                    {
                        /*
                        extension: [
                            {
                                url: "https://twcore.mohw.gov.tw/fhir/StructureDefinition/tw-section",
                                valueString: "三段",
                            },
                            {
                                url: "https://twcore.mohw.gov.tw/fhir/StructureDefinition/tw-number",
                                valueString: "210號",
                            },
                            {
                                url: "https://twcore.mohw.gov.tw/fhir/StructureDefinition/tw-village",
                                valueString: "大有里",
                            },
                            {
                                url: "https://twcore.mohw.gov.tw/fhir/StructureDefinition/tw-neighborhood",
                                valueString: "19鄰",
                            },
                            {
                                url: "https://twcore.mohw.gov.tw/fhir/StructureDefinition/tw-lane",
                                valueString: "52巷",
                            },
                            {
                                url: "https://twcore.mohw.gov.tw/fhir/StructureDefinition/tw-alley",
                                valueString: "6弄",
                            },
                            {
                                url: "https://twcore.mohw.gov.tw/fhir/StructureDefinition/tw-floor",
                                valueString: "2樓",
                            },
                            {
                                url: "https://twcore.mohw.gov.tw/fhir/StructureDefinition/tw-room",
                                valueString: "B室",
                            },
                        ],
                        */
                        /*
                        line: ["承德路"],
                        city: "臺北市",
                        district: "大同區",
                        _postalCode: {
                            extension: [
                                {
                                    url: "https://twcore.mohw.gov.tw/fhir/StructureDefinition/tw-postal-code",
                                    valueCodeableConcept: {
                                        coding: [
                                            {
                                                system: "https://twcore.mohw.gov.tw/fhir/CodeSystem/postal-code3-tw",
                                                code: "103",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                        */
                        country: "TW",
                    },
                ],
                maritalStatus: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                            code: "U",
                        },
                    ],
                },
                photo: [
                    {
                        url: "https://2.bp.blogspot.com/-v3yEwItkXKQ/VaMN_1Nx6TI/AAAAAAAAvhM/zDXN_eZw_UE/s800/youngwoman_42.png",
                    },
                ],
                /*
                contact: [
                    {
                        relationship: [
                            {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                                        code: "FTH",
                                    },
                                ],
                            },
                        ],
                        name: {
                            use: "official",
                            text: "李立偉",
                            family: "Li",
                            given: ["Li Wei"],
                        },
                        telecom: [
                            {
                                system: "phone",
                                value: "0917159753",
                                use: "mobile",
                                period: {
                                    start: "2022-07-31",
                                    end: "2024-07-31",
                                },
                            },
                        ],
                    },
                ],
                */
                communication: [
                    {
                        language: {
                            coding: [
                                {
                                    system: "urn:ietf:bcp:47",
                                    code: "zh-TW",
                                },
                            ],
                        },
                    },
                ],
                /*
                managingOrganization: {
                    reference: "Organization/org-hosp-example",
                },
                */
            },
        };
        fhirArray.push(fhirJSON);
    }

    return fhirArray;
};
