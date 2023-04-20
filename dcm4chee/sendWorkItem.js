const sendWorkItem = async (patient) => {
  var { id, gender, name, birth } = patient;

  //const birthisoDateStr = "2023-02-17T08:54:57.706Z";
  const birthdateObj = new Date(birth);
  const birthyear = birthdateObj.getFullYear().toString();
  const birthmonth = (birthdateObj.getMonth() + 1).toString().padStart(2, "0");
  const birthdate = birthdateObj.getDate().toString().padStart(2, "0");
  var birthDate = birthyear + birthmonth + birthdate;

  const now = new Date();
  const nowyear = now.getFullYear();
  const nowmonth = String(now.getMonth() + 1).padStart(2, "0");
  const nowday = String(now.getDate()).padStart(2, "0");
  const nowhours = String(now.getHours()).padStart(2, "0");
  const nowminutes = String(now.getMinutes()).padStart(2, "0");
  const nowseconds = String(now.getSeconds()).padStart(2, "0");
  const formattedDate = `${nowyear}${nowmonth}${nowday}${nowhours}${nowminutes}${nowseconds}`;
  const FirstName = name.lenght === 3 ? name.substr(0) : name.substr(0, 2);
  const LastName = name.lenght === 3 ? name.substr(2) : name.substr(2, 4);

  var DicomTagData = [
    {
      "00080005": {
        vr: "CS",
        Value: ["ISO_IR 192"],
      },
      "00100010": {
        vr: "PN",
        Value: [
          {
            Alphabetic: `${FirstName}^${LastName}`,
          },
        ],
      },
      "00100020": {
        vr: "LO",
        Value: [id],
      },
      "00100040": {
        vr: "CS",
        Value: [gender.toUpperCase()],
      },
      "00100030": {
        vr: "DA",
        Value: [birthDate],
      },
      "00404005": {
        vr: "DT",
        Value: [formattedDate],
      },
      "00404010": {
        vr: "DT",
        Value: [formattedDate],
      },
      "00404041": {
        vr: "CS",
        Value: ["READY"],
      },
      "00741000": {
        vr: "CS",
        Value: ["SCHEDULED"],
      },
      "00741200": {
        vr: "CS",
        Value: ["MEDIUM"],
      },
      "00741202": {
        vr: "LO",
        Value: ["WORKLIST"],
      },
      "00741204": {
        vr: "LO",
        Value: ["Scheduled procedure step description"],
      },
      "00400100": {
        vr: "SQ",
        Value: [
          {
            "00080000": {
              vr: "UL",
              Value: [12],
            },
            "00080060": {
              vr: "CS",
              Value: ["US"],
            },
            "00180000": {
              vr: "UL",
              Value: [8],
            },
            "00180015": {
              vr: "CS",
            },
            "00400000": {
              vr: "UL",
              Value: [114],
            },
            "00400001": {
              vr: "AE",
              Value: ["EKGROOM"],
            },
            "00400002": {
              vr: "DA",
              Value: [formattedDate.slice(0, 8)],
            },
            "00400003": {
              vr: "TM",
              Value: ["104116"],
            },
            "00400006": {
              vr: "PN",
            },
            "00400007": {
              vr: "LO",
              Value: ["乳房超音波"],
            },
            "00400009": {
              vr: "SH",
              Value: ["3837150908"],
            },
            "00400020": {
              vr: "CS",
              Value: ["SCHEDULED"],
            },
            40080000: {
              vr: "UL",
              Value: [8],
            },
            40080040: {
              vr: "SH",
            },
          },
        ],
      },
      "00401001": {
        vr: "SH",
        Value: ["3837150908"],
      },
      "00401400": {
        vr: "LT",
      },
      "00402004": {
        vr: "DA",
        Value: [formattedDate.slice(0, 8)],
      },
      "00402005": {
        vr: "TM",
        Value: ["104116"],
      },
      "00402016": {
        vr: "LO",
        Value: ["3837150908"],
      },
      "00402017": {
        vr: "LO",
        Value: ["3837150908"],
      },
      "00402400": {
        vr: "LT",
      },
    },
  ];
  return DicomTagData;
};

module.exports = { sendWorkItem };
