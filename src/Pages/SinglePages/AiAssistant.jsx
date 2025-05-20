import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Loader, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// --- Google Gemini API Configuration ---
const GEMINI_API_KEY = 'AIzaSyABoTniJg4qQCJBFC6w6pBl7s5LyhMyPt0';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// --- Embedded Product Information ---
const PRODUCT_CONTEXT = `
Product Name: RESOLUTION-KIT Powder
Composition (per 500 GM): Omega 3 & 6 (Fatty Acid): 500 mg CH. Copper Sulphate: 18 gm CH. Zinc Sulphate: 44 gm CH. Magnese Chloride: 14.5 gm CH. Chromium Sulphate: 1500 mg Selenium: 22 mg Potassium Iodate (Iodine): 340 mg Sodium Acid Phosphate: 96.626 gm Dicalcium Phosphate: 315 gm Cobalt Sulphate: 500 mg Ferrous Sulphate (Iron): 500 mg Vitamin A: 1.60 gm (about 50 Lac IU) Vitamin D3: 0.40 gm (about 05 Lac IU) Vitamin E: 2000 mg (about 30 Lac IU) Herbals: q.s.
Additional Components: Omega 3 & 6, Trace Minerals, Phosphorus, Potassium Iodate, DCP, Vitamin AD₃E, RS Heat Kit
Recommended Dosage (Cattle/Buffalo/Heifer): For 1st 15 Days: Resolution Powder 25 gm /Day After 16 Days: Start Resolution Powder 25 gm + 1 Strip of RS Heat Kit For Next 5 Days
Available Pack: Resolution Powder 500 gm + RS Heat Kit
Additional Text: सर इसका मतलब रीसोल्यूशन किट बांझपन के इलाज के लिए सम्पूर्ण समाधान है। (Translation: Sir, this means Resolution Kit is a complete solution for the treatment of infertility.)

Product Name: R3-Vet ULTRA BOLUS
Each Uncoated Bolus Contains: Cyproheptadine Hcl: 25 mg Live Yeast Culture: 4 mg Live Lactobacillus Sporogenes: 40 million Thiamine Hcl. (B1): 250 mg Pyridoxine Hcl (B6): 250 mg Methylcobalamin: 2500 mcg Excipients: q.s.
Indications: Anorexia Liver Disorder Anaemia & Convalescence Period Adjuvant to antibiotic/Anthelmintic therapy Nervine Disorder
For Appetite or Anorexia: Cyproheptadine Hcl: histamine antagonist with appetite stimulating effects Live yeast culture + Live Lactobacillus Sporogenes: Probiotics supplementation stabilizes gut flora (which gets destroyed during Antibiotic treatment) and improves fermentation capacities of the Rumen.
For Weakness & Loss of Milk Production: Thiamine HCL (B1): plays an important role in control of the "satiety center," one common symptom of Thiamine deficiency is a loss of Appetite. Pyridoxine Hcl (B6): converts proteins, fats & carbohydrates to glucose. The Vitamins manage energy.
For Neuronal Disorder: Methylcobalamin: is an active form of vitamin B12. Methylcobalamin is important for the brain & nerves, and for the production of red blood cells.
Dosage: In Large Animal: 1 bolus BD for two days In Small Animal: 1/2 bolus BD for two days
Available Pack: 1 X 1 Bolus

RS-Kit - Product Information
Combikit Contents: Component A: One Tablet of Clomiphene Citrate, I.P. 300mg. Component A - Each uncoated Tablet contains: Clomiphene Citrate Component B: Two Tablets of Copper Sulphate Component B - Each uncoated tablet contains: Copper Sulphate (Anhydrous) B.P. 750mg.
Indications - Anovulatory Estrus & Anoestrus: Condition: Anovulatory Estrus Condition: Anoestrus
Mechanism of Action (Simplified): Hypothalamus (Brain) -> Release of GnRH GnRH -> Stimulation of Pituitary Gland Pituitary Gland -> FSH Pituitary Gland -> LH FSH & LH -> Ovulation
Related Conditions/Outcomes: Delayed Puberty Delayed Ovulation Cystic Ovarian Degeneration Early Embryonic Death
Product Packaging: Pack Size: 5 Combikit
Product Type: Combikit of Clomiphene Citrate & Copper Sulphate Tablets
Brand Name: RS-Kit
Category: FERTILITY KIT
Usage Restriction: For Veterinary use only

Product Name: INNOLIV-DS
Form: LIQUID
Features & Benefits: Improves Liver Health & Functions Improves Appetite, FCR & Growth Rate Helps in Better Feed intake and Nutrient Metabolism Prevents Fatty Liver Syndrome Protects Liver from various Toxins Improves Immune System Provides Optimum Growth, FCR & Protein Synthesis Provide Balanced Energy
Key Ingredient: With Silymarine
Available Pack Sizes: 500 ml, 1 Litre, 5 Litre
Description: A Unique combination of Liver Boosting and Appetite Stimulant Herbs with Liver Extract, Amino Acids & Vitamin B Complex
COMPOSITION (Each 100 ml. Contains): D.L. methionine: 5000 mg. I-Lysine HCL: 3000 mg. Vitamin B₁: 125 mg. Vitamin B₂: 200 mg. Vitamin B₃: 1250 mg. Vitamin B₆: 150 mg. Silybum marianum: 900 mg. Andrographis paniculata: 1000 mg. Phyllanthus niruri: 1000 mg. Solanum nigrum: 1000 mg. Ocimum sanctum: 1000 mg. Azadirachta indica: 1000 mg. Tinospora cordifolia: 1200 mg. Betaine: 50 mg. Liver Extract: 150 mg. Choline Chloride: 3000 mg. Calcium Lactate: 1000 mg. Aqua: q.s.
Dosage: Large Animals: 80-100 ml daily Small Animals: 30-50 ml daily Layers: 15-20 ml daily/100 birds Broilers: 10-15 ml daily/100 birds Or as directed by Veterinary & Poultry Consultant

Product Name: GLUCODYNA - 40 Advance
Each Litre Contains: Propylene Glycol: 400 ml Purified Honey: 100 ml Bioactive Chromium: 1800 mcg Magnesium Sulphate: 1000 mg Niacin: 10 gm Olive Oil: 20 gm Calcium Phosphate: 50 gm Aswagandha Extract: 10 ml Glycerine: 300 ml Vitamin C: 5000 mcg Silymarin: 5000 mg Purified Water: q.s.
Benefits: Helps in prevention of NEB & Ketosis Prevents harmful effects of NEB on Uterus Helps bring animal back to feed & milk production in case of sudden drop in milk production along with low feed intake Improves post calving health & production
Dosage: 200 ml twice daily for two days followed by 100 ml daily for two days
Presentation: 1 Litre

Calf Shakti Advance
Key Ingredients: DHA, Aloevera, Flex Oil, Methylcobalamin, Iron, Folic Acid, Niacin, Vitamin A, Vitamin D3, Vitamin E, Zinc, Cobalt, Vitamin H (Biotin), Selenium, Energy Value
Benefits:
•	काफ शक्ति बछड़ो, भेड़ो व बकरो का वजन बढ़ाने के लिये लाभ दायक है। (Calf Shakti is beneficial for increasing the weight of calves, sheep, and goats.)
•	काफ शक्ति छोटे जानवरों में पाई जाने वाली मिट्टी खाना, लकड़ी खाना, कपड़ा खाना आदि) खाने की आदतों को रोकता है। (Calf Shakti prevents the habit of eating soil, wood, cloth, etc. found in small animals.)
•	काफ शक्ति छोटे जानवरों में तेजी से वजन बढ़ाता है। (Calf Shakti increases weight rapidly in small animals.)
•	काफ शक्ति छोटे जानवरों में समय पर यौन तक पहुंचने व गर्भधारण की क्षमता में सुधार करता है। (Calf Shakti improves timely attainment of puberty and conception ability in small animals.)
•	काफ शक्ति छोटे जानवरों के लिए संपूर्ण स्वास्थ्य पोषण है। (Calf Shakti is complete health nutrition for small animals.)
•	काफ शक्ति छोटे जानवरों में विटामिन की कमी और कुपोषण को रोकता है। (Calf Shakti prevents vitamin deficiency and malnutrition in small animals.)
•	काफ शक्ति छोटे जानवरों में पाचन, चयापचय, प्रतिरक्षा आदि सहित विभिन्न प्रकार के होने वाले तनाव को सहने में सहायक है। (Calf Shakti helps small animals withstand various types of stress including digestion, metabolism, immunity, etc.)
•	काफ शक्ति छोटे जानवरों के समग्र स्वास्थ्य में लाभ पहुंचाने में सहायक है। (Calf Shakti is helpful in providing benefits to the overall health of small animals.)
•	Note: छोटे जानवरों में optimum स्वास्थ्य को प्राप्त करने के लिये काफ शक्ति + रेगुलर पाउडर का उपयोग करे। (Note: To achieve optimum health in small animals, use Calf Shakti + Regular Powder.)
Indications:
•	After Cropping in Pet.
•	After Dehorning in Calf.
•	Faster Recovery After Illness.
•	After Deworming.
•	Weakness & debilitating conditions in small Animals
•	Neuronal Disorder like lameness & improper gait
Dosage: CALVES : 20 ML/DAILY SHEEP & GOAT : 20 ML/DAILY DOGS : 1 ML/5 KG.DAILY LAMBS : 5ML/DAILY
Available Pack: 200 ml (with 10 ml Measuring Cap)

Product Name: Weightboost
Form: Powder
Indication: Early Lactation - Underperformance
Weightboost Contains: Daily boost of extra energy, Protein, By Pass Fat Glucose with minerals, Vitamins & Probiotics.
Result: Energy, Proteins, Glucose Mineral, Vitamin Crunch
Symptoms Associated with Underperformance: Negative energy balance - Weakness, Lethargy, Lipolysis - Adipose tissues mobilization Ketosis - Low/Selective feed intake, Sluggishness Body wasting : about 0.5 Kg - 1 Kg per day Hypogalactia, low production than last year Body condition deteriorates
Benefits: Helps overcome energy deficiency Helps correct hypoglycaemia Helps remove weakness, sluggishness Improves feed intake Helps restore milk production Helps animal recover quickly
Dosage: Large Animals: 100 gm per day Small Animals: 25 gm per day
Available In: 3 Kg

INNOLACT Gel ADVANCE
Advantages:
•	Prevention of milk fever
•	Fulfilling the urgent calcium requirement immediately after parturition
•	Increased milk production
•	Improve liver functions
•	Provide balance energy
Note: Specially formulated calcium paste is water soluble & high palatable. It gets quickly absorbed & can rise calcium serum blood level within minutes of oral administration. Advantage of molasses base & Dextrose provides instant energy.
Dosage: To Prevent milk fever: Give 250 gm at the first sign of calving & give another 250 gm 6 to 12 hours post calving, repeat every 12 hours as needed. Or as directed by the Veterinarian. A post calving dose of Innolact Gel Advance is very beneficial.
Available Pack: 500 gm

INNOLACT AD₃ - Product Information
Nutritional Value (Per 100 ml): Nutrient: Calcium INNOLACT AD₃ Value: 1700 mg Other Calcium Supplement Value: 1700 mg
Nutrient: Phosphorus INNOLACT AD₃ Value: 850 mg Other Calcium Supplement Value: 850 mg
Nutrient: Vitamin D3 INNOLACT AD₃ Value: 8000 IU Other Calcium Supplement Value: 8000 IU
Nutrient: Vitamin B12 INNOLACT AD₃ Value: 200 mcg Other Calcium Supplement Value: 150 mcg
Nutrient: Carbohydrate INNOLACT AD₃ Value: 28000 mg Other Calcium Supplement Value: 28000 mg
Nutrient: Vitamin A INNOLACT AD₃ Value: 45000 IU Other Calcium Supplement Value: Nil
Nutrient: Vitamin E INNOLACT AD₃ Value: 300 mg Other Calcium Supplement Value: Nil
Nutrient: Zinc INNOLACT AD₃ Value: 200 mg Other Calcium Supplement Value: Nil
Nutrient: Leptadenia reticulata (Jivanti) INNOLACT AD₃ Value: 1000 mg Other Calcium Supplement Value: Nil
Nutrient: Asparagus racemosus (Shatavari) INNOLACT AD₃ Value: 1000 mg Other Calcium Supplement Value: Nil
Nutrient: Piper longum (long pepper) INNOLACT AD₃ Value: 400 mg Other Calcium Supplement Value: Nil
Key Advantages of INNOLACT AD₃: Advantage: More Calcium Advantage: More Phosphorus Advantage: More Vitamin B12 Advantage: Additional Vitamin A Advantage: Additional Vitamin E Advantage: Additional Vitamin H (implied but not explicitly in the table) Advantage: More Carbohydrates (40,000 mg / 100 ml mentioned separately) Advantage: Herbal Galactogogues (with Jivanti and Shatavari) Advantage: Contains Dextrose
Tagline: ENSURE HIGHER MILK PRODUCTION
Available Pack Size: 5 Ltr.

INNOLACT AD₃ Gold - Product Information
Composition (per 100 ml): Calcium: 4000 mg Phosphorous: 2000 mg Vitamin D₃: 12000 IU Vitamin B₁₂: 100 mcg Vitamin A: 45000 IU Vitamin E: 150000 IU Shatavari: 1000 mg Jivanti: 1000 mg Piper longum: 400 mg Zinc: 1500 mg Copper: 500 mg Chromium: 200 ppm Silymarin: 450 mg Carbohydrate: 25000 mg Dextrose: 20% Aqua: to 100 ml
Key Ingredients (with visual representation): Jivanti (Leptadenia reticulata) Shatavari (Asparagus racemosus) Pippali (Piper longum)
Dosage: Large Animal: 200 ml daily Small Animal: 20 ml daily
Available Pack Sizes: 1 Litre & 5 Litre

INNOLACT AD₃ SUPER - Product Information
Composition (per 100 ml): Calcium: 6200 mg Phosphorous: 3100 mg Vitamin D₃: 16000 IU Vitamin B₁₂: 200 mcg Vitamin A: 45000 IU Vitamin E: 150000 IU Vitamin H (Biotin): 20 mg Shatavari: 1000 mg Jivanti: 1000 mg Piper longum: 400 mg Chelated Zinc: 1500 mg Chelated Copper: 500 mg Chelated Chromium: 200 ppm Carbohydrate: 25000 mg Dextrose: 25% Aqua: to 100 ml
Key Ingredients (with visual representation): Jivanti (Leptadenia reticulata) Shatavari (Asparagus racemosus) Pippali (Piper longum)
Dosage: Large Animal: 100 ml daily Small Animal: 20 ml daily
Available Pack Sizes: 1 Litre & 5 Litre
Tagline: ENSURE HIGHER MILK PRODUCTION

Product Combination: Weightboost Powder + Ayngrow Bolus
Purpose: Prepare Animal for Next Lactation
Benefit of Combination: Helps weight gain & udder development
Dosage: 100 gm Weightboost powder for 30 days + One bolus Ayngrow for 40 days

Ayngrow Bolus - Product Information
Composition (Each Bolus contains): Vitamin A: 5,00,000 IU Vitamin D3: 1,00,000 IU Vitamin E: 600 mg Vitamin H (Biotin): 20,000 mcg Vitamin B12: 300 mcg Chelated Copper: 1000 mcg Chelated Zinc: 500 mcg Selenium: 300 mcg Silymarine: 500 mg Trisodium Citrate: 5 gm
Advantages: Advantage of Zinc & Copper with MHA Advantage of Double power Vit. A & H
Zn & Cu MHA: Zn helps in formation of teat keratin layer useful for maintaining healthy teat barrier. Zn and Cu MHA are antioxidant nutrients which help in masking the effects of free radicals.
Slogan: Say... No .. to Teat Cracks
Tagline: For Improved Therapeutic Outcome

Innocef-3 Injection
Presentation: Ceftriaxone 3 gm / Vial
Key Features: Effective against a wide range of Gram-ve & Gram+ve Bacteria Advantage of Once Daily Dosing
Indications: Respiratory Tract Infections (Pneumonia) Bone & Joint Infections Post-operative Infections Urogenital Tract Infections (Cystitis, Metritis) Skin & Soft Tissue Infections
Dosage: 10mg / kg body weight Daily for 3-5 days by I.M. or I.V. route, on the basis of ceftriaxone content.
Tagline: Effectively Treats Infections
For: I.M./I.V. Use Only For: Veterinary Use Only

BECTROHIT Injection Vet
Presentation: 4.5 gm
Trusted Choice with Proven Safety and Efficacy
Key Features: Broad Spectrum Bactericidal, Ideal in Mixed Infection Attains High Concentration in Soft Tissue Infections Compared to Penicillin Safe in Lactating and Young Animals
Recommendations: Mastitis H.S. and Pneumonia Leptospirosis Cystitis and Nephritis Secondary Bacterial Infections
Composition (Each Vial contains): Amoxycillin and Cloxacillin in 1:1 ratio
Dosage: Live Stock: 6-10 mg/kg bwt. Daily for 3-5 days by IM/IV Route
Available Pack: 4.5 gm
For: I.M./I.V. Use Only For: Veterinary Use Only

BECTROHIT-FORT Injection
Presentation: 3 / 4.5 gm Inj. (Amoxycillin 2 gm + Sulbactam 1 gm) / 3 gm vial (Amoxycillin 3 gm + Sulbactam 1.5 gm) / 4.5 gm vial
Category: Amoxycillin & Sulbactam
Indication: In Resistant Infections
Key Benefits: Significantly decreases the bacterial count in resistant infections Reduces the somatic cell count by 10 times in case of E. coli and S. aureus mastitis
Indications (Visual): Resistant Mastitis Respiratory Tract Infections Post operative Infections
Dosage: 7-10 mg / kg body weight by I.V. or I. M. route once or twice daily for 3-5 days
Available Pack: 3 gm & 4.5 gm
Tagline: Excellent Combination to Combat Resistant Infections
For Veterinary Use Only

INNOCEFF - TAZO - Product Information
Product Name: INNOCEFF - TAZO
Components:
•	Ceftriaxone: 500 mg
•	Tazobactam: 62.50 mg
Indications:
•	Respiratory Tract Infections
•	Urinary Tract Infections
•	Joint Infections
•	Surgical Prophylaxis
•	Intra-abdominal Infections
•	Meningitis
Dosage:
•	15-25 mg/kg body weight
•	Daily for 3-5 days by IM/IV route
Key Features:
•	Low resistance against the majority of pathogens
•	Potent Beta-Lactamase inhibitor
•	Wider distribution in tissues and body
•	Better safety profile in young and pregnant animals
Available: 562.50 mg combipacks with sterile disposable syringe, needle, and WFI

URO+CENTA ADVANCE
Most Common Problems Faced After Parturition:
•	Retention of Placenta (ROP)
•	Accumulation of Lochial Fluids
•	Increased risk of Uterine infections
•	Improper Uterine Involution
Key Ingredients and Their Benefits:
•	Iron: Enriched with Iron & treat the Anemic Condition
•	Shatavari: Cures inflammation and moistens dry tissues of the reproductive organs
•	Azadirachta indica: Beneficial in post-delivery care as it helps bring back structure and function of the uterus after delivery
•	Ashwagandha: Very efficacious for toning up the uterus
Tagline: A Potent Ecobolic and Uterine Tonic

Makkhi Soap
Purpose: For Effective Control of Ticks, Fleas & Mites
Composition: Permethrin 5% Cetrimide 1% Aloevera 1% Soap noodles q.s.
Key Features: For External use only Very effective against Fleas, Fly & Ticks
Slogan (Hindi): जिसने भी मक्खी साबुन को लगाया ! मक्खी चीचड़ी किलनी का किया सफाया !! (Translation: Whoever used Makkhi Soap! Eliminated flies, ticks, and mites!!)
Available Pack: 75 gms

Makkhi Advance Soap
Purpose: For Effective Control of Ticks, Fleas & Mites
Composition: Permethrin 8% Cetrimide 1% Aloevera 1% Soap noodle q.s.
Key Features: For External use only Very effective against Fleas, Fly & Ticks
Slogan (Hindi): जिसने भी मक्खी साबुन को लगाया ! मक्खी चीचड़ी किलनी का किया सफाया !! (Translation: Whoever used Makkhi Soap! Eliminated flies, ticks, and mites!!)
Available Pack: 75 gms

Medinn-Enro Injection
Active Ingredient: Enrofloxacin IP 100 mg./ML
Indications and Clinical Uses: Gastrointestinal Infection Respiratory Tract Infection Urinary Tract Infection Soft Tissues And Skin Infection Infection Caused By Wide Spectrum
Dosages: 1 ML Each Kg Body Weight or As Directed By The Veterinarian
Available Pack: 30 ML & 100 ML
`;

