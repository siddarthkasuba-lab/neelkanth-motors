export type Language = 'english' | 'hindi' | 'telugu';

export interface TranslationSet {
  about: string;
  brands: string;
  services: string;
  whyUs: string;
  gallery: string;
  reviews: string;
  faq: string;
  contact: string;
  bookService: string;
  venuPanel: string;
  userLogin: string;
  adminLogin: string;
  
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroCTA: string;
  heroExperience: string;
  
  // About
  aboutTitle: string;
  aboutSubtitle: string;
  aboutText1: string;
  aboutText2: string;
  
  // Brands
  brandsTitle: string;
  brandsSubtitle: string;
  allBrands: string;
  luxuryOnly: string;
  mainstream: string;
  tyresTitle: string;
  tyresSubtitle: string;
  
  // Services
  servicesTitle: string;
  servicesSubtitle: string;
  startingPrice: string;
  viewIncludes: string;
  bookNow: string;
  
  // Booking form
  bookingTitle: string;
  bookingSubtitle: string;
  fullName: string;
  mobileNumber: string;
  selectBrand: string;
  carModel: string;
  selectService: string;
  preferredDate: string;
  notes: string;
  submitBooking: string;
  ticketIdNote: string;
  
  // Auth Hub
  authHubTitle: string;
  authHubSubtitle: string;
  adminLoginTitle: string;
  userLoginTitle: string;
  userLoginDesc: string;
  enterMobile: string;
  enterPasscode: string;
  loginButton: string;
  loggingIn: string;
  logoutButton: string;
  dashboardBypass: string;
  noBookingsFound: string;
  yourActiveTickets: string;
}

