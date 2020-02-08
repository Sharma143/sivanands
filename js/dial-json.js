var dialingCodes = [
  { Country: "Afghanistan", code: "+93" },
  { Country: "Albania", code: "+355" },
  { Country: "Algeria", code: "+213" },
  { Country: "American Samoa", code: "+1684" },
  { Country: "Andorra", code: "+376" },
  { Country: "Angola", code: "+244" },
  { Country: "Anguilla", code: "+1264" },
  { Country: "Antarctica", code: "+672" },
  { Country: "Antigua & Barbuda", code: "+1268" },
  { Country: "Argentina", code: "+54" },
  { Country: "Armenia", code: "+374" },
  { Country: "Aruba", code: "+297" },
  { Country: "Australia", code: "+61" },
  { Country: "Austria", code: "+43" },
  { Country: "Azerbaijan", code: "+994" },
  { Country: "Bahamas", code: "+1242" },
  { Country: "Bahrain", code: "+973" },
  { Country: "Bangladesh", code: "+880" },
  { Country: "Barbados", code: "+1246" },
  { Country: "Belarus", code: "+375" },
  { Country: "Belgium", code: "+32" },
  { Country: "Belize", code: "+501" },
  { Country: "Benin", code: "+229" },
  { Country: "Bermuda", code: "+1441" },
  { Country: "Bhutan", code: "+975" },
  { Country: "Bolivia", code: "+591" },
  { Country: "Bosnia", code: "+387" },
  { Country: "Botswana", code: "+267" },
  { Country: "Bouvet Island", code: "+47" },
  { Country: "Brazil", code: "+55" },
  { Country: "British Indian Ocean Territory", code: "+246" },
  { Country: "British Virgin Islands", code: "+1284" },
  { Country: "Brunei", code: "+673" },
  { Country: "Bulgaria", code: "+359" },
  { Country: "Burkina Faso", code: "+226" },
  { Country: "Burundi", code: "+257" },
  { Country: "Cambodia", code: "+855" },
  { Country: "Cameroon", code: "+237" },
  { Country: "Canada", code: "+1" },
  { Country: "Cape Verde", code: "+238" },
  { Country: "Caribbean Netherlands", code: "+599" },
  { Country: "Cayman Islands", code: "+1345" },
  { Country: "Central African Republic", code: "+236" },
  { Country: "Chad", code: "+235" },
  { Country: "Chile", code: "+56" },
  { Country: "China", code: "+86" },
  { Country: "Christmas Island", code: "+61" },
  { Country: "Cocos (Keeling) Islands", code: "+61" },
  { Country: "Colombia", code: "+57" },
  { Country: "Comoros", code: "+269" },
  { Country: "Congo - Brazzaville", code: "+242" },
  { Country: "Congo - Kinshasa", code: "+243" },
  { Country: "Cook Islands", code: "+682" },
  { Country: "Costa Rica", code: "+506" },
  { Country: "Croatia", code: "+385" },
  { Country: "Cuba", code: "+53" },
  { Country: "Curaçao", code: "+599" },
  { Country: "Cyprus", code: "+357" },
  { Country: "Czech Republic", code: "+420" },
  { Country: "Côte d'Ivoire", code: "+225" },
  { Country: "Denmark", code: "+45" },
  { Country: "Djibouti", code: "+253" },
  { Country: "Dominica", code: "+1767" },
  { Country: "Dominican Republic", code: "+1809" },
  { Country: "Dominican Republic", code: "+1829" },
  { Country: "Dominican Republic", code: "+1849" },
  { Country: "Ecuador", code: "+593" },
  { Country: "Egypt", code: "+20" },
  { Country: "El Salvador", code: "+503" },
  { Country: "Equatorial Guinea", code: "+240" },
  { Country: "Eritrea", code: "+291" },
  { Country: "Estonia", code: "+372" },
  { Country: "Ethiopia", code: "+251" },
  { Country: "Falkland Islands", code: "+500" },
  { Country: "Faroe Islands", code: "+298" },
  { Country: "Fiji", code: "+679" },
  { Country: "Finland", code: "+358" },
  { Country: "France", code: "+33" },
  { Country: "French Guiana", code: "+594" },
  { Country: "French Polynesia", code: "+689" },
  { Country: "French Southern Territories", code: "+262" },
  { Country: "Gabon", code: "+241" },
  { Country: "Gambia", code: "+220" },
  { Country: "Georgia", code: "+995" },
  { Country: "Germany", code: "+49" },
  { Country: "Ghana", code: "+233" },
  { Country: "Gibraltar", code: "+350" },
  { Country: "Greece", code: "+30" },
  { Country: "Greenland", code: "+299" },
  { Country: "Grenada", code: "+1473" },
  { Country: "Guadeloupe", code: "+590" },
  { Country: "Guam", code: "+1671" },
  { Country: "Guatemala", code: "+502" },
  { Country: "Guernsey", code: "+44" },
  { Country: "Guinea", code: "+224" },
  { Country: "Guinea-Bissau", code: "+245" },
  { Country: "Guyana", code: "+592" },
  { Country: "Haiti", code: "+509" },
  { Country: "Heard & McDonald Islands", code: "+672" },
  { Country: "Honduras", code: "+504" },
  { Country: "Hong Kong", code: "+852" },
  { Country: "Hungary", code: "+36" },
  { Country: "Iceland", code: "+354" },
  { Country: "India", code: "+91" },
  { Country: "Indonesia", code: "+62" },
  { Country: "Iran", code: "+98" },
  { Country: "Iraq", code: "+964" },
  { Country: "Ireland", code: "+353" },
  { Country: "Isle of Man", code: "+44" },
  { Country: "Israel", code: "+972" },
  { Country: "Italy", code: "+39" },
  { Country: "Jamaica", code: "+1876" },
  { Country: "Japan", code: "+81" },
  { Country: "Jersey", code: "+44" },
  { Country: "Jordan", code: "+962" },
  { Country: "Kazakhstan", code: "+7" },
  { Country: "Kenya", code: "+254" },
  { Country: "Kiribati", code: "+686" },
  { Country: "Kuwait", code: "+965" },
  { Country: "Kyrgyzstan", code: "+996" },
  { Country: "Laos", code: "+856" },
  { Country: "Latvia", code: "+371" },
  { Country: "Lebanon", code: "+961" },
  { Country: "Lesotho", code: "+266" },
  { Country: "Liberia", code: "+231" },
  { Country: "Libya", code: "+218" },
  { Country: "Liechtenstein", code: "+423" },
  { Country: "Lithuania", code: "+370" },
  { Country: "Luxembourg", code: "+352" },
  { Country: "Macau", code: "+853" },
  { Country: "Macedonia", code: "+389" },
  { Country: "Madagascar", code: "+261" },
  { Country: "Malawi", code: "+265" },
  { Country: "Malaysia", code: "+60" },
  { Country: "Maldives", code: "+960" },
  { Country: "Mali", code: "+223" },
  { Country: "Malta", code: "+356" },
  { Country: "Marshall Islands", code: "+692" },
  { Country: "Martinique", code: "+596" },
  { Country: "Mauritania", code: "+222" },
  { Country: "Mauritius", code: "+230" },
  { Country: "Mayotte", code: "+262" },
  { Country: "Mexico", code: "+52" },
  { Country: "Micronesia", code: "+691" },
  { Country: "Moldova", code: "+373" },
  { Country: "Monaco", code: "+377" },
  { Country: "Mongolia", code: "+976" },
  { Country: "Montenegro", code: "+382" },
  { Country: "Montserrat", code: "+1664" },
  { Country: "Morocco", code: "+212" },
  { Country: "Mozambique", code: "+258" },
  { Country: "Myanmar", code: "+95" },
  { Country: "Namibia", code: "+264" },
  { Country: "Nauru", code: "+674" },
  { Country: "Nepal", code: "+977" },
  { Country: "Netherlands", code: "+31" },
  { Country: "New Caledonia", code: "+687" },
  { Country: "New Zealand", code: "+64" },
  { Country: "Nicaragua", code: "+505" },
  { Country: "Niger", code: "+227" },
  { Country: "Nigeria", code: "+234" },
  { Country: "Niue", code: "+683" },
  { Country: "Norfolk Island", code: "+672" },
  { Country: "North Korea", code: "+850" },
  { Country: "Northern Mariana Islands", code: "+1670" },
  { Country: "Norway", code: "+47" },
  { Country: "Oman", code: "+968" },
  { Country: "Pakistan", code: "+92" },
  { Country: "Palau", code: "+680" },
  { Country: "Palestine", code: "+970" },
  { Country: "Panama", code: "+507" },
  { Country: "Papua New Guinea", code: "+675" },
  { Country: "Paraguay", code: "+595" },
  { Country: "Peru", code: "+51" },
  { Country: "Philippines", code: "+63" },
  { Country: "Pitcairn Islands", code: "+870" },
  { Country: "Poland", code: "+48" },
  { Country: "Portugal", code: "+351" },
  { Country: "Puerto Rico", code: "+1" },
  { Country: "Qatar", code: "+974" },
  { Country: "Romania", code: "+40" },
  { Country: "Russia", code: "+7" },
  { Country: "Rwanda", code: "+250" },
  { Country: "Réunion", code: "+262" },
  { Country: "Samoa", code: "+685" },
  { Country: "San Marino", code: "+378" },
  { Country: "Saudi Arabia", code: "+966" },
  { Country: "Senegal", code: "+221" },
  { Country: "Serbia", code: "+381" },
  { Country: "Seychelles", code: "+248" },
  { Country: "Sierra Leone", code: "+232" },
  { Country: "Singapore", code: "+65" },
  { Country: "Sint Maarten", code: "+1721" },
  { Country: "Slovakia", code: "+421" },
  { Country: "Slovenia", code: "+386" },
  { Country: "Solomon Islands", code: "+677" },
  { Country: "Somalia", code: "+252" },
  { Country: "South Africa", code: "+27" },
  { Country: "South Georgia & South Sandwich Islands", code: "+500" },
  { Country: "South Korea", code: "+82" },
  { Country: "South Sudan", code: "+211" },
  { Country: "Spain", code: "+34" },
  { Country: "Sri Lanka", code: "+94" },
  { Country: "Saint Barthélemy", code: "+590" },
  { Country: "St. Helena", code: "+290" },
  { Country: "St. Kitts & Nevis", code: "+1869" },
  { Country: "St. Lucia", code: "+1758" },
  { Country: "St. Martin", code: "+590" },
  { Country: "St. Pierre & Miquelon", code: "+508" },
  { Country: "St. Vincent & Grenadines", code: "+1784" },
  { Country: "Sudan", code: "+249" },
  { Country: "Suriname", code: "+597" },
  { Country: "Svalbard & Jan Mayen", code: "+47" },
  { Country: "Swaziland", code: "+268" },
  { Country: "Sweden", code: "+46" },
  { Country: "Switzerland", code: "+41" },
  { Country: "Syria", code: "+963" },
  { Country: "Sao Tome and Principe", code: "+239" },
  { Country: "Taiwan", code: "+886" },
  { Country: "Tajikistan", code: "+992" },
  { Country: "Tanzania", code: "+255" },
  { Country: "Thailand", code: "+66" },
  { Country: "Timor-Leste", code: "+670" },
  { Country: "Togo", code: "+228" },
  { Country: "Tokelau", code: "+690" },
  { Country: "Tonga", code: "+676" },
  { Country: "Trinidad & Tobago", code: "+1868" },
  { Country: "Tunisia", code: "+216" },
  { Country: "Turkey", code: "+90" },
  { Country: "Turkmenistan", code: "+993" },
  { Country: "Turks & Caicos Islands", code: "+1649" },
  { Country: "Tuvalu", code: "+688" },
  { Country: "U.S. Virgin Islands", code: "+1340" },
  { Country: "UK", code: "+44" },
  { Country: "US", code: "+1" },
  { Country: "Uganda", code: "+256" },
  { Country: "Ukraine", code: "+380" },
  { Country: "United Arab Emirates", code: "+971" },
  { Country: "Uruguay", code: "+598" },
  { Country: "Uzbekistan", code: "+998" },
  { Country: "Vanuatu", code: "+678" },
  { Country: "Vatican City", code: "+3906" },
  { Country: "Venezuela", code: "+58" },
  { Country: "Vietnam", code: "+84" },
  { Country: "Wallis & Futuna", code: "+681" },
  { Country: "Western Sahara", code: "+212" },
  { Country: "Yemen", code: "+967" },
  { Country: "Zambia", code: "+260" },
  { Country: "Zimbabwe", code: "+263" },
  { Country: "Ãland Islands", code: "+358" }
];