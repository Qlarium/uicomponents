class Utils {
  static getImage(name) {
    return require("../images/" + name);
  }
  static getIcon(iconType) {
    switch (iconType) {
      case "info":
        return require("../images/Info.png");
      case "upArrow":
        return require("../images/Arrow-Up.png");
      case "downArrow":
        return require("../images/Arrow-Down.png");
      case "good":
        return require("../images/Selected.svg");
      case "bad":
        return require("../images/Warning.svg");
      case "insight":
        return require("../images/Insight.svg");
      case "natural":
        return require("../images/Insight.svg");
      case "branch":
        return require("../images/branch.svg");
      default:
        return null;
    }
  }

  static haveWebsite(report) {
    return (
        report != null &&
        report.website != null &&
        (report.website.includes("www") || report.website.includes("http")) &&
        !report.website.includes("inactive")
    );
  }

  static getIconByNumber(iconType) {
    switch (iconType) {
      case 4:
        return require("../images/Arrow-Up.png");
      case 5:
        return require("../images/Arrow-Down.png");
      case 2:
        return require("../images/Selected.svg");
      case 3:
        return require("../images/Warning.svg");
      default:
        return require("../images/Insight.svg");
    }
  }

  static getProfitabilityMsg(val) {
    switch (val) {
      case "0 to 10%":
      case "0 to 10%.":
      case "10% to 50%":
      case "10% to 50%.":
        return "Net profit margin";
      case "-10% to 0":
      case "-10% to 0.":
      case "-50% to -10%":
      case "-50% to -10%.":
        return "Net loss margin";
      default:
        return "";
    }
  }

  static getProfitabilityType(val) {
    switch (val) {
      case "0 to 10%":
      case "0 to 10%.":
      case "10% to 50%":
      case "10% to 50%.":
        return 2;
      case "-10% to 0":
      case "-10% to 0.":
      case "-50% to -10%":
      case "-50% to -10%.":
        return 3;
      default:
        return "";
    }
  }

  static getEmployeeMsg(val, mainStaffSize) {
    try {
      let minVal;
      let newVal = val
          .split("")
          .filter(ch => (ch >= "0" && ch <= "9") || ch === "-")
          .join("");
      if (newVal.includes("-")) {
        minVal = newVal.split("-")[0];
      } else minVal = newVal;

      if (minVal >= 1 && minVal <= 100)
        return "Small company compared to other";
      else if (minVal >= 101) return "Large company compared to other";
      else
        return mainStaffSize
            ? `The company main staff contains ${mainStaffSize} people`
            : "";
    } catch (e) {
      return mainStaffSize
          ? `The company main staff contains ${mainStaffSize} people`
          : "";
    }
  }

  static getEmployeeIcon(val) {
    try {
      let minVal;
      let newVal = val
          .split("")
          .filter(ch => (ch >= "0" && ch <= "9") || ch === "-")
          .join("");
      if (newVal.includes("-")) {
        minVal = newVal.split("-")[0];
      } else minVal = newVal;

      if (minVal >= 1 && minVal <= 100) return this.getIconByNumber(5);
      else if (minVal >= 101) return this.getIconByNumber(4);
      else return this.getIconByNumber("");
    } catch (e) {
      return this.getIconByNumber("");
    }
  }

  static getParenthesisInfo(val) {
    return val != null && val.indexOf("(") !== -1
        ? val.substr(val.indexOf("("))
        : "";
  }

  static deleteParenthesisInfo(val) {
    if (val != null && val.indexOf("(") !== -1)
      return val.substr(0, val.indexOf("("));
    else return val;
  }

  static getLands() {
    return [
      "Any Destination",
      "United States",
      "Latin America",
      "Europe",
      "Asia",
      "Africa",
      "Middle East"
    ];
  }

  static getCountries() {
    return [
      "Afghanistan",
      "Albania",
      "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antarctica",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegowina",
      "Botswana",
      "Bouvet Island",
      "Brazil",
      "British Indian Ocean Territory",
      "Brunei Darussalam",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Cayman Islands",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Christmas Island",
      "Cocos (Keeling) Islands",
      "Colombia",
      "Comoros",
      "Congo",
      "Congo, the Democratic Republic of the",
      "Cook Islands",
      "Costa Rica",
      "Cote dIvoire",
      "Croatia (Hrvatska)",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "East Timor",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Ethiopia",
      "Falkland Islands (Malvinas)",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "France Metropolitan",
      "French Guiana",
      "French Polynesia",
      "French Southern Territories",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Heard and Mc Donald Islands",
      "Holy See (Vatican City State)",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran (Islamic Republic of)",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea, Democratic People's Republic of",
      "Korea, Republic of",
      "Kuwait",
      "Kyrgyzstan",
      "Lao, People's Democratic Republic",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libyan Arab Jamahiriya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macau",
      "Macedonia, The Former Yugoslav Republic of",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia, Federated States of",
      "Moldova, Republic of",
      "Monaco",
      "Mongolia",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "Netherlands Antilles",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "Northern Mariana Islands",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Pitcairn",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Reunion",
      "Romania",
      "Russian Federation",
      "Rwanda",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia (Slovak Republic)",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Georgia and the South Sandwich Islands",
      "Spain",
      "Sri Lanka",
      "St. Helena",
      "St. Pierre and Miquelon",
      "Sudan",
      "Suriname",
      "Svalbard and Jan Mayen Islands",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syrian Arab Republic",
      "Taiwan, Province of China",
      "Tajikistan",
      "Tanzania, United Republic of",
      "Thailand",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks and Caicos Islands",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "United States Minor Outlying Islands",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela",
      "Vietnam",
      "Virgin Islands (British)",
      "Virgin Islands (U.S.)",
      "Wallis and Futuna Islands",
      "Western Sahara",
      "Yemen",
      "Yugoslavia",
      "Zambia",
      "Zimbabwe"
    ];
  }

  static getCountry(countryName) {
    switch (countryName) {
      case "Montenegro":
        return require("../images/countries/ME.svg");
      case "Luxembourg":
        return require("../images/countries/LU.svg");
      case "Bosnia and Herzegovina":
        return require("../images/countries/BA.svg");
      case "Anguilla":
        return require("../images/countries/AI.svg");
      case "Antigua and Barbuda":
        return require("../images/countries/AG.svg");
      case "Andorra":
        return require("../images/countries/AD.svg");
      case "Bahamas":
        return require("../images/countries/BS.svg");
      case "Barbados":
        return require("../images/countries/BB.svg");
      case "Papua New Guinea":
        return require("../images/countries/PG.svg");
      case "Guyana":
        return require("../images/countries/GY.svg");
      case "Grenada":
        return require("../images/countries/GD.svg");
      case "Laos":
        return require("../images/countries/LA.svg");
      case "Macedonia":
        return require("../images/countries/MK.svg");
      case "Iceland":
        return require("../images/countries/IS.svg");
      case "Brunei Darussalam":
        return require("../images/countries/BN.svg");
      case "Madagascar":
        return require("../images/countries/MG.svg");
      case "Liberia":
        return require("../images/countries/LR.svg");
      case "Suriname":
        return require("../images/countries/SR.svg");
      case "Mauritania":
        return require("../images/countries/MR.svg");
      case "Mali":
        return require("../images/countries/ML.svg");
      case "Bahrain":
        return require("../images/countries/BH.svg");
      case "Saint Vincent and the Grenadines":
        return require("../images/countries/VC.svg");
      case "Moldova, Republic of":
        return require("../images/countries/MD.svg");
      case "Kyrgyzstan":
        return require("../images/countries/KG.svg");
      case "French Polynesia":
        return require("../images/countries/PF.svg");
      case "Congo":
        return require("../images/countries/CD.svg");
      case "Botswana":
        return require("../images/countries/BW.svg");
      case "Belarus":
        return require("../images/countries/BY.svg");
      case "Armenia":
        return require("../images/countries/AM.svg");
      case "Afghanistan":
        return require("../images/countries/AF.svg");
      case "Sudan":
        return require("../images/countries/SD.svg");
      case "Saint Martin":
        return require("../images/countries/FR.svg");
      case "Djibouti":
        return require("../images/countries/DJ.svg");
      case "Cote d'Ivoire":
        return require("../images/countries/CI.svg");
      case "Cote dIvoire":
        return require("../images/countries/CI.svg");
      case "Albania":
        return require("../images/countries/AL.svg");
      case "Uganda":
        return require("../images/countries/UG.svg");
      case "Togo":
        return require("../images/countries/TG.svg");
      case "Macau":
        return require("../images/countries/MO.svg");
      case "Gabon":
        return require("../images/countries/GA.svg");
      case "Benin":
        return require("../images/countries/BJ.svg");
      case "East Timor":
        return require("../images/countries/TL.svg");
      case "Solomon Islands":
        return require("../images/countries/SB.svg");
      case "Slovakia":
        return require("../images/countries/SK.svg");
      case "New Caledonia":
        return require("../images/countries/FR.svg");
      case "Guinea":
        return require("../images/countries/GN.svg");
      case "Vanuatu":
        return require("../images/countries/VU.svg");
      case "Jamaica":
        return require("../images/countries/JM.svg");
      case "Turkmenistan":
        return require("../images/countries/TM.svg");
      case "Palestine":
        return require("../images/countries/JO.svg");
      case "Libya":
        return require("../images/countries/LY.svg");
      case "Burundi":
        return require("../images/countries/BI.svg");
      case "Nicaragua":
        return require("../images/countries/NI.svg");
      case "Azerbaijan":
        return require("../images/countries/AZ.svg");
      case "Senegal":
        return require("../images/countries/SN.svg");
      case "Tajikistan":
        return require("../images/countries/TJ.svg");
      case "Georgia":
        return require("../images/countries/GE.svg");
      case "Tunisia":
        return require("../images/countries/TN.svg");
      case "North Korea":
        return require("../images/countries/KP.svg");
      case "Mongolia":
        return require("../images/countries/MN.svg");
      case "Cuba":
        return require("../images/countries/CU.svg");
      case "Rwanda":
        return require("../images/countries/RW.svg");
      case "Croatia":
        return require("../images/countries/HR.svg");
      case "Uzbekistan":
        return require("../images/countries/UZ.svg");
      case "Zimbabwe":
        return require("../images/countries/ZW.svg");
      case "Namibia":
        return require("../images/countries/NA.svg");
      case "Fiji":
        return require("../images/countries/FJ.svg");
      case "Trinidad and Tobago":
        return require("../images/countries/TT.svg");
      case "Congo, the Democratic Republic of the":
        return require("../images/countries/CD.svg");
      case "Haiti":
        return require("../images/countries/HT.svg");
      case "Lithuania":
        return require("../images/countries/LT.svg");
      case "Estonia":
        return require("../images/countries/EE.svg");
      case "Israel":
        return require("../images/countries/IL.svg");
      case "Mozambique":
        return require("../images/countries/MZ.svg");
      case "Jordan":
        return require("../images/countries/JO.svg");
      case "Bolivia":
        return require("../images/countries/BO.svg");
      case "Angola":
        return require("../images/countries/AO.svg");
      case "South Korea":
        return require("../images/countries/KR.svg");
      case "Brazil":
        return require("../images/countries/BR.svg");
      case "China":
        return require("../images/countries/CN.svg");
      case "CHINA":
        return require("../images/countries/CN.svg");
      case "United Kingdom":
        return require("../images/countries/GB.svg");
      case "Canada":
        return require("../images/countries/CA.svg");
      case "Korea, Rep.":
        return require("../images/countries/KR.svg");
      case "United States":
        return require("../images/countries/US.svg");
      case "Italy":
        return require("../images/countries/IT.svg");
      case "Vietnam":
        return require("../images/countries/VN.svg");
      case "Mexico":
        return require("../images/countries/MX.svg");
      case "Uzbekstan":
        return require("../images/countries/UZ.svg");
      case "Germany":
        return require("../images/countries/DE.svg");
      case "Netherlands":
        return require("../images/countries/NL.svg");
      case "Turkey":
        return require("../images/countries/TR.svg");
      case "Russia":
        return require("../images/countries/RU.svg");
      case "Ukraine":
        return require("../images/countries/UA.svg");
      case "Colombia":
        return require("../images/countries/CO.svg");
      case "Columbia":
        return require("../images/countries/CO.svg");
      case "Finland":
        return require("../images/countries/FI.svg");
      case "Iran":
        return require("../images/countries/IR.svg");
      case "France":
        return require("../images/countries/FR.svg");
      case "Poland":
        return require("../images/countries/PL.svg");
      case "Belgium":
        return require("../images/countries/BE.svg");
      case "Spain":
        return require("../images/countries/ES.svg");
      case "Venezuela":
        return require("../images/countries/VE.svg");
      case "Saudi Arabia":
        return require("../images/countries/SA.svg");
      case "Kuwait":
        return require("../images/countries/KW.svg");
      case "Uruguay":
        return require("../images/countries/UY.svg");
      case "Ireland":
        return require("../images/countries/IE.svg");
      case "Japan":
        return require("../images/countries/JP.svg");
      case "India":
        return require("../images/countries/IN.svg");
      case "Philippines":
        return require("../images/countries/PH.svg");
      case "Sweden":
        return require("../images/countries/SE.svg");
      case "Thailand":
        return require("../images/countries/TH.svg");
      case "South Africa":
        return require("../images/countries/ZA.svg");
      case "New Zealand":
        return require("../images/countries/NZ.svg");
      case "Australia":
        return require("../images/countries/AU.svg");
      case "Other":
        return require("../images/countries/WW.svg");
      case "Austria":
        return require("../images/countries/AT.svg");
      case "Slovenia":
        return require("../images/countries/SI.svg");
      case "Iraq":
        return require("../images/countries/IQ.svg");
      case "Cyprus":
        return require("../images/countries/CY.svg");
      case "United Arab Emirates":
        return require("../images/countries/AE.svg");
      case "Malta":
        return require("../images/countries/MT.svg");
      case "Pakistan":
        return require("../images/countries/PK.svg");
      case "Czech Republic":
        return require("../images/countries/CZ.svg");
      case "Chile":
        return require("../images/countries/CL.svg");
      case "Oman":
        return require("../images/countries/OM.svg");
      case "Costa Rica":
        return require("../images/countries/CR.svg");
      case "Indonesia":
        return require("../images/countries/ID.svg");
      case "Yemen":
        return require("../images/countries/YE.svg");
      case "Kirghizia":
        return require("../images/countries/KG.svg");
      case "Malaysia":
        return require("../images/countries/MY.svg");
      case "Portugal":
        return require("../images/countries/PT.svg");
      case "El Salvador":
        return require("../images/countries/SV.svg");
      case "Aruba":
        return require("../images/countries/AW.svg");
      case "Sierra Leone":
        return require("../images/countries/SL.svg");
      case "Nigeria":
        return require("../images/countries/NG.svg");
      case "Qatar":
        return require("../images/countries/QA.svg");
      case "Maldives":
        return require("../images/countries/MV.svg");
      case "Dominica":
        return require("../images/countries/DM.svg");
      case "Nepal":
        return require("../images/countries/NP.svg");
      case "Zambia":
        return require("../images/countries/ZM.svg");
      case "Myanmar":
        return require("../images/countries/MM.svg");
      case "Morocco":
        return require("../images/countries/MA.svg");
      case "Switzerland":
        return require("../images/countries/CH.svg");
      case "Cambodia":
        return require("../images/countries/KH.svg");
      case "Cameroon":
        return require("../images/countries/CM.svg");
      case "Syrian Arab Republic":
      case "Syria":
        return require("../images/countries/SY.svg");
      case "Bangladesh":
        return require("../images/countries/BD.svg");
      case "Romania":
        return require("../images/countries/RO.svg");
      case "Mauritius":
        return require("../images/countries/MU.svg");
      case "Guatemala":
        return require("../images/countries/GT.svg");
      case "Tanzania":
        return require("../images/countries/TZ.svg");
      case "Ghana":
        return require("../images/countries/GH.svg");
      case "Peru":
        return require("../images/countries/PE.svg");
      case "Sri Lanka":
        return require("../images/countries/LK.svg");
      case "Republic of South Sudan":
        return require("../images/countries/SD.svg");
      case "Panama":
        return require("../images/countries/PA.svg");
      case "HongKong":
        return require("../images/countries/HK.svg");
      case "Hong Kong":
        return require("../images/countries/HK.svg");
      case "Argentina":
        return require("../images/countries/AR.svg");
      case "Hungary":
        return require("../images/countries/HU.svg");
      case "Denmark":
        return require("../images/countries/DK.svg");
      case "Greece":
        return require("../images/countries/GR.svg");
      case "Taiwan":
        return require("../images/countries/TW.svg");
      case "Lao PDR":
        return require("../images/countries/LA.svg");
      case "New York":
        return require("../images/countries/US.svg");
      case "Croatia Rep":
        return require("../images/countries/HR.svg");
      case "Paraguay":
        return require("../images/countries/PY.svg");
      case "Serbia":
        return require("../images/countries/RS.svg");
      case "Kazakhstan":
        return require("../images/countries/KZ.svg");
      case "Ecuador":
        return require("../images/countries/EC.svg");
      case "Egypt":
        return require("../images/countries/EG.svg");
      case "Singapure":
        return require("../images/countries/SG.svg");
      case "Singapore":
        return require("../images/countries/SG.svg");
      case "Dubai":
        return require("../images/countries/AE.svg");
      case "Reunion":
        return require("../images/countries/FR.svg");
      case "Honduras":
        return require("../images/countries/HN.svg");
      case "Slovakia(Slovak Republic)":
        return require("../images/countries/SK.svg");
      case "Ethiopia":
        return require("../images/countries/ET.svg");
      case "Norway":
        return require("../images/countries/NO.svg");
      case "Latvia":
        return require("../images/countries/LV.svg");
      case "Lebanon":
        return require("../images/countries/LB.svg");
      case "Bulgaria":
        return require("../images/countries/BG.svg");
      case "Puerto Rico":
        return require("../images/countries/PR.svg");
      case "Bahrian":
        return require("../images/countries/BH.svg");
      case "Algeria":
        return require("../images/countries/DZ.svg");
      case "Dominican Republic":
        return require("../images/countries/DO.svg");
      case "Kenya":
        return require("../images/countries/KE.svg");
      case "unknown":
        return require("../images/countries/WW.svg");
      case "AF":
        return require("../images/countries/AF.svg");
      case "AX":
        return require("../images/countries/AX.svg");
      case "AL":
        return require("../images/countries/AL.svg");
      case "DZ":
        return require("../images/countries/DZ.svg");
      case "AD":
        return require("../images/countries/AD.svg");
      case "AO":
        return require("../images/countries/AO.svg");
      case "AI":
        return require("../images/countries/AI.svg");
      case "AG":
        return require("../images/countries/AG.svg");
      case "AR":
        return require("../images/countries/AR.svg");
      case "AM":
        return require("../images/countries/AM.svg");
      case "AW":
        return require("../images/countries/AW.svg");
      case "AU":
        return require("../images/countries/AU.svg");
      case "AT":
        return require("../images/countries/AT.svg");
      case "AZ":
        return require("../images/countries/AZ.svg");
      case "BS":
        return require("../images/countries/BS.svg");
      case "BH":
        return require("../images/countries/BH.svg");
      case "BD":
        return require("../images/countries/BD.svg");
      case "BB":
        return require("../images/countries/BB.svg");
      case "BY":
        return require("../images/countries/BY.svg");
      case "BE":
        return require("../images/countries/BE.svg");
      case "BZ":
        return require("../images/countries/BZ.svg");
      case "BJ":
        return require("../images/countries/BJ.svg");
      case "BM":
        return require("../images/countries/BM.svg");
      case "BT":
        return require("../images/countries/BT.svg");
      case "BO":
        return require("../images/countries/BO.svg");
      case "BA":
        return require("../images/countries/BA.svg");
      case "BW":
        return require("../images/countries/BW.svg");
      case "BR":
        return require("../images/countries/BR.svg");
      case "BN":
        return require("../images/countries/BN.svg");
      case "BG":
        return require("../images/countries/BG.svg");
      case "BF":
        return require("../images/countries/BF.svg");
      case "BI":
        return require("../images/countries/BI.svg");
      case "CV":
        return require("../images/countries/CV.svg");
      case "KH":
        return require("../images/countries/KH.svg");
      case "CM":
        return require("../images/countries/CM.svg");
      case "CA":
        return require("../images/countries/CA.svg");
      case "KY":
        return require("../images/countries/KY.svg");
      case "CF":
        return require("../images/countries/CF.svg");
      case "TD":
        return require("../images/countries/TD.svg");
      case "CL":
        return require("../images/countries/CL.svg");
      case "CN":
        return require("../images/countries/CN.svg");
      case "CO":
        return require("../images/countries/CO.svg");
      case "KM":
        return require("../images/countries/KM.svg");
      case "CG":
        return require("../images/countries/CG.svg");
      case "CD":
        return require("../images/countries/CD.svg");
      case "CR":
        return require("../images/countries/CR.svg");
      case "CI":
        return require("../images/countries/CI.svg");
      case "HR":
        return require("../images/countries/HR.svg");
      case "CU":
        return require("../images/countries/CU.svg");
      case "CY":
        return require("../images/countries/CY.svg");
      case "CZ":
        return require("../images/countries/CZ.svg");
      case "DK":
        return require("../images/countries/DK.svg");
      case "DJ":
        return require("../images/countries/DJ.svg");
      case "DM":
        return require("../images/countries/DM.svg");
      case "DO":
        return require("../images/countries/DO.svg");
      case "EC":
        return require("../images/countries/EC.svg");
      case "EG":
        return require("../images/countries/EG.svg");
      case "SV":
        return require("../images/countries/SV.svg");
      case "GQ":
        return require("../images/countries/GQ.svg");
      case "ER":
        return require("../images/countries/ER.svg");
      case "EE":
        return require("../images/countries/EE.svg");
      case "SZ":
        return require("../images/countries/SZ.svg");
      case "ET":
        return require("../images/countries/ET.svg");
      case "FK":
        return require("../images/countries/FK.svg");
      case "FJ":
        return require("../images/countries/FJ.svg");
      case "FI":
        return require("../images/countries/FI.svg");
      case "FR":
        return require("../images/countries/FR.svg");
      case "PF":
        return require("../images/countries/PF.svg");
      case "GA":
        return require("../images/countries/GA.svg");
      case "GM":
        return require("../images/countries/GM.svg");
      case "GE":
        return require("../images/countries/GE.svg");
      case "DE":
        return require("../images/countries/DE.svg");
      case "GH":
        return require("../images/countries/GH.svg");
      case "GI":
        return require("../images/countries/GI.svg");
      case "GR":
        return require("../images/countries/GR.svg");
      case "GD":
        return require("../images/countries/GD.svg");
      case "GT":
        return require("../images/countries/GT.svg");
      case "GG":
        return require("../images/countries/GG.svg");
      case "GN":
        return require("../images/countries/GN.svg");
      case "GW":
        return require("../images/countries/GW.svg");
      case "GY":
        return require("../images/countries/GY.svg");
      case "HT":
        return require("../images/countries/HT.svg");
      case "HN":
        return require("../images/countries/HN.svg");
      case "HK":
        return require("../images/countries/HK.svg");
      case "HU":
        return require("../images/countries/HU.svg");
      case "IS":
        return require("../images/countries/IS.svg");
      case "IN":
        return require("../images/countries/IN.svg");
      case "ID":
        return require("../images/countries/ID.svg");
      case "IR":
        return require("../images/countries/IR.svg");
      case "IQ":
        return require("../images/countries/IQ.svg");
      case "IE":
        return require("../images/countries/IE.svg");
      case "IM":
        return require("../images/countries/IM.svg");
      case "IL":
        return require("../images/countries/IL.svg");
      case "IT":
        return require("../images/countries/IT.svg");
      case "JM":
        return require("../images/countries/JM.svg");
      case "JP":
        return require("../images/countries/JP.svg");
      case "JE":
        return require("../images/countries/JE.svg");
      case "JO":
        return require("../images/countries/JO.svg");
      case "KZ":
        return require("../images/countries/KZ.svg");
      case "KE":
        return require("../images/countries/KE.svg");
      case "KP":
        return require("../images/countries/KP.svg");
      case "KR":
        return require("../images/countries/KR.svg");
      case "KW":
        return require("../images/countries/KW.svg");
      case "KG":
        return require("../images/countries/KG.svg");
      case "LA":
        return require("../images/countries/LA.svg");
      case "LV":
        return require("../images/countries/LV.svg");
      case "LB":
        return require("../images/countries/LB.svg");
      case "LS":
        return require("../images/countries/LS.svg");
      case "LR":
        return require("../images/countries/LR.svg");
      case "LY":
        return require("../images/countries/LY.svg");
      case "LI":
        return require("../images/countries/LI.svg");
      case "LT":
        return require("../images/countries/LT.svg");
      case "LU":
        return require("../images/countries/LU.svg");
      case "MO":
        return require("../images/countries/MO.svg");
      case "MK":
        return require("../images/countries/MK.svg");
      case "MG":
        return require("../images/countries/MG.svg");
      case "MW":
        return require("../images/countries/MW.svg");
      case "MY":
        return require("../images/countries/MY.svg");
      case "MV":
        return require("../images/countries/MV.svg");
      case "ML":
        return require("../images/countries/ML.svg");
      case "MT":
        return require("../images/countries/MT.svg");
      case "MR":
        return require("../images/countries/MR.svg");
      case "MU":
        return require("../images/countries/MU.svg");
      case "MX":
        return require("../images/countries/MX.svg");
      case "FM":
        return require("../images/countries/FM.svg");
      case "MD":
        return require("../images/countries/MD.svg");
      case "MC":
        return require("../images/countries/MC.svg");
      case "MN":
        return require("../images/countries/MN.svg");
      case "ME":
        return require("../images/countries/ME.svg");
      case "MS":
        return require("../images/countries/MS.svg");
      case "MA":
        return require("../images/countries/MA.svg");
      case "MZ":
        return require("../images/countries/MZ.svg");
      case "MM":
        return require("../images/countries/MM.svg");
      case "NA":
        return require("../images/countries/NA.svg");
      case "NP":
        return require("../images/countries/NP.svg");
      case "NL":
        return require("../images/countries/NL.svg");
      case "NZ":
        return require("../images/countries/NZ.svg");
      case "NI":
        return require("../images/countries/NI.svg");
      case "NE":
        return require("../images/countries/NE.svg");
      case "NG":
        return require("../images/countries/NG.svg");
      case "NO":
        return require("../images/countries/NO.svg");
      case "OM":
        return require("../images/countries/OM.svg");
      case "PK":
        return require("../images/countries/PK.svg");
      case "PW":
        return require("../images/countries/PW.svg");
      case "PA":
        return require("../images/countries/PA.svg");
      case "PG":
        return require("../images/countries/PG.svg");
      case "PY":
        return require("../images/countries/PY.svg");
      case "PE":
        return require("../images/countries/PE.svg");
      case "PH":
        return require("../images/countries/PH.svg");
      case "PL":
        return require("../images/countries/PL.svg");
      case "PT":
        return require("../images/countries/PT.svg");
      case "PR":
        return require("../images/countries/PR.svg");
      case "QA":
        return require("../images/countries/QA.svg");
      case "RO":
        return require("../images/countries/RO.svg");
      case "RU":
        return require("../images/countries/RU.svg");
      case "RW":
        return require("../images/countries/RW.svg");
      case "SH":
        return require("../images/countries/SH.svg");
      case "KN":
        return require("../images/countries/KN.svg");
      case "LC":
        return require("../images/countries/LC.svg");
      case "VC":
        return require("../images/countries/VC.svg");
      case "WS":
        return require("../images/countries/WS.svg");
      case "SM":
        return require("../images/countries/SM.svg");
      case "ST":
        return require("../images/countries/ST.svg");
      case "SA":
        return require("../images/countries/SA.svg");
      case "SN":
        return require("../images/countries/SN.svg");
      case "RS":
        return require("../images/countries/RS.svg");
      case "SC":
        return require("../images/countries/SC.svg");
      case "SL":
        return require("../images/countries/SL.svg");
      case "SG":
        return require("../images/countries/SG.svg");
      case "SK":
        return require("../images/countries/SK.svg");
      case "SI":
        return require("../images/countries/SI.svg");
      case "SB":
        return require("../images/countries/SB.svg");
      case "SO":
        return require("../images/countries/SO.svg");
      case "ZA":
        return require("../images/countries/ZA.svg");
      case "ES":
        return require("../images/countries/ES.svg");
      case "LK":
        return require("../images/countries/LK.svg");
      case "SD":
        return require("../images/countries/SD.svg");
      case "SR":
        return require("../images/countries/SR.svg");
      case "SE":
        return require("../images/countries/SE.svg");
      case "CH":
        return require("../images/countries/CH.svg");
      case "SY":
        return require("../images/countries/SY.svg");
      case "TW":
        return require("../images/countries/TW.svg");
      case "TJ":
        return require("../images/countries/TJ.svg");
      case "TZ":
        return require("../images/countries/TZ.svg");
      case "TH":
        return require("../images/countries/TH.svg");
      case "TL":
        return require("../images/countries/TL.svg");
      case "TG":
        return require("../images/countries/TG.svg");
      case "TO":
        return require("../images/countries/TO.svg");
      case "TT":
        return require("../images/countries/TT.svg");
      case "TN":
        return require("../images/countries/TN.svg");
      case "TR":
        return require("../images/countries/TR.svg");
      case "TM":
        return require("../images/countries/TM.svg");
      case "TC":
        return require("../images/countries/TC.svg");
      case "UG":
        return require("../images/countries/UG.svg");
      case "UA":
        return require("../images/countries/UA.svg");
      case "AE":
        return require("../images/countries/AE.svg");
      case "GB":
        return require("../images/countries/GB.svg");
      case "US":
        return require("../images/countries/US.svg");
      case "UY":
        return require("../images/countries/UY.svg");
      case "UZ":
        return require("../images/countries/UZ.svg");
      case "VU":
        return require("../images/countries/VU.svg");
      case "VE":
        return require("../images/countries/VE.svg");
      case "VN":
        return require("../images/countries/VN.svg");
      case "VG":
        return require("../images/countries/VG.svg");
      case "YE":
        return require("../images/countries/YE.svg");
      case "ZM":
        return require("../images/countries/ZM.svg");
      case "ZW":
        return require("../images/countries/ZW.svg");
      default:
        return null;
    }
  }
  static fixNumber(val) {
    try {
      if (val === "" || val == null) return val;
      if (!isNaN(val)) return new Intl.NumberFormat("en").format(val);
      else if (val.length > 1 && !isNaN(val.substr(1)))
        return (
            val.substr(0, 1) + new Intl.NumberFormat("en").format(val.substr(1))
        );
      else return val;
    } catch (e) {
      return "";
    }
  }

  static roundDivision(val1, val2) {
    try {
      const res = Math.round(val1 / val2);
      return isNaN(res) || res === Infinity ? "" : res;
    } catch (e) {
      return "";
    }
  }

  static totalExportString(totalExport) {
    if (totalExport === 0) return 0;
    else if (!totalExport) {
      return "Unknown";
    } else if (totalExport < 1000000) {
      return "Below $1M";
    } else if (totalExport >= 1000000 && totalExport < 5000000) {
      return "$1M - $5M";
    } else if (totalExport >= 5000000 && totalExport < 20000000) {
      return "$5M - $20M";
    } else if (totalExport >= 20000000 && totalExport < 50000000) {
      return "$20M - $50M";
    } else if (totalExport >= 50000000 && totalExport < 100000000) {
      return "$50M - $100M";
    } else if (totalExport >= 100000000 && totalExport < 200000000) {
      return "$100M - $200M";
    } else if (totalExport >= 200000000 && totalExport < 500000000) {
      return "$200M - $500M";
    } else {
      return "Above $500M";
    }
  }

  static shipmentsCountString(totalShipments) {
    if (totalShipments === 0) {
      return 0;
    } else if (!totalShipments) {
      return "Unknown";
    } else if (totalShipments < 5) {
      return "Below 5";
    } else if (totalShipments >= 5 && totalShipments < 10) {
      return "5 - 10";
    } else if (totalShipments >= 10 && totalShipments < 20) {
      return "10 - 20";
    } else if (totalShipments >= 20 && totalShipments < 50) {
      return "20 - 50";
    } else if (totalShipments >= 50 && totalShipments < 100) {
      return "50 - 100";
    } else if (totalShipments >= 100 && totalShipments < 200) {
      return "100 - 200";
    } else if (totalShipments >= 200 && totalShipments < 500) {
      return "200 - 500";
    } else if (totalShipments >= 500 && totalShipments < 1000) {
      return "500 - 1,000";
    } else if (totalShipments >= 1000 && totalShipments < 5000) {
      return "1,000 - 5,000";
    } else if (totalShipments >= 5000 && totalShipments < 10000) {
      return "5,000 - 10,000";
    } else {
      return "Above 10,000";
    }
  }

  static calcTaxRating(report) {
    let date = new Date();
    date.setDate(date.getDate() - 180);
    const lastYear = date.getFullYear() - 1;
    let taxRating = "Not Eligible";
    let taxRatingBottomMsg = "Past eligible years: ";
    let taxRatingLbl = `Not eligible at ${lastYear}`;
    if (
        report != null &&
        report.taxRatingList !== undefined &&
        report.taxRatingList != null
    ) {
      for (let i = 0; i < report.taxRatingList.length; i++) {
        if (report.taxRatingList[i].year !== lastYear)
          taxRatingBottomMsg += report.taxRatingList[i].year + ", ";
        else taxRating = report.taxRatingList[i].rating;
      }
      if (taxRatingBottomMsg.length > 22) {
        taxRatingBottomMsg = taxRatingBottomMsg.substr(
            0,
            taxRatingBottomMsg.length - 2
        );
      } else {
        taxRatingBottomMsg = "Not eligible for tax rating A";
      }
    } else {
      taxRatingBottomMsg = "Not eligible for tax rating A";
    }
    if (taxRating === "A") {
      let sinceYear = lastYear;
      taxRatingLbl = "";
      for (let j = lastYear - 1; j > 2012; j--) {
        let found = false;
        for (let i = 0; !found && i < report.taxRatingList.length; i++)
          if (report.taxRatingList[i].year === j) found = true;
        if (!found) {
          sinceYear = j + 1;
          break;
        }
      }
      if (sinceYear === lastYear) {
        taxRatingBottomMsg = "Good Rating";
      } else {
        taxRatingBottomMsg = "Tax Rating A since " + sinceYear;
      }
    }
    return { taxRating, taxRatingBottomMsg, taxRatingLbl };
  }

  static isPdfVisibility() {
    return this.isPdf() && "hidden";
  }

  static isPdf() {
    return typeof window !== "undefined" && window.location.pathname.includes("/direct/supplierPdf");
  }
}

export default Utils;