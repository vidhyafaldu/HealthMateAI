import jsPDF from "jspdf";
import React, { useState } from "react";
import {
  HeartPulse, Heart, Activity, Brain, Droplet, Utensils,
  ShieldCheck, Moon, Dumbbell, Sparkles, Languages,
  ClipboardCheck, AlertCircle, RotateCcw, Apple
} from "lucide-react";

const words = {
  en: {
    title: "Your Health, Your Priority",
    intro: "Understand your habits and build a healthier routine.",
    form: "Your Health Details",
    personal: "Personal Information",
    age: "Age", gender: "Gender", height: "Height (cm)", weight: "Weight (kg)",
    male: "Male", female: "Female", other: "Other",
    lifestyle: "Daily Habits & Lifestyle",
    activity: "Physical Activity", sleep: "Sleep per night",
    water: "Water per day", smoking: "Smoking", alcohol: "Alcohol",
    diet: "Food Preference", goal: "Main Goal",
    mind: "Mood & Mental Wellness", mood: "Mood lately", stress: "Stress level",
    medical: "Medical Information", blood: "Blood Group",
    condition: "Existing Condition", allergy: "Food Allergy",
    concerns: "Health Concerns", notes: "Additional Notes",
    report: "Your Wellness Report", generate: "Generate My Health Report",
    reset: "Reset Form", bmi: "BMI Screening", lifestyleScore: "Lifestyle Balance",
    bloodCard: "Blood Group", moodCard: "Mood & Stress",
    nutrition: "Nutrition Suggestions", routine: "Daily Routine Tips",
    summary: "Your Health Summary", disclaimer: "Important Health Notice",
    good: "Mostly good", okay: "Mixed / okay", low: "Often low",
    lowStress: "Low", mediumStress: "Moderate", highStress: "High",
    vegetarian: "Vegetarian", vegan: "Vegan", mixed: "Non-vegetarian",
    jain: "Jain vegetarian", maintain: "Maintain wellness",
    energy: "Improve energy", fitness: "Improve fitness",
    eating: "Improve eating habits", stressGoal: "Manage stress",
    no: "No", sometimes: "Sometimes", yes: "Yes",
    none: "None reported", unknown: "Unknown",
    diabetes: "Diabetes", bp: "High blood pressure", thyroid: "Thyroid condition",
    dairy: "Dairy", nuts: "Nuts", gluten: "Gluten", other: "Other",
    back: "Back pain", headache: "Headache", digestive: "Digestive issues",
    fatigue: "Fatigue", sleepIssue: "Sleep difficulties", otherConcern: "Other concern",
    submitHint: "Enter your details and generate your personal wellness report.",
    under: "Below adult reference range", healthy: "Within adult reference range",
    above: "Above adult reference range", high: "High adult BMI range",
    tips: "Suggestions based on your answers",
    disclaimerText: "This website provides general wellness information, not medical diagnosis. Lifestyle scores are simple indicators based on entered habits. They do not predict disease, lifespan, depression, or guarantee medical safety. BMI is a screening measure. Adult BMI categories do not apply to people under 20. Consult a qualified healthcare professional about medical concerns.",
    moodNotice: "Your mood answers do not diagnose depression. If low mood persists or affects daily life, seek professional support.",
    waterTip: "Drink water regularly throughout the day. Your needs depend on activity, climate and health.",
    sleepTip: "Most adults benefit from approximately 7–9 hours of sleep.",
    moveTip: "Add regular movement to your day and increase activity gradually.",
    stressTip: "Try slow breathing, a short walk, relaxation or talking with someone you trust.",
    foodTip: "Choose a variety of vegetables, fruit, whole grains and suitable protein sources.",
    notDiagnosis: "Not a medical risk percentage",
    noConcerns: "No health concerns selected.",
    selected: "Selected concerns",
    temporary: "Temporary Mode · No data is saved",
    ready: "Your report is based on the information you entered.",
    footer: "Your health matters. Take care, always."
  },
  gu: {
    title: "તમારું સ્વાસ્થ્ય, તમારી પ્રાથમિકતા",
    intro: "તમારી આદતો સમજો અને વધુ સ્વસ્થ દિનચર્યા બનાવો.",
    form: "તમારી આરોગ્ય વિગતો", personal: "વ્યક્તિગત માહિતી",
    age: "ઉંમર", gender: "લિંગ", height: "ઊંચાઈ (સેમી)", weight: "વજન (કિગ્રા)",
    male: "પુરુષ", female: "સ્ત્રી", other: "અન્ય",
    lifestyle: "દૈનિક આદતો અને જીવનશૈલી", activity: "શારીરિક પ્રવૃત્તિ",
    sleep: "રાત્રે ઊંઘ", water: "દિવસનું પાણી", smoking: "ધૂમ્રપાન",
    alcohol: "દારૂ", diet: "ખોરાકની પસંદગી", goal: "મુખ્ય લક્ષ્ય",
    mind: "મૂડ અને માનસિક સુખાકારી", mood: "તાજેતરનો મૂડ",
    stress: "તણાવનું સ્તર", medical: "તબીબી માહિતી", blood: "બ્લડ ગ્રુપ",
    condition: "હાલની બીમારી", allergy: "ખોરાકની એલર્જી",
    concerns: "આરોગ્યની ચિંતાઓ", notes: "વધારાની નોંધ",
    report: "તમારો વેલનેસ રિપોર્ટ", generate: "મારો આરોગ્ય રિપોર્ટ બનાવો",
    reset: "ફોર્મ ફરી સેટ કરો", bmi: "BMI સ્ક્રીનિંગ",
    lifestyleScore: "જીવનશૈલી સંતુલન", bloodCard: "બ્લડ ગ્રુપ",
    moodCard: "મૂડ અને તણાવ", nutrition: "પોષણ સૂચનો",
    routine: "દૈનિક દિનચર્યા સૂચનો", summary: "તમારા સ્વાસ્થ્યનો સાર",
    disclaimer: "મહત્વપૂર્ણ આરોગ્ય નોંધ", good: "મોટેભાગે સારો",
    okay: "ઠીક / મિશ્ર", low: "ઘણી વાર ઉદાસ", lowStress: "ઓછો",
    mediumStress: "મધ્યમ", highStress: "વધુ", vegetarian: "શાકાહારી",
    vegan: "વેગન", mixed: "માંસાહારી", jain: "જૈન શાકાહારી",
    maintain: "સ્વાસ્થ્ય જાળવવું", energy: "ઊર્જા વધારવી",
    fitness: "ફિટનેસ વધારવી", eating: "ખાવાની આદતો સુધારવી",
    stressGoal: "તણાવ સંભાળવો", no: "ના", sometimes: "ક્યારેક",
    yes: "હા", none: "કંઈ જણાવેલ નથી", unknown: "અજ્ઞાત",
    diabetes: "ડાયાબિટીસ", bp: "હાઈ બ્લડ પ્રેશર",
    thyroid: "થાઈરોઇડની તકલીફ", dairy: "દૂધની વસ્તુઓ",
    nuts: "સુકા મેવા", gluten: "ગ્લૂટેન", other: "અન્ય",
    back: "પીઠનો દુખાવો", headache: "માથાનો દુખાવો",
    digestive: "પાચનની તકલીફ", fatigue: "થાક",
    sleepIssue: "ઊંઘની તકલીફ", otherConcern: "બીજી ચિંતા",
    submitHint: "તમારી વિગતો ભરીને રિપોર્ટ બનાવો.",
    under: "પુખ્ત વયની સંદર્ભ મર્યાદાથી ઓછું",
    healthy: "પુખ્ત વયની સંદર્ભ મર્યાદામાં",
    above: "પુખ્ત વયની સંદર્ભ મર્યાદાથી વધુ",
    high: "ઊંચી પુખ્ત BMI શ્રેણી",
    tips: "તમારા જવાબો પર આધારિત સૂચનો",
    disclaimerText: "આ વેબસાઇટ સામાન્ય વેલનેસ માહિતી આપે છે, તબીબી નિદાન નહીં. જીવનશૈલી સ્કોર દાખલ કરેલી આદતો પર આધારિત સરળ સૂચક છે. તે રોગ, આયુષ્ય, ડિપ્રેશન અથવા તબીબી સુરક્ષાની આગાહી કરતું નથી. BMI માત્ર સ્ક્રીનિંગ છે. 20 વર્ષથી ઓછી ઉંમરે પુખ્ત BMI શ્રેણીઓ લાગુ પડતી નથી. તબીબી ચિંતા માટે આરોગ્ય નિષ્ણાતની સલાહ લો.",
    moodNotice: "મૂડના જવાબો પરથી ડિપ્રેશનનું નિદાન થતું નથી. ઉદાસીનતા ચાલુ રહે તો નિષ્ણાતની મદદ લો.",
    waterTip: "દિવસભર નિયમિત પાણી પીવો. જરૂરિયાત પ્રવૃત્તિ, હવામાન અને આરોગ્ય પર આધારિત છે.",
    sleepTip: "મોટાભાગના પુખ્ત લોકોને લગભગ 7–9 કલાક ઊંઘથી ફાયદો થાય છે.",
    moveTip: "દૈનિક જીવનમાં હલનચલન વધારો અને પ્રવૃત્તિ ધીમે ધીમે વધારો.",
    stressTip: "ધીમા શ્વાસ, ટૂંકી ચાલ અથવા વિશ્વાસુ વ્યક્તિ સાથે વાત કરવાનો પ્રયાસ કરો.",
    foodTip: "વિવિધ શાકભાજી, ફળ, આખા અનાજ અને યોગ્ય પ્રોટીન લો.",
    notDiagnosis: "તબીબી જોખમની ટકાવારી નથી",
    noConcerns: "કોઈ ચિંતા પસંદ કરેલી નથી.",
    selected: "પસંદ કરેલી ચિંતાઓ", temporary: "ટેમ્પરરી મોડ · ડેટા સેવ થતો નથી",
    ready: "તમારો રિપોર્ટ દાખલ કરેલી વિગતો પર આધારિત છે.",
    footer: "તમારું સ્વાસ્થ્ય મહત્વનું છે. કાળજી રાખો."
  },
  hi: {
    title: "आपका स्वास्थ्य, आपकी प्राथमिकता",
    intro: "अपनी आदतों को समझें और स्वस्थ दिनचर्या बनाएं।",
    form: "आपकी स्वास्थ्य जानकारी", personal: "व्यक्तिगत जानकारी",
    age: "उम्र", gender: "लिंग", height: "लंबाई (सेमी)", weight: "वज़न (किग्रा)",
    lifestyle: "दैनिक आदतें और जीवनशैली", activity: "शारीरिक गतिविधि",
    sleep: "रात की नींद", water: "प्रतिदिन पानी", smoking: "धूम्रपान",
    alcohol: "शराब", diet: "भोजन की पसंद", goal: "मुख्य लक्ष्य",
    mind: "मूड और मानसिक स्वास्थ्य", mood: "हाल का मूड",
    stress: "तनाव का स्तर", medical: "चिकित्सा जानकारी", blood: "ब्लड ग्रुप",
    condition: "मौजूदा स्थिति", allergy: "खाद्य एलर्जी",
    concerns: "स्वास्थ्य संबंधी चिंताएँ", notes: "अतिरिक्त जानकारी",
    report: "आपकी वेलनेस रिपोर्ट", generate: "मेरी स्वास्थ्य रिपोर्ट बनाएं",
    reset: "फॉर्म रीसेट करें", bmi: "BMI स्क्रीनिंग",
    lifestyleScore: "जीवनशैली संतुलन", bloodCard: "ब्लड ग्रुप",
    moodCard: "मूड और तनाव", nutrition: "पोषण सुझाव",
    routine: "दैनिक दिनचर्या सुझाव", summary: "आपके स्वास्थ्य का सार",
    disclaimer: "महत्वपूर्ण स्वास्थ्य सूचना", good: "अधिकतर अच्छा",
    okay: "मिला-जुला / ठीक", low: "अक्सर उदास", lowStress: "कम",
    mediumStress: "मध्यम", highStress: "अधिक", vegetarian: "शाकाहारी",
    vegan: "वीगन", mixed: "मांसाहारी", jain: "जैन शाकाहारी",
    maintain: "स्वास्थ्य बनाए रखें", energy: "ऊर्जा बढ़ाएँ",
    fitness: "फिटनेस बढ़ाएँ", eating: "खाने की आदतें सुधारें",
    stressGoal: "तनाव संभालें", no: "नहीं", sometimes: "कभी-कभी",
    yes: "हाँ", none: "कोई नहीं बताया", unknown: "अज्ञात",
    diabetes: "मधुमेह", bp: "उच्च रक्तचाप",
    thyroid: "थायरॉइड समस्या", dairy: "डेयरी", nuts: "मेवे",
    gluten: "ग्लूटेन", other: "अन्य", back: "पीठ दर्द",
    headache: "सिरदर्द", digestive: "पाचन समस्या", fatigue: "थकान",
    sleepIssue: "नींद की समस्या", otherConcern: "अन्य चिंता",
    submitHint: "जानकारी भरकर अपनी रिपोर्ट बनाएं।",
    under: "वयस्क संदर्भ सीमा से कम", healthy: "वयस्क संदर्भ सीमा में",
    above: "वयस्क संदर्भ सीमा से अधिक", high: "उच्च वयस्क BMI श्रेणी",
    tips: "आपके जवाबों के आधार पर सुझाव",
    disclaimerText: "यह वेबसाइट सामान्य वेलनेस जानकारी देती है, चिकित्सा निदान नहीं। जीवनशैली स्कोर आपकी आदतों पर आधारित सरल संकेतक है। यह बीमारी, जीवनकाल, अवसाद या चिकित्सा सुरक्षा की भविष्यवाणी नहीं करता। BMI केवल स्क्रीनिंग माप है। 20 वर्ष से कम उम्र में वयस्क BMI श्रेणियाँ लागू नहीं होतीं। स्वास्थ्य संबंधी चिंता पर योग्य पेशेवर से सलाह लें।",
    moodNotice: "मूड के जवाब अवसाद का निदान नहीं करते। उदासी बनी रहे तो पेशेवर सहायता लें।",
    waterTip: "दिन भर नियमित पानी पिएँ। ज़रूरत गतिविधि, मौसम और स्वास्थ्य पर निर्भर करती है।",
    sleepTip: "अधिकांश वयस्कों को लगभग 7–9 घंटे की नींद से लाभ होता है।",
    moveTip: "दैनिक जीवन में चलना-फिरना बढ़ाएँ और गतिविधि धीरे-धीरे बढ़ाएँ।",
    stressTip: "धीमी साँस, छोटी सैर या भरोसेमंद व्यक्ति से बात करने की कोशिश करें।",
    foodTip: "सब्ज़ियाँ, फल, साबुत अनाज और उपयुक्त प्रोटीन के अलग-अलग स्रोत चुनें।",
    notDiagnosis: "चिकित्सा जोखिम का प्रतिशत नहीं",
    noConcerns: "कोई चिंता नहीं चुनी गई।", selected: "चुनी गई चिंताएँ",
    temporary: "अस्थायी मोड · डेटा सेव नहीं होता",
    ready: "आपकी रिपोर्ट दर्ज की गई जानकारी पर आधारित है।",
    footer: "आपका स्वास्थ्य महत्वपूर्ण है। अपना ध्यान रखें।"
  }
};

