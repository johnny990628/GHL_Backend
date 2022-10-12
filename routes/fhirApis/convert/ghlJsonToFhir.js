module.exports = function patientConvertToFHIR(data) {
    var fhirArray = [];
    for (var i = 0; i < data.length; i++) {
        const birth = data.birth;
        const age = new Date().getFullYear() - new Date(birth).getFullYear();
        const fhirJSON = {
            resourceType: "Patient",
            _id: data[i].id,
            text: {
                status: "generated",
                div: '<div xmlns="http://www.w3.org/1999/xhtml"><h3><b>病人基本資料</b></h3><blockquote><p><b>識別碼型別</b>：National unique individual identifier <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki">（ <a href="http://terminology.hl7.org/CodeSystem/v2-0203">Identifier Type Codes</a>#NI）</span><br/><b>身分證字號（official）</b>：A123456789 （http://www.moi.gov.tw/）</p></blockquote><blockquote><p><b>識別碼型別</b>：Medical record number <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki">（ <a href="http://terminology.hl7.org/CodeSystem/v2-0203">Identifier Type Codes</a>#MR）</span><br/><b>病歷號（official）</b>：8862168 （https://www.tph.mohw.gov.tw/）</p></blockquote><p><b>病人的紀錄（active）</b>：使用中</p><p><b>姓名（official）</b>：陳加玲 Chan, Chia Lin</p><p><b>性別</b>：女性</p><p><b>出生日期</b>：1990-01-01</p><p><b>年齡[extension: <a href="StructureDefinition-person-age.html">person-age</a>]</b>：32</p><p><b>聯絡方式</b>：Phone <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki">（ <a href="https://hl7.org/fhir/R4/valueset-contact-point-system.html">ContactPointSystem</a>#phone）</span><br/><b>聯絡電話</b>：（Mobile）0911327999 <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki">（ <a href="https://build.fhir.org/codesystem-contact-point-use.html">ContactPointUse</a>#mobile）</span><br/><b>聯絡電話使用效期</b>：2022-07-31至2024-07-31</p><p><b>聯絡地址</b>：(103)臺北市大同區大有里19鄰承德路三段52巷6弄210號2樓B室<br/><b>　郵遞區號（postalCode） [extension: <a href="StructureDefinition-tw-postal-code.html">tw-postal-code</a>] </b>： <a href="CodeSystem-postal-code3-tw.html">103</a><br/><b>　縣/市（city）</b>：臺北市<br/><b>　鄉/鎮/市/區（district）</b>：大同區<br/><b>　村(里)（village） [extension: <a href="StructureDefinition-tw-village.html">tw-village</a>] </b>：大有里<br/><b>　鄰（neighborhood） [extension: <a href="StructureDefinition-tw-neighborhood.html">tw-neighborhood</a>] </b>：19鄰<br/><b>　路/街（line）</b>：承德路<br/><b>　段(section) [extension: <a href="StructureDefinition-tw-section.html">tw-section</a>] </b>：三段<br/><b>　巷/衖（lane） [extension: <a href="StructureDefinition-tw-lane.html">tw-lane</a>] </b>：52巷<br/><b>　弄（alley） [extension: <a href="StructureDefinition-tw-alley.html">tw-alley</a>] </b>：6弄<br/><b>　號（number） [extension: <a href="StructureDefinition-tw-number.html">tw-number</a>] </b>：210號<br/><b>　樓（floor） [extension: <a href="StructureDefinition-tw-floor.html">tw-floor</a>] </b>：2樓<br/><b>　室（room） [extension: <a href="StructureDefinition-tw-room.html">tw-room</a>] </b>：B室<br/><b>　國家（country）</b>：臺灣<br/><br/></p><p><b>婚姻狀態</b>：unmarried <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki">（ <a href="http://terminology.hl7.org/CodeSystem/v3-MaritalStatus">臺灣婚姻狀態值集</a>#U）</span></p><p><b>聯絡人（official）</b>：李立偉 Li, Li Wei<br/><b>　關係</b>：father <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki">（ <a href="http://terminology.hl7.org/CodeSystem/v3-RoleCode">PatientRelationshipType</a>#FTH）</span><br/><b>　聯絡方式</b>：Phone <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki">（ <a href="https://hl7.org/fhir/R4/valueset-contact-point-system.html">ContactPointSystem</a>#phone）</span><br/><b>　聯絡電話</b>：（Mobile）0917159753 <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki">（ <a href="https://build.fhir.org/codesystem-contact-point-use.html">ContactPointUse</a>#mobile）</span><br/><b>　聯絡電話使用效期</b>：2022-07-31至2024-07-31</p><p><b>向病人說明健康狀態時所使用的語言</b>：中文</p><p><b>紀錄的保管機構</b>： <a href="Organization-org-hosp-example.html">Organization/org-hosp-example</a> "衛生福利部臺北醫院"</p><p><b>病人照片</b>： <a href="https://2.bp.blogspot.com/-v3yEwItkXKQ/VaMN_1Nx6TI/AAAAAAAAvhM/zDXN_eZw_UE/s800/youngwoman_42.png">https://2.bp.blogspot.com/-v3yEwItkXKQ/VaMN_1Nx6TI/AAAAAAAAvhM/zDXN_eZw_UE/s800/youngwoman_42.png</a><br/><img src="https://2.bp.blogspot.com/-v3yEwItkXKQ/VaMN_1Nx6TI/AAAAAAAAvhM/zDXN_eZw_UE/s800/youngwoman_42.png" width="250px"/></p></div>',
            },
            extension: [
                {
                    url: "https://twcore.mohw.gov.tw/fhir/StructureDefinition/person-age",
                    valueInteger: age,
                },
            ],
            identifier: [
                {
                    use: "official",
                    type: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                                code: "NI",
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
                    given: data[i].name.substr(1),
                },
            ],
            telecom: [
                {
                    system: "phone",
                    value: data[i].phone,
                    use: "mobile",
                    period: {
                        start: "2022-07-31",
                        end: "2024-07-31",
                    },
                },
            ],
            gender: data[i].gender === "f" ? "female" : "male",
            birthDate: data[i].birth,
            address: [
                {
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
                    text: "臺北市大同區大有里19鄰承德路三段52巷6弄210號2樓B室",
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
                    contentType: "image/jpeg",
                    data: "R0lGODlhEwARAPcAAAAAAAAA/+9aAO+1AP/WAP/eAP/eCP/eEP/eGP/nAP/nCP/nEP/nIf/nKf/nUv/nWv/vAP/vCP/vEP/vGP/vIf/vKf/vMf/vOf/vWv/vY//va//vjP/3c//3lP/3nP//tf//vf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAEALAAAAAATABEAAAi+AAMIDDCgYMGBCBMSvMCQ4QCFCQcwDBGCA4cLDyEGECDxAoAQHjxwyKhQAMeGIUOSJJjRpIAGDS5wCDly4AALFlYOgHlBwwOSNydM0AmzwYGjBi8IHWoTgQYORg8QIGDAwAKhESI8HIDgwQaRDI1WXXAhK9MBBzZ8/XDxQoUFZC9IiCBh6wEHGz6IbNuwQoSpWxEgyLCXL8O/gAnylNlW6AUEBRIL7Og3KwQIiCXb9HsZQoIEUzUjNEiaNMKAAAA7",
                    url: "https://2.bp.blogspot.com/-v3yEwItkXKQ/VaMN_1Nx6TI/AAAAAAAAvhM/zDXN_eZw_UE/s800/youngwoman_42.png",
                },
            ],
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
            // managingOrganization: {
            //     reference: "Organization/org-hosp-example",
            // },
        };
        fhirArray.push(fhirJSON);
    }

    return fhirArray;
};