// --- Embedded CSS ---
const AiAssistantStyles = () => (
  <style>{`
    @keyframes shimmer {
      0% { background-position: 100% 0; }
      100% { background-position: -100% 0; }
    }
    .loading-shimmer-bar {
      background: linear-gradient(90deg, #fde8f0, #fbcfe8, #f9a8d4, #fbcfe8, #fde8f0);
      background-size: 200% 100%;
      animation: shimmer 1.8s linear infinite;
      border-radius: 9999px;
      height: 0.625rem;
    }
    .smooth-scroll {
      scroll-behavior: smooth;
    }
    .ai-message-area::-webkit-scrollbar {
      width: 6px;
    }
    .ai-message-area::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 3px;
    }
    .ai-message-area::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
    .ai-message-area::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `}</style>
);

// --- Helper Function: Format Time ---
const formatTime = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    return '--:--';
  }
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// --- ChatMessage Component ---
const ChatMessage = ({ message, isTyping }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 w-full`}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2 self-start mt-1 relative">
          <Bot size={16} className="text-indigo-600" />
        </div>
      )}
      <div
        className={`max-w-[85%] relative rounded-lg shadow-sm ${
          isUser
            ? 'bg-blue-500 text-white px-4 py-2'
            : message.isError
            ? 'bg-red-50 text-red-800 border border-red-200 px-4 py-2'
            : isTyping
            ? 'p-3 bg-transparent border-none shadow-none'
            : 'bg-white border border-gray-200 text-gray-800 px-4 py-2'
        }`}
      >
        {isTyping ? (
          <div className="flex flex-col space-y-1.5 w-48" aria-label="AI is typing">
            <div className="loading-shimmer-bar" style={{ width: '85%', animationDelay: '0s' }}></div>
            <div className="loading-shimmer-bar" style={{ width: '100%', animationDelay: '0.2s' }}></div>
            <div className="loading-shimmer-bar" style={{ width: '70%', animationDelay: '0.4s' }}></div>
          </div>
        ) : (
          <>
            <div className="prose prose-sm max-w-none">
              {isUser ? (
                <p>{message.text}</p>
              ) : (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              )}
            </div>
            <div
              className={`text-xs mt-1.5 opacity-75 text-right ${
                isUser ? 'text-blue-100' : message.isError ? 'text-red-500 font-medium' : 'text-gray-500'
              }`}
            >
              {formatTime(message.timestamp)}
            </div>
          </>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 self-start mt-1">
          <User size={16} className="text-blue-600" />
        </div>
      )}
    </motion.div>
  );
};

// --- Main AiAssistant Component ---
export default function AiAssistant({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { id: Date.now(), sender: 'bot', text: 'Hello! Ask me anything about the products listed.', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  const callGeminiAPI = async (query) => {
    console.log('Sending query to Gemini:', query);

    const prompt = `You are a helpful assistant for veterinary products. The user might ask questions in Hinglish, which is a mix of Hindi and English. Try to understand and respond accordingly, but base your answers only on the information provided below. Do not use any external knowledge or make assumptions. If the answer cannot be found in the provided information, clearly state that the information is not available in the provided text. Please format your response using Markdown for better readability, including headings, lists, and emphasis where appropriate.

--- START OF PROVIDED INFORMATION ---
${PRODUCT_CONTEXT}
--- END OF PROVIDED INFORMATION ---

User Query: ${query}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        let errorData = { message: `API Error: ${response.status} ${response.statusText}` };
        try {
          const errorJson = await response.json();
          errorData.message = errorJson?.error?.message || errorData.message;
        } catch (parseError) {
          const textResponse = await response.text();
          errorData.message = textResponse || errorData.message;
        }
        throw new Error(errorData.message);
      }

      const data = await response.json();

      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts.length > 0 &&
        data.candidates[0].content.parts[0].text
      ) {
        const finishReason = data.candidates[0].finishReason;
        if (finishReason && finishReason !== 'STOP') {
          if (finishReason === 'SAFETY') {
            return 'I cannot provide an answer due to safety restrictions.';
          }
          if (finishReason === 'MAX_TOKENS') {
            return data.candidates[0].content.parts[0].text + ' ... (response truncated)';
          }
        }
        return data.candidates[0].content.parts[0].text;
      } else {
        if (data.promptFeedback?.blockReason) {
          return `I couldn't process the request because the prompt was blocked (${data.promptFeedback.blockReason}).`;
        }
        throw new Error('Invalid response format or empty content from AI service');
      }
    } catch (error) {
      throw new Error(error.message || 'An unknown network or API error occurred.');
    }
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();

    const textToSend = inputValue.trim();
    if (!textToSend) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setError(null);

    try {
      const answer = await callGeminiAPI(userMessage.text);

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessageText = err.message || 'An unexpected error occurred.';
      setError(errorMessageText);

      const errorMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Sorry, I encountered an error: ${errorMessageText}`,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    const lastUserMessage = [...messages].slice().reverse().find((m) => m.sender === 'user');

    if (lastUserMessage) {
      console.log('Retrying query:', lastUserMessage.text);

      const lastUserMsgIndex = messages.findIndex((m) => m.id === lastUserMessage.id);
      const messagesBeforeRetry = messages
        .slice(0, lastUserMsgIndex + 1)
        .concat(messages.slice(lastUserMsgIndex + 1).filter((m) => !(m.sender === 'bot' && m.isError)));

      setMessages(messagesBeforeRetry);
      setInputValue(lastUserMessage.text);
      Promise.resolve().then(() => handleSendMessage());
    } else {
      console.warn('Could not find the last user message to retry.');
      alert('Could not find the last message to retry.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AiAssistantStyles />
      <motion.div
        initial={{ x: '100%', opacity: 0.8 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0.8 }}
        transition={{ type: 'spring', stiffness: 320, damping: 35 }}
        className="fixed bottom-4 right-4 z-[1000] w-[calc(100%-2rem)] max-w-md h-[calc(100vh-5rem)] max-h-[650px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200/50"
        aria-modal="true"
        role="dialog"
        aria-labelledby="ai-assistant-header"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center space-x-2">
            <Bot size={20} />
            <h2 id="ai-assistant-header" className="font-semibold text-base">Innovation Remedies Life Science AI</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white rounded-full p-1.5 -mr-1 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
            aria-label="Close AI Assistant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-1 bg-slate-50 smooth-scroll ai-message-area">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} isTyping={false} />
          ))}
          {isTyping && <ChatMessage key="typing-indicator" message={{ id: 'typing', sender: 'bot', timestamp: new Date() }} isTyping={true} />}
          {error && !isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center pt-2 pb-1">
              <div className="bg-red-100 border border-red-300 text-red-800 rounded-lg px-3.5 py-2 text-sm flex items-center gap-3 shadow-sm w-full max-w-sm mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <span className="flex-grow leading-snug">{error}</span>
                <button onClick={handleRetry} className="ml-auto text-red-800 underline font-medium text-sm hover:text-red-600 flex-shrink-0 focus:outline-none focus:ring-1 focus:ring-red-400 rounded px-1">
                  Retry
                </button>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} style={{ height: '1px' }} />
        </div>
        <form onSubmit={handleSendMessage} className="border-t border-gray-200/80 p-3 bg-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about the products..."
              className="flex-grow py-2 px-4 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/80 disabled:opacity-60 transition-all"
              disabled={isTyping}
              aria-label="Type your message"
              required
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 flex-shrink-0 w-9 h-9 flex items-center justify-center"
              aria-label="Send message"
            >
              {isTyping ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
}