const defaults = {
  age: "22", gender: "", height: "", weight: "",
  activity: "Moderate", sleep: "7–9 hours", water: "1–2 litres",
  smoking: "No", alcohol: "No", diet: "Vegetarian",
  goal: "Maintain wellness", mood: "Mostly good", stress: "Moderate",
  blood: "Unknown", condition: "None", allergy: "None",
  concerns: [], notes: ""
};

const options = {
  gender: ["Male", "Female", "Other"],
  activity: ["Mostly sitting", "Light", "Moderate", "Very active"],
  sleep: ["Less than 6 hours", "6–7 hours", "7–9 hours", "More than 9 hours"],
  water: ["Less than 1 litre", "1–2 litres", "2–3 litres", "More than 3 litres"],
  smoking: ["No", "Sometimes", "Yes"],
  alcohol: ["No", "Sometimes", "Yes"],
  diet: ["Vegetarian", "Vegan", "Non-vegetarian", "Jain vegetarian"],
  goal: ["Maintain wellness", "Improve energy", "Improve eating habits", "Improve fitness", "Manage stress"],
  mood: ["Mostly good", "Mixed / okay", "Often low"],
  stress: ["Low", "Moderate", "High"],
  blood: ["Unknown", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  condition: ["None", "Diabetes", "High blood pressure", "Thyroid condition", "Other"],
  allergy: ["None", "Dairy", "Nuts", "Gluten", "Other"]
};

const concernsList = [
  "Back pain", "Headache", "Digestive issues", "Fatigue",
  "Sleep difficulties", "Other concern"
];

function Field({ label, children, full = false }) {
  return <label className={`field ${full ? "full" : ""}`}>
    <span>{label}</span>{children}
  </label>;
}

function SelectField({ label, value, items, onChange }) {
  return <Field label={label}>
    <select value={value} onChange={e => onChange(e.target.value)}>
      {items.map(item => <option key={item} value={item}>{item}</option>)}
    </select>
  </Field>;
}

function Section({ icon: Icon, title, subtitle, color, children }) {
  return <section className="section">
    <div className="section-title">
      <span className={`section-icon ${color}`}><Icon size={20}/></span>
      <div><h3>{title}</h3><p>{subtitle}</p></div>
    </div>
    <div className="fields">{children}</div>
  </section>;
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [form, setForm] = useState(defaults);
  const [report, setReport] = useState(false);
  const [error, setError] = useState("");
  const t = words[lang];

  const update = (key, value) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const trOption = value => {
    const map = {
      "Male": t.male, "Female": t.female, "Other": t.other,
      "Mostly sitting": lang === "gu" ? "મોટાભાગે બેસીને" : lang === "hi" ? "अधिकतर बैठे रहते हैं" : "Mostly sitting",
      "Light": lang === "gu" ? "હળવી" : lang === "hi" ? "हल्की" : "Light",
      "Moderate": lang === "gu" ? "મધ્યમ" : lang === "hi" ? "मध्यम" : "Moderate",
      "Very active": lang === "gu" ? "ખૂબ સક્રિય" : lang === "hi" ? "बहुत सक्रिय" : "Very active",
      "Vegetarian": t.vegetarian, "Vegan": t.vegan,
      "Non-vegetarian": t.mixed, "Jain vegetarian": t.jain,
      "Maintain wellness": t.maintain, "Improve energy": t.energy,
      "Improve eating habits": t.eating, "Improve fitness": t.fitness,
      "Manage stress": t.stressGoal, "Mostly good": t.good,
      "Mixed / okay": t.okay, "Often low": t.low,
      "Low": t.lowStress, "High": t.highStress,
      "No": t.no, "Sometimes": t.sometimes, "Yes": t.yes,
      "None": t.none, "Unknown": t.unknown,
      "Diabetes": t.diabetes, "High blood pressure": t.bp,
      "Thyroid condition": t.thyroid, "Dairy": t.dairy,
      "Nuts": t.nuts, "Gluten": t.gluten, "Other": t.other
    };
    return map[value] || value;
  };

  const bmi = Number(form.height) > 0 && Number(form.weight) > 0
    ? Number(form.weight) / Math.pow(Number(form.height) / 100, 2)
    : null;

  const getLifestyleScore = () => {
    const scores = [
      form.activity === "Very active" ? 100 : form.activity === "Moderate" ? 85 : form.activity === "Light" ? 65 : 40,
      form.sleep === "7–9 hours" ? 100 : form.sleep === "6–7 hours" ? 65 : form.sleep === "Less than 6 hours" ? 35 : 70,
      form.water === "2–3 litres" ? 85 : form.water === "1–2 litres" ? 75 : form.water === "More than 3 litres" ? 80 : 45,
      form.smoking === "No" ? 100 : form.smoking === "Sometimes" ? 50 : 20,
      form.alcohol === "No" ? 95 : form.alcohol === "Sometimes" ? 65 : 35,
      form.mood === "Mostly good" ? 85 : form.mood === "Mixed / okay" ? 65 : 40,
      form.stress === "Low" ? 90 : form.stress === "Moderate" ? 65 : 35
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const bmiLabel = () => {
    if (Number(form.age) < 20) return lang === "gu" ? "પુખ્ત BMI લાગુ પડતું નથી" : lang === "hi" ? "वयस्क BMI लागू नहीं" : "Adult BMI categories do not apply";
    if (bmi === null) return "—";
    if (bmi < 18.5) return t.under;
    if (bmi < 25) return t.healthy;
    if (bmi < 30) return t.above;
    return t.high;
  };

  const generate = e => {
    e.preventDefault();
    if (!form.age || Number(form.age) < 1 || Number(form.age) > 120) {
      setError("Please enter a valid age.");
      return;
    }
    if (!form.height || !form.weight || Number(form.height) <= 0 || Number(form.weight) <= 0) {
      setError("Please enter a valid height and weight.");
      return;
    }
    setError("");
    setReport(true);
    downloadHealthReport();
    setTimeout(() => document.getElementById("report")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const reset = () => {
    setForm(defaults);
    setReport(false);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const score = getLifestyleScore();
  const isLowMood = form.mood === "Often low";
  const isHighStress = form.stress === "High";

  const foodIdeas = form.diet === "Vegan"
    ? ["Oats with fruit and seeds", "Dal, grains and vegetables", "Tofu or beans with vegetables", "Fruit or roasted chickpeas"]
    : form.diet === "Jain vegetarian"
    ? ["Fruit and suitable grain-based breakfast", "Jain-friendly dal, rice and vegetables", "Paneer or pulses with grains", "Fruit or nuts if safe"]
    : form.diet === "Non-vegetarian"
    ? ["Oats, eggs or fruit with yogurt", "Whole grains, vegetables and dal", "Vegetables with eggs, fish or lean meat", "Fruit or yogurt"]
    : ["Oats or poha with fruit", "Roti or rice, dal and vegetables", "Vegetables with beans, paneer or tofu", "Fruit, yogurt or roasted chana"];

  const routineTips = [
    [Moon, t.sleepTip],
    [Droplet, t.waterTip],
    [Dumbbell, t.moveTip],
    [Brain, t.stressTip],
    [Apple, t.foodTip]
  ];

  const downloadHealthReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 16;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    const addLine = (text, size = 10, gap = 6) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(String(text ?? ""), maxWidth);
      if (y + lines.length * gap > 278) {
        doc.addPage();
        y = 18;
      }
      doc.text(lines, margin, y);
      y += lines.length * gap + 3;
    };

    doc.setFillColor(20, 166, 133);
    doc.rect(0, 0, pageWidth, 34, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(21);
    doc.text("HealthMate AI", margin, 15);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Personal Wellness Report", margin, 25);

    doc.setTextColor(35, 50, 75);
    y = 44;
    addLine(`Generated: ${new Date().toLocaleDateString()}`, 9);
    addLine("PERSONAL DETAILS", 14);
    addLine(`Age: ${form.age}`);
    addLine(`Gender: ${trOption(form.gender || "Not provided")}`);
    addLine(`Height: ${form.height} cm`);
    addLine(`Weight: ${form.weight} kg`);
    addLine(`Blood group: ${form.blood}`);

    addLine("WELLNESS SCREENING", 14);
    addLine(`BMI: ${bmi === null ? "Not available" : bmi.toFixed(1)}`);
    addLine(`BMI interpretation: ${bmiLabel()}`);
    addLine(`Lifestyle balance score: ${score}%`);
    addLine("Note: The lifestyle score is a simple habit indicator, not a medical risk percentage.");

    addLine("LIFESTYLE & MOOD", 14);
    addLine(`Physical activity: ${trOption(form.activity)}`);
    addLine(`Sleep: ${form.sleep}`);
    addLine(`Water intake: ${form.water}`);
    addLine(`Smoking: ${trOption(form.smoking)}`);
    addLine(`Alcohol: ${trOption(form.alcohol)}`);
    addLine(`Mood: ${trOption(form.mood)}`);
    addLine(`Stress: ${trOption(form.stress)}`);

    addLine("FOOD & HEALTH DETAILS", 14);
    addLine(`Diet: ${trOption(form.diet)}`);
    addLine(`Goal: ${trOption(form.goal)}`);
    addLine(`Existing condition: ${trOption(form.condition)}`);
    addLine(`Food allergy: ${trOption(form.allergy)}`);
    addLine(`Reported concerns: ${form.concerns.length ? form.concerns.map(x => trOption(x)).join(", ") : t.noConcerns}`);
    if (form.notes.trim()) addLine(`Additional notes: ${form.notes}`);

    addLine("NUTRITION IDEAS", 14);
    foodIdeas.forEach((food, index) => addLine(`${index + 1}. ${food}`));
    addLine("DAILY ROUTINE TIPS", 14);
    routineTips.forEach(([, tip], index) => addLine(`${index + 1}. ${tip}`));

    addLine("IMPORTANT MEDICAL DISCLAIMER", 14);
    addLine(t.disclaimerText, 9);
    addLine("This report is for general wellness education only. It does not diagnose disease or replace advice from a qualified healthcare professional.", 9);

    doc.save("HealthMate-AI-Wellness-Report.pdf");
  };

  return (
    <div className="hm">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap');
        *{box-sizing:border-box}body{margin:0;background:#f7faff;color:#17294b;font-family:'DM Sans',sans-serif}
        .hm{min-height:100vh;background:linear-gradient(180deg,#f7fbff,#fff 55%,#f8fbff);padding:0 0 24px}
        .container{max-width:1440px;margin:auto;padding:0 24px}
        .top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 0;border-bottom:1px solid #e5edf7}
        .brand{display:flex;gap:12px;align-items:center}.brand-logo{height:48px;width:48px;display:grid;place-items:center;background:linear-gradient(135deg,#08b7a1,#3377f7);color:white;border-radius:16px;box-shadow:0 8px 20px #19a88a25}
        .brand h1{font:800 24px Manrope;margin:0;letter-spacing:-.8px}.brand h1 span{color:#10a88a}.brand p{font-size:12px;color:#7b8aa4;margin:3px 0 0}
        .top-right{display:flex;gap:10px;align-items:center}.lang-select{padding:10px 12px;border:1px solid #dce7f3;border-radius:12px;background:white;color:#334766;font-size:13px}
        .privacy-pill{display:flex;align-items:center;gap:8px;padding:9px 12px;border:1px solid #c9efdd;background:#effcf5;border-radius:12px;color:#0c8b5a;font-size:11px;font-weight:700}
        .privacy-pill small{display:block;color:#668e7b;font-weight:500;margin-top:2px}
        .hero{display:grid;grid-template-columns:1.15fr .75fr .8fr;align-items:center;gap:24px;padding:30px 4px 24px}
        h2,h3,h4,p{overflow-wrap:anywhere}.hero h2{font:800 clamp(29px,3.1vw,43px)/1.15 Manrope;margin:0 0 14px;letter-spacing:-1.1px}.hero-copy{font-size:15px;line-height:1.7;color:#5b6e8c;margin:0 0 19px;max-width:500px}
        .feature-list{display:flex;flex-wrap:wrap;gap:14px}.feature{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:700;color:#536783}.feature-icon{width:35px;height:35px;border-radius:12px;display:grid;place-items:center}
        .art{min-height:225px;display:grid;place-items:center;position:relative}.art-circle{width:220px;height:220px;border-radius:50%;background:radial-gradient(circle at 40% 30%,#fff,#e5faf3 55%,#eaf0ff);display:grid;place-items:center;position:relative}
        .art-heart{width:105px;height:105px;display:grid;place-items:center;border-radius:32px;background:linear-gradient(135deg,#ff8c88,#ffb7a0);color:white;transform:rotate(-8deg);box-shadow:0 16px 35px #ff858544}
        .float-icon{position:absolute;width:53px;height:53px;border-radius:18px;display:grid;place-items:center;box-shadow:0 8px 22px #20385b15}.float-one{left:0;bottom:26%;background:#dff8ed;color:#0ba577}.float-two{right:0;top:18%;background:#fff1de;color:#e8a038}.float-three{right:9%;bottom:5%;background:#e8efff;color:#4476ed}
        .how{padding:18px;border:1px solid #e1eaf5;border-radius:18px;background:#fff;box-shadow:0 8px 25px #243a5b07}.how h3{font:800 15px Manrope;margin:0 0 14px}.how-row{display:flex;align-items:center;gap:10px;margin:13px 0}.how-icon{width:36px;height:36px;border-radius:12px;background:#edf1ff;color:#4d70e8;display:grid;place-items:center;flex-shrink:0}.how-row p{font-size:11px;line-height:1.45;color:#7786a0;margin:0}.how-row strong{display:block;font-size:12px;color:#243958;margin-bottom:3px}
        .notice-band{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:12px 15px;background:linear-gradient(100deg,#edf7ff,#f0fbff);border:1px solid #e0effc;border-radius:15px;margin-bottom:18px}.language-tabs{display:flex;align-items:center;gap:7px;flex-wrap:wrap}.language-tabs b{font-size:12px;color:#4e6787;margin-right:5px}.language-tabs button{border:1px solid #d8e5f5;background:white;border-radius:99px;padding:9px 13px;color:#4f6685;font-size:12px;font-weight:700;cursor:pointer}.language-tabs button.active{background:#2869f5;border-color:#2869f5;color:white;box-shadow:0 4px 12px #2869f52c}.notice-text{display:flex;align-items:center;gap:8px;color:#3773a6;font-size:11px;line-height:1.5}
        .layout{display:grid;grid-template-columns:minmax(330px,.88fr) minmax(0,1.42fr);gap:18px;align-items:start}.panel{background:#fff;border:1px solid #e1ebf7;border-radius:19px;padding:17px;box-shadow:0 10px 28px #243b5c06;min-width:0}.panel-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:15px}.panel-head h2{font:800 19px Manrope;margin:0 0 5px}.panel-head p{font-size:11px;color:#8190a7;margin:0;line-height:1.5}.step{background:#edf4ff;color:#2868ee;padding:7px 10px;border-radius:99px;font-size:10px;font-weight:800;white-space:nowrap}
        .section{padding:13px;border:1px solid #e5edf7;border-radius:15px;margin:11px 0;background:linear-gradient(135deg,#fff,#fcfdff)}.section-title{display:flex;align-items:center;gap:10px;margin-bottom:13px}.section-icon{width:37px;height:37px;display:grid;place-items:center;border-radius:13px;flex-shrink:0}.green{background:#e5fbf1;color:#0ca879}.orange{background:#fff1e2;color:#e69330}.pink{background:#fff0f4;color:#e55378}.purple{background:#f1eaff;color:#8855db}.blue{background:#eaf2ff;color:#3979ed}
        .section-title h3{font:800 13px Manrope;margin:0 0 3px}.section-title p{font-size:10px;color:#8795aa;margin:0;line-height:1.4}.fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.field{display:flex;flex-direction:column;gap:6px;min-width:0}.field.full{grid-column:1/-1}.field>span{font-size:10px;font-weight:700;color:#4d607c}.field input,.field select,.field textarea{width:100%;min-width:0;border:1px solid #dbe5f1;border-radius:9px;padding:10px;background:white;color:#253958;font:500 12px 'DM Sans';outline:none}.field input:focus,.field select:focus,.field textarea:focus{border-color:#6496ff;box-shadow:0 0 0 3px #eaf1ff}.field textarea{min-height:72px;resize:vertical}
.checks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 10px;
}

.check {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 54px;
  padding: 13px 15px;
  border: 1.5px solid #cbd8e6;
  border-radius: 13px;
  background: #ffffff;
  color: #172b4d;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s ease,
              background 0.2s ease,
              box-shadow 0.2s ease;
}

.check:hover {
  border-color: #0f9f8f;
  background: #f0fbf8;
}

.check:has(input:checked) {
  border-color: #0f9f8f;
  background: #e8f8f5;
  color: #075e56;
  box-shadow: 0 3px 10px rgba(15, 159, 143, 0.12);
}

.check input {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  accent-color: #087f73;
  cursor: pointer;
}

@media (max-width: 560px) {
  .checks {
    grid-template-columns: 1fr;
  }

  .check {
    min-height: 50px;
    font-size: 14px;
  }
}
 .error{padding:10px;border-radius:9px;background:#fff0f1;color:#be304e;font-size:12px;margin:10px 0}
        .actions{display:flex;gap:9px;margin-top:15px}.primary,.secondary{display:flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:11px;padding:13px;font:800 12px 'DM Sans';cursor:pointer}.primary{flex:1;color:white;background:linear-gradient(100deg,#2869ff,#11be82);box-shadow:0 8px 18px #2b90ef26}.secondary{background:#f1f5fb;color:#61718a;border:1px solid #e0e8f3}.small-note{display:flex;gap:6px;align-items:flex-start;color:#8996a9;font-size:10px;line-height:1.5;margin:10px 1px 0}
        .report-banner{display:flex;align-items:center;gap:12px;background:linear-gradient(110deg,#0eaf9b,#65ce9c);border-radius:15px;padding:16px;color:white;margin-bottom:13px}.banner-icon{width:42px;height:42px;border-radius:14px;background:#ffffff2d;display:grid;place-items:center;flex-shrink:0}.report-banner h2{font:800 17px Manrope;margin:0 0 4px}.report-banner p{font-size:10px;color:#eafff6;margin:0}
        .metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.metric{border:1px solid;border-radius:14px;padding:12px;min-height:139px;min-width:0}.metric.green{background:#f0fcf6;border-color:#d0f1e0;color:#0b966b}.metric.blue{background:#f0f7ff;border-color:#d9e8ff;color:#2b6cdd}.metric.purple{background:#f7f2ff;border-color:#e8ddff;color:#8151d3}.metric.rose{background:#fff3f5;border-color:#ffdee5;color:#d53e64}.metric-title{font-size:10px;font-weight:800;line-height:1.4;display:flex;align-items:center;gap:6px}.metric-icon{width:25px;height:25px;display:grid;place-items:center;border-radius:8px;background:#ffffffba;flex-shrink:0}.metric-value{font:800 21px Manrope;display:block;margin:14px 0 5px;overflow-wrap:anywhere}.metric p{font-size:9px;line-height:1.5;color:#687b95;margin:0}.report-block{border:1px solid #e4edf7;border-radius:15px;padding:14px;margin-top:11px}.block-heading{display:flex;align-items:center;gap:9px;margin-bottom:12px}.block-icon{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:#e7faf1;color:#10a879;flex-shrink:0}.block-heading h3{font:800 13px Manrope;margin:0 0 3px}.block-heading p{font-size:10px;color:#8492a8;margin:0;line-height:1.4}
        .summary-layout{display:grid;grid-template-columns:minmax(0,1fr) 155px;gap:12px;align-items:center}.score-list{display:flex;flex-direction:column;gap:14px}.score-row{display:grid;grid-template-columns:minmax(90px,1fr) minmax(60px,1.5fr) 29px;gap:7px;align-items:center;font-size:10px;color:#526783}.bar{height:8px;background:#e9eff5;border-radius:99px;overflow:hidden}.bar span{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#14b785,#50d6a3)}.score-number{text-align:right;font-weight:800;color:#3d5576}.score-callout{padding:12px;border:1px solid #d2f3e3;background:linear-gradient(145deg,#effff7,#e7fbf3);border-radius:13px;text-align:center}.score-callout h4{font:800 11px Manrope;color:#167956;margin:0}.ring{width:83px;height:83px;margin:12px auto 8px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(#14b881 var(--score),#d8f0e5 0);position:relative;color:#14885f;font:800 19px Manrope}.ring:before{content:"";position:absolute;inset:7px;background:#effff7;border-radius:50%}.ring span{position:relative}.score-callout p{font-size:9px;line-height:1.5;color:#5e8274;margin:6px 0 0}
        .two-col{display:grid;grid-template-columns:1.08fr .92fr;gap:11px}.food-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.food-box{padding:10px;border-radius:11px}.food-box.good{background:#effcf5;border:1px solid #d3f3e1}.food-box.limit{background:#fff3f5;border:1px solid #ffdee5}.food-box h4{font:800 10px Manrope;margin:0 0 8px}.food-box ul{list-style:none;margin:0;padding:0;display:grid;gap:7px}.food-box li{display:flex;gap:5px;align-items:flex-start;font-size:9px;line-height:1.45;color:#536782}.meal-plan{margin-top:9px;background:#f0f7ff;border:1px solid #dceaff;border-radius:11px;padding:11px}.meal-plan h4{font:800 10px Manrope;color:#2c60b6;margin:0 0 8px}.meal-row{display:flex;gap:8px;margin:7px 0;font-size:9px;line-height:1.5;color:#526a87}.meal-row strong{min-width:68px;color:#285da0}.routine-list{display:grid;gap:11px}.routine-item{display:flex;gap:8px;align-items:flex-start;font-size:10px;line-height:1.5;color:#536782}.routine-icon{width:28px;height:28px;border-radius:9px;background:#edf4ff;color:#3878ed;display:grid;place-items:center;flex-shrink:0}
        .concern{padding:12px;border:1px solid #d4f1df;background:#effbf4;color:#2d7654;border-radius:11px;font-size:10px;line-height:1.6}.concern.warning{border-color:#ffe5b6;background:#fff8e9;color:#93611b}.disclaimer{display:flex;gap:9px;padding:13px;border:1px solid #ffe6b9;background:#fff8eb;border-radius:13px;color:#9b6719}.disclaimer h3{font:800 11px Manrope;margin:0 0 6px}.disclaimer p{font-size:9px;line-height:1.65;color:#896b3e;margin:0}.empty{min-height:350px;border:1px dashed #cfdeef;border-radius:15px;background:linear-gradient(145deg,#fbfdff,#f4f9ff);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:30px}.empty-icon{width:64px;height:64px;border-radius:21px;background:#e8f2ff;color:#3475ef;display:grid;place-items:center;margin-bottom:13px}.empty h3{font:800 16px Manrope;margin:0 0 8px}.empty p{font-size:11px;color:#8190a8;line-height:1.7;max-width:300px;margin:0}.footer{display:flex;justify-content:center;align-items:center;gap:10px;padding:24px 0 0;color:#159a73;font-size:11px;font-weight:800}.footer-line{width:38px;height:1px;background:#cceee0}
        @media(max-width:1100px){.hero{grid-template-columns:1fr .8fr}.how{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.how h3{grid-column:1/-1}.how-row{margin:4px 0}.layout{grid-template-columns:minmax(300px,.9fr) minmax(0,1.1fr)}.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:760px){.container{padding:0 12px}.top{flex-wrap:wrap}.brand h1{font-size:21px}.hero{grid-template-columns:1fr;padding:23px 2px 17px;gap:12px}.hero h2{font-size:31px}.art{min-height:175px}.art-circle{width:180px;height:180px}.art-heart{width:85px;height:85px}.how{display:block}.how-row{margin:11px 0}.layout{grid-template-columns:1fr}.panel{padding:13px}.notice-text{width:100%}.summary-layout{grid-template-columns:1fr}.score-callout{max-width:250px;width:100%;margin:auto}.two-col{grid-template-columns:1fr}.privacy-pill{display:none}}
        @media(max-width:420px){.fields{grid-template-columns:1fr}.field.full,.checks{grid-column:auto}.metrics{gap:6px}.metric{padding:9px;min-height:135px}.metric-title{font-size:9px}.metric-value{font-size:18px}.food-grid{grid-template-columns:1fr}.actions{flex-direction:column}.primary,.secondary{width:100%}.score-row{grid-template-columns:minmax(82px,1fr) minmax(55px,1fr) 25px;gap:5px;font-size:9px}.top-right{margin-left:auto}.lang-select{padding:8px}.report-banner{padding:12px}}


        /* Clean layout with subtle, accessible motion — no promotional banners */
        .top{animation:fadeDown .45s ease-out both}
        .panel{animation:fadeUp .5s ease-out both}
        .section,.report-block,.metric,.food-box,.meal-plan,.disclaimer{animation:fadeUp .45s ease-out both;transition:transform .2s ease,box-shadow .2s ease}
        .section:hover,.report-block:hover,.metric:hover{transform:translateY(-2px);box-shadow:3px 5px 0 #d8dfeb}
        .brand-logo{animation:softPulse 3s ease-in-out infinite}
        .section-icon,.block-icon,.metric-icon,.empty-icon{transition:transform .22s ease}
        .section:hover .section-icon,.report-block:hover .block-icon,.metric:hover .metric-icon{transform:scale(1.06) rotate(-3deg)}
        .field input,.field select,.field textarea,.check,.lang-select,.privacy-pill{transition:border-color .18s ease,box-shadow .18s ease,background-color .18s ease}
        .primary{background:linear-gradient(110deg,#245de8,#05a981);background-size:180% 180%;transition:background-position .3s ease,transform .15s ease,box-shadow .15s ease}
        .primary:hover{background-position:100% 50%}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes softPulse{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}

        /* Enhanced bold, high-contrast visual design */
        body{background:#eef2f8;color:#101b33}
        .hm{background:radial-gradient(circle at 8% 4%,#e0f7f1 0,transparent 27%),radial-gradient(circle at 94% 12%,#e6eaff 0,transparent 25%),linear-gradient(180deg,#f4f7fc 0%,#fff 52%,#f1f5fb 100%)}
        .container{max-width:1380px}
        .top{border-bottom:2px solid #17243b;padding:20px 0}
        .brand-logo{height:58px;width:58px;border:2px solid #17243b;border-radius:18px;box-shadow:0 7px 0 #17243b;background:linear-gradient(135deg,#11c5a0,#3975ff)}
        .brand h1{font-size:clamp(27px,3vw,36px);letter-spacing:-1.2px;color:#111d35}
        .brand h1 span{color:#087f68}
        .brand p{font-size:14px;font-weight:600;color:#455570}
        .lang-select,.privacy-pill{border:2px solid #17243b;box-shadow:3px 3px 0 #17243b;border-radius:12px;font-weight:800}
        .hero{padding:38px 4px 30px;gap:28px}
        .hero h2{font-size:clamp(36px,4vw,56px);line-height:1.08;letter-spacing:-1.7px;color:#111d35;text-shadow:1px 2px 0 #fff}
        .hero-copy{font-size:17px;color:#43536e;line-height:1.8}
        .feature{font-size:13px;color:#1d2c46;font-weight:800}
        .feature-icon{width:42px;height:42px;border:1.5px solid #17243b;border-radius:14px;box-shadow:2px 3px 0 #17243b}
        .art-circle{border:2px solid #17243b;box-shadow:8px 8px 0 #17243b;background:radial-gradient(circle at 35% 25%,#fff,#d9f9ee 53%,#dfe8ff)}
        .art-heart{border:2px solid #17243b;box-shadow:5px 6px 0 #17243b}
        .float-icon{border:2px solid #17243b;box-shadow:3px 4px 0 #17243b}
        .how{border:2px solid #17243b;border-radius:20px;box-shadow:5px 6px 0 #17243b;padding:21px}
        .how h3{font-size:19px;color:#111d35}
        .how-row p{font-size:13px;color:#52617a}
        .how-row strong{font-size:14px;color:#17243b}
        .how-icon{border:1.5px solid #17243b;width:42px;height:42px}
        .notice-band{border:2px solid #17243b;box-shadow:4px 4px 0 #17243b;background:linear-gradient(100deg,#e9f4ff,#e6fff5)}
        .language-tabs button{border:1.5px solid #17243b;box-shadow:2px 2px 0 #17243b;font-size:13px}
        .layout{gap:22px}
        .panel{border:2px solid #17243b;border-radius:22px;padding:24px;box-shadow:6px 7px 0 #17243b;}
        .panel-head{margin-bottom:21px}
        .panel-head h2{font-size:clamp(24px,2.5vw,31px);letter-spacing:-.5px;color:#101b33}
        .panel-head p{font-size:13px;color:#52617a}
        .step{border:1.5px solid #17243b;box-shadow:2px 2px 0 #17243b;font-size:12px}
        .section{padding:19px;border:1.7px solid #25344d;border-radius:18px;margin:16px 0;background:linear-gradient(135deg,#fff,#f7faff);box-shadow:2px 3px 0 #d7dfeb}
        .section-title{gap:13px;margin-bottom:17px}
        .section-icon{width:46px;height:46px;border:1.5px solid #17243b;border-radius:15px}
        .section-title h3{font-size:17px;color:#111d35}
        .section-title p{font-size:12px;color:#5c6b82}
        .fields{gap:16px}
        .field{gap:8px}
        .field>span{font-size:13px;color:#1b2a43;font-weight:800}
        .field input,.field select,.field textarea{border:1.7px solid #25344d;border-radius:12px;padding:13px 14px;min-height:47px;font-size:14px;color:#17243b;box-shadow:1px 2px 0 #e0e6ef}
        .field input:focus,.field select:focus,.field textarea:focus{border-color:#1769e8;box-shadow:0 0 0 4px #dceaff}
        .field textarea{min-height:100px}
        .check{border:1.5px solid #25344d;border-radius:11px;padding:10px 12px;font-size:12px;color:#25344d;background:#fff}
        .check:has(input:checked){background:#e8f8f1;border-color:#087f68;color:#075c4e}
        .actions{gap:13px;margin-top:22px}
        .primary,.secondary{border:2px solid #17243b;border-radius:13px;padding:16px;font-size:14px;box-shadow:3px 4px 0 #17243b;transition:transform .15s ease,box-shadow .15s ease}
        .primary{background:linear-gradient(100deg,#245de8,#05a981)}
        .primary:hover,.secondary:hover{transform:translate(1px,1px);box-shadow:2px 3px 0 #17243b}
        .secondary{background:#fff;color:#17243b}
        .small-note{font-size:12px;color:#53627a;margin-top:14px}
        .metrics{gap:13px}
        .metric{border-width:1.7px;border-color:#25344d;border-radius:17px;padding:16px;min-height:155px;box-shadow:3px 4px 0 #d8dfeb}
        .metric-title{font-size:12px;color:#17243b}
        .metric-icon{border:1px solid #25344d}
        .metric-value{font-size:clamp(25px,2.4vw,32px);color:#111d35;margin:18px 0 8px}
        .metric p{font-size:11px;color:#4e5d75}
        .report-block{border:1.7px solid #25344d;border-radius:18px;padding:19px;margin-top:16px;box-shadow:2px 3px 0 #d8dfeb}
        .block-heading h3{font-size:17px;color:#111d35}
        .block-heading p{font-size:12px}
        .block-icon{border:1.5px solid #17243b;width:40px;height:40px}
        .score-row{font-size:12px;color:#34445f}
        .bar{height:11px;border:1px solid #b6c3d5}
        .score-callout{border:1.7px solid #17243b;box-shadow:3px 4px 0 #d8dfeb;padding:15px}
        .score-callout h4{font-size:14px}
        .ring{width:100px;height:100px;font-size:23px}
        .score-callout p{font-size:11px}
        .food-box,.meal-plan{border-width:1.5px;border-color:#25344d}
        .food-box h4,.meal-plan h4{font-size:13px}
        .food-box li,.meal-row,.routine-item{font-size:12px}
        .concern,.disclaimer{border-width:1.5px;border-color:#25344d;font-size:12px}
        .disclaimer h3{font-size:14px}
        .disclaimer p{font-size:11px}
        .empty{border:2px dashed #25344d;box-shadow:inset 0 0 0 5px #f0f5fc;min-height:430px}
        .empty-icon{width:82px;height:82px;border:1.5px solid #17243b;box-shadow:3px 4px 0 #17243b}
        .empty h3{font-size:22px;color:#111d35}
        .empty p{font-size:13px;color:#52617a}
        .footer{font-size:13px;color:#087f68}
        @media(max-width:760px){.container{padding:0 14px}.top{border-bottom-width:2px}.brand h1{font-size:25px}.hero h2{font-size:36px}.hero-copy{font-size:15px}.panel{padding:16px;box-shadow:4px 5px 0 #17243b}.section{padding:14px}.section-title h3{font-size:15px}.field>span{font-size:12px}.field input,.field select,.field textarea{font-size:14px;padding:12px}.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.metric{padding:12px}.metric-title{font-size:10px}.metric-value{font-size:24px}.empty{min-height:320px}}
        @media(max-width:420px){.brand h1{font-size:22px}.hero h2{font-size:31px}.panel-head h2{font-size:22px}.section-title h3{font-size:14px}.fields{grid-template-columns:1fr}.field.full,.checks{grid-column:auto}.metric{min-height:132px}.metric-value{font-size:21px}.primary,.secondary{font-size:13px;padding:14px}}

        /* Premium healthcare dashboard theme */
        body{background:#f4f7fb;color:#15243b}
        .hm{background:#f4f7fb;color:#15243b;padding-bottom:36px}
        .container{max-width:1240px;padding-left:28px;padding-right:28px}
        .top{position:relative;display:flex;align-items:center;padding:20px 0 22px;border-bottom:1px solid #d9e2ee;gap:18px}
        .brand{gap:14px}
        .brand-logo{width:54px;height:54px;border:0;border-radius:16px;background:#087f8c;color:#fff;box-shadow:0 7px 18px #087f8c25;animation:none}
        .brand h1{font-size:clamp(27px,3vw,34px);letter-spacing:-1px;color:#14243b}
        .brand h1 span{color:#087f8c}
        .brand p{font-size:13px;font-weight:600;color:#61718a}
        .top-right{gap:12px}
        .lang-select,.privacy-pill{border:1px solid #cbd6e4;border-radius:12px;box-shadow:none;background:#fff;color:#263a54;padding:11px 13px}
        .privacy-pill{background:#eaf8f5;border-color:#b9e5dc;color:#087f72}
        .privacy-pill small{color:#547e79}
        .layout{max-width:100%;gap:22px}
        .panel{background:#fff;border:1px solid #d5dfeb;border-radius:18px;padding:clamp(18px,2.5vw,30px);box-shadow:0 8px 28px #1a34510b;animation:fadeUp .35s ease-out both}
        .panel-head{align-items:center;margin-bottom:24px;padding-bottom:17px;border-bottom:1px solid #e5ebf3}
        .panel-head h2{font-size:clamp(25px,2.5vw,32px);letter-spacing:-.7px;color:#15243b}
        .panel-head p{font-size:13px;color:#667790;max-width:680px}
        .step{background:#e9f7f5;border:1px solid #b9e4de;color:#087f72;box-shadow:none;border-radius:9px;font-size:11px;padding:8px 11px}
        .section{background:#fff;border:1px solid #d4deea;border-radius:15px;padding:21px;margin:16px 0;box-shadow:none;transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease}
        .section:hover{transform:translateY(-1px);border-color:#8abebc;box-shadow:0 5px 15px #193b5510}
        .section-title{gap:13px;margin-bottom:19px}
        .section-icon{width:43px;height:43px;border:0;border-radius:12px}
        .section-title h3{font-size:17px;letter-spacing:-.2px;color:#17283f}
        .section-title p{font-size:12px;color:#718099}
        .green{background:#e5f6f1;color:#087f72}.orange{background:#fff3e7;color:#b66a19}.pink{background:#ffedf1;color:#bf4261}.purple{background:#f1edff;color:#7154bf}.blue{background:#eaf2ff;color:#2c67c7}
        .fields{gap:18px}
        .field{gap:8px}
        .field>span{font-size:13px;font-weight:700;color:#283b54}
        .field input,.field select,.field textarea{min-height:48px;border:1px solid #bac8d9;border-radius:10px;padding:12px 14px;background:#fff;color:#1b2d45;font:500 14px 'DM Sans',sans-serif;box-shadow:none;transition:border-color .18s ease,box-shadow .18s ease}
        .field input::placeholder,.field textarea::placeholder{color:#9aa8ba}
        .field input:focus,.field select:focus,.field textarea:focus{border-color:#078b8c;box-shadow:0 0 0 3px #dff4f1;outline:none}
        .field textarea{min-height:104px}
        .check{border:1px solid #cbd6e3;background:#fff;color:#44566f;border-radius:9px;padding:10px 12px;font-size:12px;transition:all .18s ease}
        .check:hover{border-color:#078b8c}
        .check:has(input:checked){background:#e9f7f4;border-color:#078b8c;color:#086c66}
        .actions{gap:12px;margin-top:24px}
        .primary,.secondary{min-height:49px;border-radius:10px;padding:14px 18px;font-size:14px;font-weight:800;box-shadow:none;transition:transform .16s ease,background .16s ease,border-color .16s ease}
        .primary{background:#087f8c;color:#fff;border:1px solid #087f8c}
        .primary:hover{background:#066b77;transform:translateY(-1px);box-shadow:0 5px 13px #087f8c25}
        .secondary{background:#fff;color:#263b55;border:1px solid #c6d2e0}
        .secondary:hover{background:#f3f7fb;border-color:#8ea1b8;transform:translateY(-1px)}
        .small-note{font-size:11px;color:#718099;line-height:1.6}
        .metrics{gap:12px}
        .metric{background:#fff;border:1px solid #d4deea;border-radius:14px;padding:17px;min-height:145px;box-shadow:none;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
        .metric:hover{transform:translateY(-2px);border-color:#9dbbc8;box-shadow:0 6px 18px #18354c0d}
        .metric.green{background:#f3fbf8;border-color:#c9e8df;color:#087f72}.metric.blue{background:#f3f7ff;border-color:#d1def6;color:#2c67c7}.metric.purple{background:#f8f5ff;border-color:#e0d8f6;color:#7154bf}.metric.rose{background:#fff5f6;border-color:#f2d4dc;color:#b63d5b}
        .metric-title{font-size:11px;color:#334861}
        .metric-icon{border:1px solid #d2dce8;background:#fff}
        .metric-value{font-size:clamp(25px,2.4vw,32px);color:#17283f}
        .metric p{font-size:10px;color:#667790}
        .report-block{background:#fff;border:1px solid #d4deea;border-radius:15px;padding:20px;margin-top:15px;box-shadow:none}
        .block-heading h3{font-size:16px;color:#17283f}
        .block-heading p{font-size:11px;color:#718099}
        .block-icon{background:#e5f6f1;color:#087f72;border:0}
        .bar{height:9px;border:0;background:#e7edf4}
        .bar span{background:linear-gradient(90deg,#087f8c,#3bb69b)}
        .score-callout{background:#f0faf7;border:1px solid #c5e8df;box-shadow:none;border-radius:13px}
        .ring{color:#087f72;background:conic-gradient(#0a9a8d var(--score),#d9eee9 0)}
        .ring:before{background:#f0faf7}
        .food-box,.meal-plan{border-radius:12px}
        .empty{background:#f8fbfe;border:1px dashed #b9c9da;box-shadow:none;border-radius:15px}
        .empty-icon{background:#e5f6f1;color:#087f72;border:0;box-shadow:none}
        .footer{color:#087f72}
        .report-banner{display:none!important}
        @media(max-width:760px){.container{padding-left:14px;padding-right:14px}.top{align-items:flex-start}.brand-logo{width:46px;height:46px}.brand h1{font-size:24px}.panel{padding:17px}.section{padding:16px}.panel-head h2{font-size:24px}.field>span{font-size:12px}.field input,.field select,.field textarea{font-size:14px}.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:480px){.top{flex-wrap:wrap}.top-right{width:100%;justify-content:flex-end}.privacy-pill{display:none}.brand h1{font-size:22px}.panel{padding:13px}.panel-head{gap:8px}.panel-head h2{font-size:22px}.section-title h3{font-size:15px}.fields{grid-template-columns:1fr}.field.full,.checks{grid-column:auto}.metrics{gap:8px}.metric{padding:12px;min-height:130px}.metric-title{font-size:10px}.metric-value{font-size:22px}.actions{flex-direction:column}.primary,.secondary{width:100%}}

        /* Premium healthcare visual refresh */
        .hm{background:radial-gradient(ellipse at 90% 0%,#dff8f4 0,transparent 32%),linear-gradient(180deg,#f7fbff 0%,#fff 58%,#f4f8ff 100%)}
        .container{max-width:1380px}
        .top{position:relative;padding:20px 0;border-bottom:1px solid #dce8f4}
        .brand-logo{width:54px;height:54px;border-radius:18px;background:linear-gradient(135deg,#087f8c,#14b89a);box-shadow:0 12px 25px #087f8c30}
        .brand h1{font-size:28px;letter-spacing:-1.2px}
        .brand p{font-size:13px}
        .hero{position:relative;overflow:hidden;grid-template-columns:1.1fr .72fr .82fr;gap:28px;margin:22px 0 24px;padding:36px 30px;border:1px solid #d5e8f2;border-radius:28px;background:linear-gradient(115deg,#071b34 0%,#0b4560 54%,#087f8c 100%);box-shadow:0 22px 50px #0b456020}
        .hero:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 65% 40%,#22d3ee25,transparent 30%),linear-gradient(90deg,transparent,#001a3220);pointer-events:none}
        .hero>div{position:relative;z-index:1}
        .hero h2{color:#fff;font-size:clamp(30px,3.3vw,46px);letter-spacing:-1.5px}
        .hero-copy{color:#d4e9f4;font-size:15px}
        .feature{color:#e4f5fa;font-size:12px}
        .art-circle{width:230px;height:230px;background:radial-gradient(circle at 45% 35%,#d8fff9,#6ce1db 48%,#147c9a 78%);box-shadow:0 0 0 12px #ffffff0c,0 18px 55px #00d4d433}
        .art-heart{background:linear-gradient(135deg,#fff,#c6fff2);color:#087f8c;box-shadow:0 15px 40px #001a3230}
        .float-one,.float-two,.float-three{box-shadow:0 10px 28px #001a3240;border:1px solid #ffffff80;animation:hm-float 4s ease-in-out infinite}
        .float-two{animation-delay:.7s}.float-three{animation-delay:1.2s}
        .how{border:1px solid #ffffff35;background:#fffffffa;box-shadow:0 18px 45px #001a3230;border-radius:20px}
        .notice-band{border-radius:16px;box-shadow:0 8px 24px #233b5a08}
        .layout{margin-top:22px}
        .panel{border:1px solid #d8e4f0;border-radius:22px;padding:clamp(18px,2.4vw,30px);box-shadow:0 16px 42px #1c365012;background:rgba(255,255,255,.96)}
        .panel-head{padding-bottom:18px;border-bottom:1px solid #e8eef6}
        .panel-head h2,.report-banner h2{font-size:clamp(25px,2.8vw,34px);letter-spacing:-.8px}
        .section{border:1px solid #dbe7f1!important;border-radius:18px!important;background:linear-gradient(145deg,#fff,#fbfdff)!important;box-shadow:0 8px 24px #173c5a08!important;padding:22px!important;transition:transform .22s ease,box-shadow .22s ease}
        .section:hover{transform:translateY(-2px);box-shadow:0 14px 30px #173c5a10!important}
        .section-title h3{font-size:18px!important;letter-spacing:-.25px}
        .field>span,.field label{font-size:13px!important;font-weight:750!important;color:#243a55!important}
        .field input,.field select,.field textarea{min-height:51px!important;border:1.5px solid #c8d6e5!important;border-radius:12px!important;background:#fbfdff!important;transition:border-color .2s,box-shadow .2s,background .2s!important}
        .field input:focus,.field select:focus,.field textarea:focus{border-color:#0b9d91!important;box-shadow:0 0 0 4px #0b9d911a!important;background:#fff!important;outline:none!important}
        .primary{background:linear-gradient(115deg,#087f8c,#0da98e)!important;border:0!important;border-radius:13px!important;box-shadow:0 9px 20px #087f8c25!important}
        .primary:hover{background:linear-gradient(115deg,#076d7a,#078b77)!important;box-shadow:0 13px 25px #087f8c35!important}
        .secondary{border:1.5px solid #cbd9e8!important;border-radius:13px!important;background:#fff!important}
        .metric{border:1px solid #dbe7f1!important;border-radius:18px!important;box-shadow:0 8px 22px #1836530a!important;transition:transform .2s,box-shadow .2s}
        .metric:hover{transform:translateY(-3px);box-shadow:0 14px 30px #18365313!important}
        .report-block{border:1px solid #dce7f1!important;border-radius:18px!important;box-shadow:0 8px 22px #18365308!important}
        .empty{border:1.5px dashed #a9c8d5!important;border-radius:20px!important;background:linear-gradient(135deg,#f2fbff,#f2fcf8)!important}
        .footer{padding-top:25px}
        @keyframes hm-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @media(max-width:900px){.hero{grid-template-columns:1fr 1fr;padding:26px}.how{grid-column:1/-1}.hero>div:first-child{grid-column:1/-1}}
        @media(max-width:560px){.hero{grid-template-columns:1fr;padding:23px 18px;border-radius:20px}.hero>div:first-child,.how{grid-column:auto}.art{min-height:190px}.art-circle{width:185px;height:185px}.top{padding:15px 0}.brand h1{font-size:24px}.section{padding:16px!important}}
        @media(prefers-reduced-motion:reduce){.float-one,.float-two,.float-three{animation:none!important}.section,.metric{transition:none!important}}

      `}</style>

      <div className="container">
        <header className="top">
          <div className="brand">
            <div className="brand-logo"><HeartPulse size={29}/></div>
            <div>
              <h1>HealthMate <span>AI</span></h1>
              <p>{t.title}</p>
            </div>
          </div>
          <div className="top-right">
            <label className="lang-select">
              <Languages size={15} style={{verticalAlign:"middle",marginRight:5}}/>
              <select value={lang} onChange={e=>setLang(e.target.value)} aria-label="Language">
                <option value="en">English</option>
                <option value="gu">ગુજરાતી</option>
                <option value="hi">हिन्दी</option>
              </select>
            </label>
            <div className="privacy-pill"><ShieldCheck size={18}/><div>{t.temporary}<small>Browser only</small></div></div>
          </div>
        </header>

        <main className="layout" style={{display:"block"}}>
          <section className="panel" id="health-form" style={{display:report?"none":"block",width:"100%"}}>
            <div className="panel-head">
              <div><h2>{t.form}</h2><p>{t.submitHint}</p></div>
              <span className="step">01 / 02</span>
            </div>

            <form onSubmit={generate}>
              <Section icon={HeartPulse} title={t.personal} subtitle="Basic information about you" color="green">
                <Field label={t.age}><input type="number" min="1" max="120" value={form.age} onChange={e=>update("age",e.target.value)} required/></Field>
                <SelectField label={t.gender} value={form.gender} items={options.gender} onChange={v=>update("gender",v)}/>
                <Field label={t.height}><input type="number" min="30" max="260" step="0.1" placeholder="e.g. 160" value={form.height} onChange={e=>update("height",e.target.value)} required/></Field>
                <Field label={t.weight}><input type="number" min="2" max="500" step="0.1" placeholder="e.g. 48" value={form.weight} onChange={e=>update("weight",e.target.value)} required/></Field>
              </Section>

              <Section icon={Activity} title={t.lifestyle} subtitle="Your everyday activity and habits" color="orange">
                <SelectField label={t.activity} value={form.activity} items={options.activity} onChange={v=>update("activity",v)}/>
                <SelectField label={t.sleep} value={form.sleep} items={options.sleep} onChange={v=>update("sleep",v)}/>
                <SelectField label={t.water} value={form.water} items={options.water} onChange={v=>update("water",v)}/>
                <SelectField label={t.smoking} value={form.smoking} items={options.smoking} onChange={v=>update("smoking",v)}/>
                <SelectField label={t.alcohol} value={form.alcohol} items={options.alcohol} onChange={v=>update("alcohol",v)}/>
              </Section>

              <Section icon={Utensils} title={t.food || "Food & Diet"} subtitle="Food preferences and goals" color="pink">
                <SelectField label={t.diet} value={form.diet} items={options.diet} onChange={v=>update("diet",v)}/>
                <SelectField label={t.goal} value={form.goal} items={options.goal} onChange={v=>update("goal",v)}/>
              </Section>

              <Section icon={Brain} title={t.mind} subtitle="Self-reported feelings, not a diagnosis" color="purple">
                <SelectField label={t.mood} value={form.mood} items={options.mood} onChange={v=>update("mood",v)}/>
                <SelectField label={t.stress} value={form.stress} items={options.stress} onChange={v=>update("stress",v)}/>
                <div className="field full">
                  <span>{t.concerns}</span>
                  <div className="checks">
                    {concernsList.map(item=><label className="check" key={item}>
                      <input type="checkbox" checked={form.concerns.includes(item)} onChange={e=>update("concerns",e.target.checked?[...form.concerns,item]:form.concerns.filter(x=>x!==item))}/>
                      {t[item] || item}
                    </label>)}
                  </div>
                </div>
                <Field label={t.notes} full><textarea value={form.notes} onChange={e=>update("notes",e.target.value)} placeholder="Optional details…"/></Field>
              </Section>

              <Section icon={Droplet} title={t.medical} subtitle="Optional health details" color="blue">
                <SelectField label={t.blood} value={form.blood} items={options.blood} onChange={v=>update("blood",v)}/>
                <SelectField label={t.condition} value={form.condition} items={options.condition} onChange={v=>update("condition",v)}/>
                <SelectField label={t.allergy} value={form.allergy} items={options.allergy} onChange={v=>update("allergy",v)}/>
              </Section>

              {error && <div className="error"><AlertCircle size={15} style={{verticalAlign:"middle",marginRight:6}}/>{error}</div>}
              <div className="actions">
                <button className="primary" type="submit"><Sparkles size={17}/>{t.generate}</button>
                <button className="secondary" type="button" onClick={reset}><RotateCcw size={15}/>{t.reset}</button>
              </div>
              <p className="small-note"><ShieldCheck size={14}/>{t.temporary}. Refreshing or closing the page clears the current entries.</p>
            </form>
          </section>

          <section className="panel" id="report" style={{display:report?"block":"none",width:"100%"}}>
            <div className="panel-head">
              <div><h2>{t.report}</h2><p>{report ? t.ready : t.submitHint}</p></div>
              <span className="step">02 / 02</span>
            </div>

            {!report ? <div className="empty">
              <div className="empty-icon"><HeartPulse size={32}/></div>
              <h3>{lang==="gu"?"તમારો રિપોર્ટ અહીં દેખાશે":lang==="hi"?"आपकी रिपोर्ट यहाँ दिखाई देगी":"Your personalized report will appear here"}</h3>
              <p>{t.submitHint}</p>
              <p style={{marginTop:14}}><ShieldCheck size={14} style={{verticalAlign:"middle",marginRight:5}}/>{t.temporary}</p>
            </div> : <>
<div className="metrics">
                <article className="metric green">
                  <div className="metric-title"><span className="metric-icon"><ShieldCheck size={16}/></span>{t.lifestyleScore}</div>
                  <strong className="metric-value">{score}%</strong>
                  <p>{t.notDiagnosis}</p>
                </article>
                <article className="metric blue">
                  <div className="metric-title"><span className="metric-icon"><Activity size={16}/></span>{t.bmi}</div>
                  <strong className="metric-value">{bmi===null?"—":bmi.toFixed(1)}</strong>
                  <p>{bmiLabel()}</p>
                </article>
                <article className="metric purple">
                  <div className="metric-title"><span className="metric-icon"><Brain size={16}/></span>{t.moodCard}</div>
                  <strong className="metric-value" style={{fontSize:16}}>{trOption(form.mood)}</strong>
                  <p>{t.stress}: {trOption(form.stress)}</p>
                </article>
                <article className="metric rose">
                  <div className="metric-title"><span className="metric-icon"><Droplet size={16}/></span>{t.bloodCard}</div>
                  <strong className="metric-value">{form.blood==="Unknown"?"—":form.blood}</strong>
                  <p>{lang==="gu"?"માત્ર નોંધ; ટેસ્ટથી પુષ્ટિ કરો":lang==="hi"?"केवल दर्ज जानकारी; जाँच से पुष्टि करें":"Recorded information; confirm with a test"}</p>
                </article>
              </div>

              <div className="report-block">
                <div className="block-heading"><span className="block-icon"><Activity size={18}/></span><div><h3>{t.summary}</h3><p>{t.notDiagnosis}</p></div></div>
                <div className="summary-layout">
                  <div className="score-list">
                    {[
                      [t.activity,form.activity==="Very active"?100:form.activity==="Moderate"?85:form.activity==="Light"?65:40],
                      [t.sleep,form.sleep==="7–9 hours"?100:form.sleep==="6–7 hours"?65:form.sleep==="Less than 6 hours"?35:70],
                      [t.water,form.water==="2–3 litres"?85:form.water==="1–2 litres"?75:form.water==="More than 3 litres"?80:45],
                      [t.mood,form.mood==="Mostly good"?85:form.mood==="Mixed / okay"?65:40],
                      [t.stress,form.stress==="Low"?90:form.stress==="Moderate"?65:35]
                    ].map(([label,value])=><div className="score-row" key={label}><span>{label}</span><div className="bar"><span style={{width:`${value}%`}}/></div><span className="score-number">{value}</span></div>)}
                  </div>
                  <div className="score-callout"><h4>{t.lifestyleScore}</h4><div className="ring" style={{"--score":`${score}%`}}><span>{score}%</span></div><p>{t.notDiagnosis}</p></div>
                </div>
              </div>

              <div className="two-col">
                <div className="report-block">
                  <div className="block-heading"><span className="block-icon" style={{background:"#fff1e2",color:"#e69330"}}><Utensils size={18}/></span><div><h3>{t.nutrition}</h3><p>{t.foodTip}</p></div></div>
                  <div className="food-grid">
                    <div className="food-box good"><h4>{lang==="gu"?"સારા વિકલ્પો":lang==="hi"?"अच्छे विकल्प":"Ideas to include"}</h4><ul>{foodIdeas.slice(0,3).map(x=><li key={x}><span style={{color:"#0ca879"}}>✓</span>{x}</li>)}</ul></div>
                    <div className="food-box limit"><h4>{lang==="gu"?"મર્યાદિત રાખો":lang==="hi"?"सीमित रखें":"Consider limiting"}</h4><ul>{[
                      lang==="gu"?"વધુ પ્રોસેસ્ડ નાસ્તા":lang==="hi"?"अत्यधिक प्रोसेस्ड स्नैक्स":"Highly processed snacks",
                      lang==="gu"?"વધુ મીઠાં પીણાં":lang==="hi"?"अधिक मीठे पेय":"Sugary drinks",
                      lang==="gu"?"વધુ મીઠું":lang==="hi"?"अधिक नमक":"Excess salt"
                    ].map(x=><li key={x}><span style={{color:"#d83f61"}}>×</span>{x}</li>)}</ul></div>
                  </div>
                  <div className="meal-plan"><h4>{lang==="gu"?"ઉદાહરણ ભોજન યોજના":lang==="hi"?"उदाहरण भोजन योजना":"Example meal ideas"}</h4>{[[lang==="gu"?"નાસ્તો":lang==="hi"?"नाश्ता":"Breakfast",foodIdeas[0]],[lang==="gu"?"બપોર":lang==="hi"?"दोपहर": "Lunch",foodIdeas[1]],[lang==="gu"?"રાત્રિ":lang==="hi"?"रात का भोजन":"Dinner",foodIdeas[2]],[lang==="gu"?"નાસ્તો":lang==="hi"?"हल्का नाश्ता":"Snack",foodIdeas[3]]].map(([a,b])=><div className="meal-row" key={a}><strong>{a}</strong><span>{b}</span></div>)}</div>
                  {form.allergy!=="None" && <p style={{fontSize:10,color:"#a45c20",lineHeight:1.5}}>Important: avoid foods related to your selected allergy/restriction ({trOption(form.allergy)}). Check food labels and consult a professional if needed.</p>}
                </div>

                <div className="report-block">
                  <div className="block-heading"><span className="block-icon" style={{background:"#eaf2ff",color:"#3979ed"}}><Heart size={18}/></span><div><h3>{t.routine}</h3><p>{t.tips}</p></div></div>
                  <div className="routine-list">{routineTips.map(([Icon,tip])=><div className="routine-item" key={tip}><span className="routine-icon"><Icon size={15}/></span><span>{tip}</span></div>)}</div>
                </div>
              </div>

              <div className="two-col">
                <div className="report-block">
                  <div className="block-heading"><span className="block-icon" style={{background:"#eaf2ff",color:"#3979ed"}}><ShieldCheck size={18}/></span><div><h3>{t.concerns}</h3><p>{t.tips}</p></div></div>
                  <div className={`concern ${form.concerns.length||form.condition!=="None"?"warning":""}`}>
                    {form.concerns.length ? <><strong>{t.selected}:</strong> {form.concerns.map(x=>t[x]||x).join(", ")}<br/></> : t.noConcerns}
                    {form.condition!=="None" && <p>{t.condition}: {trOption(form.condition)}</p>}
                    {form.notes.trim() && <p>{t.notes}: {form.notes}</p>}
                    <p>{t.moodNotice}</p>
                  </div>
                </div>
                <div className="disclaimer">
                  <AlertCircle size={20} style={{flexShrink:0}}/>
                  <div><h3>{t.disclaimer}</h3><p>{t.disclaimerText}</p><p style={{marginTop:7}}>{t.notDiagnosis}</p></div>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"flex-end",marginTop:12}}>
                <button type="button" className="secondary" onClick={()=>{setReport(false);setTimeout(()=>document.getElementById("health-form")?.scrollIntoView({behavior:"smooth",block:"start"}),50)}}>{lang==="gu"?"વિગતો બદલો":lang==="hi"?"जानकारी बदलें":"Edit details"}</button>
              </div>
            </>}
          </section>
        </main>

        <footer className="footer"><span className="footer-line"/><Heart size={14} fill="currentColor"/><span>{t.footer}</span><Sparkles size={14}/><span className="footer-line"/></footer>
      </div>
    </div>
  );
}