export const TRANSLATIONS: Record<Language, TranslationSet> = {
  english: {
    about: "About",
    brands: "Brands We Service",
    services: "Services",
    whyUs: "Why Us",
    gallery: "Gallery",
    reviews: "Reviews",
    faq: "FAQ",
    contact: "Contact",
    bookService: "Book Service",
    venuPanel: "Venu Panel",
    userLogin: "User Login",
    adminLogin: "Admin Login",
    
    heroTitle: "MULTI BRAND CAR SERVICE CENTER CAR DENTING & PAINTING",
    heroSubtitle: "Get high-performance mechanical repairs, computerized wheel alignment, denting, and painting directly from Venu's master technician bay.",
    heroCTA: "BOOK COMPREHENSIVE SERVICE",
    heroExperience: "15+ YEARS OF ACCREDITED AUTOMOTIVE EXCELLENCE",
    
    aboutTitle: "ESTABLISHED IN 2011",
    aboutSubtitle: "Venu's Automotive Heritage & Precision Mechanics",
    aboutText1: "For over 15 years, Neelakanta Motors has been the gold standard for multi-brand car repairs in Hyderabad. Headed by Lead Specialist Venu, our state-of-the-art facility caters to everyday commuter hatchbacks, utility SUVs, and premium luxury sedans with equal mastery.",
    aboutText2: "We utilize advanced computerized diagnostics, genuine OEM/OES spares, and precise computerized tooling to restore your vehicle to factory standards. No shortcuts, just honest craftsmanship and reliable pricing.",
    
    brandsTitle: "COMPREHENSIVE MULTI-BRAND CAPABILITIES",
    brandsSubtitle: "From high-performance luxury sedans to mass-market commuter cars, our certified mechanics service all makes and models with specialized tools.",
    allBrands: "All Brands",
    luxuryOnly: "Luxury Only",
    mainstream: "Mainstream",
    tyresTitle: "PREMIUM TYRE PARTNERS & SELECTION",
    tyresSubtitle: "We source and install authentic high-mileage tyres from globally acclaimed brands. Wheel balancing and fitment services are done on computerized automatic machines.",
    
    servicesTitle: "OUR CERTIFIED SERVICES",
    servicesSubtitle: "Professional grade repairs, dent removal, wheel servicing, and electrical tune-ups. Transparent estimates and premium spares guaranteed.",
    startingPrice: "Starting from",
    viewIncludes: "What's Included",
    bookNow: "Book Slot",
    
    bookingTitle: "SCHEDULE AN APPOINTMENT",
    bookingSubtitle: "Fill out your details to instantly reserve a premium repair bay slot. Venu or our supervisors will contact you for a direct pickup confirmation.",
    fullName: "Full Name *",
    mobileNumber: "10-Digit Mobile Number *",
    selectBrand: "Select Car Brand *",
    carModel: "Car Model & Variant *",
    selectService: "Select Required Service *",
    preferredDate: "Preferred Appointment Date *",
    notes: "Any Specific Faults/Requirements? (e.g. suspension squeak)",
    submitBooking: "REQUEST SLOT BOOKING",
    ticketIdNote: "A unique 6-character Ticket ID will be generated upon booking to track live diagnostics.",
    
    authHubTitle: "SECURE ACCOUNT HUB",
    authHubSubtitle: "Access Venu's Owner CRM dashboard or view your active customer service tickets.",
    adminLoginTitle: "ADMINISTRATIVE LOGIN (OWNER)",
    userLoginTitle: "CUSTOMER SERVICE TICKET PORTAL",
    userLoginDesc: "Enter your registered mobile number to view and track your active vehicle repair status.",
    enterMobile: "Enter 10-digit mobile number",
    enterPasscode: "Enter Venu's admin passcode",
    loginButton: "Access Secure Panel",
    loggingIn: "Authenticating...",
    logoutButton: "Logout Account",
    dashboardBypass: "⚡ Auto-Bypass (Demo Mode)",
    noBookingsFound: "No active bookings found for this mobile number. Book a slot below!",
    yourActiveTickets: "YOUR ACTIVE SERVICE TICKETS"
  },
  hindi: {
    about: "हमारे बारे में",
    brands: "ब्रांड्स",
    services: "सेवाएं",
    whyUs: "विशेषताएं",
    gallery: "गैलरी",
    reviews: "समीक्षाएं",
    faq: "सवाल-जवाब",
    contact: "संपर्क",
    bookService: "सर्विस बुक करें",
    venuPanel: "वेणु पैनल",
    userLogin: "ग्राहक लॉगिन",
    adminLogin: "एडमिन लॉगिन",
    
    heroTitle: "मल्टी ब्रांड कार सर्विस सेंटर कार डेंटिंग और पेंटिंग",
    heroSubtitle: "वेणु के मास्टर तकनीशियन बे से सीधे उच्च-प्रदर्शन मैकेनिकल मरम्मत, कम्प्यूटरीकृत व्हील अलाइनमेंट, डेंटिंग और पेंटिंग प्राप्त करें।",
    heroCTA: "व्यापक सर्विस बुक करें",
    heroExperience: "15+ वर्षों की प्रमाणित ऑटोमोटिव उत्कृष्टता",
    
    aboutTitle: "2011 से स्थापित",
    aboutSubtitle: "वेणु की ऑटोमोटिव विरासत और सटीक मैकेनिक्स",
    aboutText1: "15 से अधिक वर्षों से, नीलकंठ मोटर्स हैदराबाद में मल्टी-ब्रांड कार मरम्मत के लिए स्वर्ण मानक रहा है। मुख्य विशेषज्ञ वेणु के नेतृत्व में, हमारी अत्याधुनिक सुविधा दैनिक कम्यूटर हैचबैक, उपयोगिता एसयूवी और प्रीमियम लक्जरी सेडान को समान दक्षता से संभालती है।",
    aboutText2: "हम आपके वाहन को फ़ैक्टरी मानकों पर वापस लाने के लिए उन्नत कम्प्यूटरीकृत डायग्नोस्टिक्स, असली ओईएम/ओईएस स्पेयर पार्ट्स और सटीक कम्प्यूटरीकृत टूल का उपयोग करते हैं। कोई शॉर्टकट नहीं, केवल ईमानदार कारीगरी और विश्वसनीय मूल्य निर्धारण।",
    
    brandsTitle: "व्यापक मल्टी-ब्रांड क्षमताएं",
    brandsSubtitle: "उच्च-प्रदर्शन वाली लक्जरी सेडान से लेकर मास-मार्केट कम्यूटर कारों तक, हमारे प्रमाणित मैकेनिक विशेष उपकरणों के साथ सभी मॉडलों की सर्विस करते हैं।",
    allBrands: "सभी ब्रांड",
    luxuryOnly: "केवल लक्जरी",
    mainstream: "मुख्यधारा",
    tyresTitle: "प्रीमियम टायर भागीदार और चयन",
    tyresSubtitle: "हम विश्व स्तर पर प्रशंसित ब्रांडों से प्रामाणिक उच्च-माइलेज टायर मंगवाते और स्थापित करते हैं। टायर फिटमेंट सेवाएं कम्प्यूटरीकृत मशीनों पर की जाती हैं।",
    
    servicesTitle: "हमारी प्रमाणित सेवाएं",
    servicesSubtitle: "पेशेवर स्तर की मरम्मत, डेंट हटाना, व्हील सर्विसिंग और इलेक्ट्रिकल ट्यून-अप। पारदर्शी अनुमान और प्रीमियम पुर्जों की गारंटी।",
    startingPrice: "शुरुआती कीमत",
    viewIncludes: "क्या शामिल है",
    bookNow: "स्लॉट बुक करें",
    
    bookingTitle: "अपॉइंटमेंट शेड्यूल करें",
    bookingSubtitle: "प्रीमियम रिपेयर बे स्लॉट को तुरंत सुरक्षित करने के लिए अपना विवरण भरें। वेणु या हमारे पर्यवेक्षक पिकअप की पुष्टि के लिए आपसे संपर्क करेंगे।",
    fullName: "पूरा नाम *",
    mobileNumber: "10-अंकीय मोबाइल नंबर *",
    selectBrand: "कार ब्रांड चुनें *",
    carModel: "कार मॉडल और संस्करण *",
    selectService: "आवश्यक सेवा चुनें *",
    preferredDate: "पसंदीदा अपॉइंटमेंट तिथि *",
    notes: "कोई विशेष खराबी/आवश्यकता? (जैसे सस्पेंशन की आवाज)",
    submitBooking: "स्लॉट बुकिंग का अनुरोध करें",
    ticketIdNote: "लाइव डायग्नोस्टिक्स को ट्रैक करने के लिए बुकिंग पर एक अद्वितीय 6-अंकीय टिकट आईडी जनरेट की जाएगी।",
    
    authHubTitle: "सुरक्षित खाता हब",
    authHubSubtitle: "वेणु के मालिक सीआरएम डैशबोर्ड तक पहुंचें या अपने सक्रिय ग्राहक सेवा टिकट देखें।",
    adminLoginTitle: "प्रशासनिक लॉगिन (मालिक)",
    userLoginTitle: "ग्राहक सेवा टिकट पोर्टल",
    userLoginDesc: "अपने सक्रिय वाहन मरम्मत की स्थिति देखने और ट्रैक करने के लिए अपना पंजीकृत मोबाइल नंबर दर्ज करें।",
    enterMobile: "10-अंकीय मोबाइल नंबर दर्ज करें",
    enterPasscode: "वेणु का एडमिन पासकोड दर्ज करें",
    loginButton: "सुरक्षित पैनल एक्सेस करें",
    loggingIn: "सत्यापित किया जा रहा है...",
    logoutButton: "खाता लॉगआउट करें",
    dashboardBypass: "⚡ ऑटो-बायपास (डेमो मोड)",
    noBookingsFound: "इस मोबाइल नंबर के लिए कोई सक्रिय बुकिंग नहीं मिली। नीचे एक स्लॉट बुक करें!",
    yourActiveTickets: "आपके सक्रिय सेवा टिकट"
  },
  telugu: {
    about: "మా గురించి",
    brands: "బ్రాండ్లు",
    services: "సేవలు",
    whyUs: "ప్రత్యేకతలు",
    gallery: "గ్యాలరీ",
    reviews: "సమీక్షలు",
    faq: "ప్రశ్నలు-జవాబులు",
    contact: "సంప్రదించండి",
    bookService: "సర్వీస్ బుక్ చేయండి",
    venuPanel: "వేణు ప్యానెల్",
    userLogin: "యూజర్ లాగిన్",
    adminLogin: "అడ్మిన్ లాగిన్",
    
    heroTitle: "మల్టీ బ్రాండ్ కార్ సర్వీస్ సెంటర్ కార్ డెంటింగ్ & పెయింటింగ్",
    heroSubtitle: "వేణు మాస్టర్ టెక్నీషియన్ బే నుండి నేరుగా హై-పెర్ఫార్మెన్స్ మెకానికల్ రిపేర్లు, కంప్యూటరైజ్డ్ వీల్ అలైన్‌మెంట్, డెంటింగ్ మరియు పెయింటింగ్ పొందండి.",
    heroCTA: "సమగ్ర సర్వీస్ బుక్ చేయండి",
    heroExperience: "15+ సంవత్సరాల ధృవీకరించబడిన ఆటోమోటివ్ ఎక్సలెన్స్",
    
    aboutTitle: "2011 నుండి స్థాపించబడింది",
    aboutSubtitle: "వేణు ఆటోమోటివ్ వారసత్వం & ఖచ్చితమైన మెకానిక్స్",
    aboutText1: "15 సంవత్సరాలకు పైగా, హైదరాబాద్‌లో మల్టీ-బ్రాండ్ కార్ రిపేర్లకు నీలకంఠ మోటార్స్ బంగారు ప్రమాణంగా నిలిచింది. లీడ్ స్పెషలిస్ట్ వేణు నేతృత్వంలో, మా అత్యాధునిక సదుపాయం రోజువారీ హాచ్‌బ్యాక్‌లు, యుటిలిటీ SUVలు మరియు ప్రీమియం లగ్జరీ సెడాన్‌లను సమాన నైపుణ్యంతో హ్యాండిల్ చేస్తుంది.",
    aboutText2: "మీ వాహనాన్ని ఫ్యాక్టరీ ప్రమాణాలకు పునరుద్ధరించడానికి మేము అధునాతన కంప్యూటరైజ్డ్ డయాగ్నోస్టిక్స్, జెన్యూన్ OEM/OES విడిభాగాలు మరియు ఖచ్చితమైన కంప్యూటరైజ్డ్ టూలింగ్‌ను ఉపయోగిస్తాము. షార్ట్‌కట్‌లు లేవు, కేవలం నిజాయితీ గల పనితనం మరియు నమ్మకమైన ధరలు.",
    
    brandsTitle: "సమగ్ర మల్టీ-బ్రాండ్ సామర్థ్యాలు",
    brandsSubtitle: "హై-పెర్ఫార్మెన్స్ లగ్జరీ సెడాన్‌ల నుండి మాస్-మార్కెట్ కమ్యూటర్ కార్ల వరకు, మా సర్టిఫైడ్ మెకానిక్స్ ప్రత్యేక సాధనాలతో అన్ని మోడళ్లను సర్వీస్ చేస్తారు.",
    allBrands: "అన్ని బ్రాండ్లు",
    luxuryOnly: "లగ్జరీ మాత్రమే",
    mainstream: "మెయిన్ స్ట్రీమ్",
    tyresTitle: "ప్రీమియం టైర్ భాగస్వాములు & ఎంపిక",
    tyresSubtitle: "మేము ప్రపంచవ్యాప్తంగా ప్రశంసలు పొందిన బ్రాండ్‌ల నుండి ప్రామాణికమైన అధిక-మైలేజ్ టైర్‌లను సోర్స్ చేసి ఇన్‌స్టాల్ చేస్తాము. టైర్ ఫిట్‌మెంట్ సేవలు కంప్యూటరైజ్డ్ మెషీన్లపై చేయబడతాయి.",
    
    servicesTitle: "మా సర్టిఫైడ్ సేవలు",
    servicesSubtitle: "ప్రొఫెషనల్ గ్రేడ్ రిపేర్లు, డెంట్ తొలగింపు, వీల్ సర్వీసింగ్ మరియు ఎలక్ట్రికల్ ట్యూన్-అప్‌లు. పారదర్శక అంచనాలు మరియు ప్రీమియం విడిభాగాలకు హామీ.",
    startingPrice: "ప్రారంభ ధర",
    viewIncludes: "ఏమేమి చేర్చబడ్డాయి",
    bookNow: "స్లాట్ బుక్ చేయండి",
    
    bookingTitle: "అపాయింట్‌మెంట్ షెడ్యూల్ చేయండి",
    bookingSubtitle: "ప్రీమియం రిపేర్ బే స్లాట్‌ను తక్షణమే రిజర్వ్ చేయడానికి మీ వివరాలను పూరించండి. పికప్ నిర్ధారణ కోసం వేణు లేదా మా సూపర్వైజర్లు మిమ్మల్ని నేరుగా సంప్రదిస్తారు.",
    fullName: "పూర్తి పేరు *",
    mobileNumber: "10-అంకెల మొబైల్ నంబర్ *",
    selectBrand: "కార్ బ్రాండ్ ఎంచుకోండి *",
    carModel: "కార్ మోడల్ & వేరియంట్ *",
    selectService: "అవసరమైన సర్వీస్ ఎంచుకోండి *",
    preferredDate: "అపాయింట్‌మెంట్ తేదీ *",
    notes: "ఏదైనా నిర్దిష్ట లోపం/అవసరమా? (ఉదా. సస్పెన్షన్ శబ్దం)",
    submitBooking: "స్లాట్ బుకింగ్ అభ్యర్థించండి",
    ticketIdNote: "లైవ్ డయాగ్నోస్టిక్స్‌ను ట్రాక్ చేయడానికి బుకింగ్ చేసిన తర్వాత ఒక ప్రత్యేకమైన 6-అంకెల టికెట్ ID జనరేట్ చేయబడుతుంది.",
    
    authHubTitle: "సురక్షిత ఖాతా హబ్",
    authHubSubtitle: "వేణు ఓనర్ CRM డాష్‌బోర్డ్‌ను యాక్సెస్ చేయండి లేదా మీ యాక్టివ్ కస్టమర్ సర్వీస్ టిక్కెట్లను వీక్షించండి.",
    adminLoginTitle: "అడ్మినిస్ట్రేటివ్ లాగిన్ (ఓనర్)",
    userLoginTitle: "కస్టమर సర్వీస్ టికెట్ పోర్టల్",
    userLoginDesc: "మీ వాహనం రిపేర్ స్థితిని వీక్షించడానికి మరియు ట్రాక్ చేయడానికి మీ నమోదిత మొబైల్ నంబర్‌ను నమోదు చేయండి.",
    enterMobile: "10-అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి",
    enterPasscode: "వేణు అడ్మిన్ పాస్‌కోడ్‌ను నమోదు చేయండి",
    loginButton: "సురక్షిత ప్యానెల్ యాక్సెస్ చేయండి",
    loggingIn: "ధృవీకరిస్తోంది...",
    logoutButton: "ఖాతా లాగ్‌అవుట్ చేయండి",
    dashboardBypass: "⚡ ఆటో-బైపాస్ (డెమో మోడ్)",
    noBookingsFound: "ఈ మొబైల్ నంబర్‌కు ఎలాంటి యాక్టివ్ బుకింగ్‌లు లేవు. క్రింద స్లాట్ బుక్ చేసుకోండి!",
    yourActiveTickets: "మీ యాక్టివ్ సర్వీస్ టిక్కెట్లు"
  }
};
