import React from 'react';
import { Zap, ListChecks, AlertTriangle, CheckCircle, ShieldCheck, Bone, Package, TrendingUp, Target } from 'lucide-react';

// --- IMPORT YOUR PRODUCT IMAGE ---
import weightboostProductImage from '../../assets/Images/one.png'; // Replace with your actual image path

// --- Product Data ---
const weightboostData = {
  pageHeader: "Early Lactation - Underperformance",
  productName: "Weightboost",
  productNameHindi: "वेटबूस्ट",
  productType: "Powder",
  containsPreamble: "Weightboost contains :",
  containsList: [
    "Daily boost of extra energy, Protein, By Pass Fat Glucose with minerals, Vitamins & Probiotics."
  ],
  description: "This Low eating behaviour continues after parturition because compressed rumen takes time to “stretch” and the papillae to regrow. It may take several weeks to reach full potential.",
  resultPreamble: "Result:",
  result: "Energy, Proteins, Glucose Mineral, Vitamin Crunch",
  issues: [
    { point: "Negative energy balance", details: "Weakness, Lethargy" },
    { point: "Lipolysis", details: "Adipose tissues mobilization" },
    { point: "Ketosis", details: "Low/Selective feed Intake, Sluggishness" },
    { point: "Body wasting", details: "about 0.5 Kg – 1 Kg per day" },
    { point: "Hypogalactia", details: "Low production than last year" },
    { point: "Body condition deteriorates", details: "" }
  ],
  benefitsTitle: "Benefits :",
  benefits: [
    "Helps overcome energy deficiency",
    "Helps correct hypoglycaemia",
    "Helps remove weakness, sluggishness",
    "Improves feed intake",
    "Helps restore milk production",
    "Helps animal recover quickly"
  ],
  dosageTitle: "Dosage :",
  dosages: [
    { animal: "Large Animals", amount: "100 gm per day" },
    { animal: "Small Animals", amount: "25 gm per day" }
  ],
  availability: "Available in 1kg & 5kg", // Added this based on usage
  footerTagline: "COMPLETE SOLUTION FOR PERIPARTUM ANIMALS",
};

export default function WeightboostProductPage() {
  const titleColor = "text-indigo-800";
  const redAccentBg = "bg-red-600";
  const redAccentText = "text-red-600";
  const greenAccentText = "text-green-700";
  const darkBlueBg = "bg-indigo-800";

  return (
    <div className="min-h-screen bg-slate-100 font-sans antialiased">
      {/* Red Header Bar */}
      <header className={`${redAccentBg} text-white text-center py-2.5 sm:py-3 md:py-4 shadow-md`}>
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide px-2">{weightboostData.pageHeader}</h1>
      </header>

      <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-6xl">
        {/* Product Title Section */}
        <section className="text-center my-4 sm:my-6 md:my-8 lg:my-10">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold ${titleColor} uppercase`}>
            {weightboostData.productName}
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-1 sm:mt-2">
            <p className={`text-xl sm:text-2xl md:text-3xl font-semibold ${titleColor}`}>{weightboostData.productNameHindi}</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-600">{weightboostData.productType}</p>
          </div>
        </section>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Left/Main Column (Details & Benefits) */}
          <div className="md:col-span-2 space-y-6">
            {/* Contains Section */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg">
              <h3 className={`${redAccentText} text-lg sm:text-xl font-bold mb-1.5 sm:mb-2`}>{weightboostData.containsPreamble}</h3>
              {weightboostData.containsList.map((item, index) => (
                <p key={index} className={`${greenAccentText} text-sm sm:text-base md:text-lg font-medium leading-relaxed`}>{item}</p>
              ))}
            </div>

            {/* Description & Result */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg space-y-2 sm:space-y-3">
              <p className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed">{weightboostData.description}</p>
              <p className="font-bold text-sm sm:text-base md:text-lg">
                <span className={`${titleColor}`}>{weightboostData.resultPreamble} – </span>
                <span className={`${redAccentText}`}>{weightboostData.result}</span>
              </p>
            </div>

            {/* Issues/Conditions List */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg">
              <ul className="space-y-2 sm:space-y-2.5">
                {weightboostData.issues.map((issue, index) => (
                  <li key={index} className="flex items-start text-xs sm:text-sm md:text-base">
                    <span className={`${titleColor} font-semibold mr-1.5 sm:mr-2 text-base sm:text-lg leading-none mt-0.5`}>•</span>
                    <span className="text-slate-700">
                      <strong className={titleColor}>{issue.point}</strong>
                      {issue.details && ` - ${issue.details}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits Section */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg">
              <h3 className={`${titleColor} text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center`}>
                <ShieldCheck size={22} sm={26} className="mr-2" />
                {weightboostData.benefitsTitle}
              </h3>
              <div className="space-y-2 sm:space-y-2.5">
                {weightboostData.benefits.map((benefit, index) => (
                  <div key={index} className={`${redAccentBg} text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-md font-medium text-sm sm:text-base md:text-lg shadow`}>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Dosage, Availability, Image) */}
          {/* Reorder for mobile: Image first, then Availability, then Dosage */}
          <div className="md:col-span-1 space-y-6 flex flex-col">
             {/* Product Image - Order 1 on mobile */}
             <div className="bg-white p-3 rounded-lg shadow-lg flex justify-center order-1 md:order-none">
              <img
                src={weightboostProductImage}
                alt="Weightboost Powder Bucket"
                className="max-h-[200px] sm:max-h-[250px] md:max-h-[300px] object-contain"
                loading="lazy"
              />
            </div>

            {/* Availability - Starburst Style - Order 2 on mobile */}
            <div className="relative flex items-center justify-center my-4 md:my-0 order-2 md:order-none min-h-[160px] sm:min-h-[192px]"> {/* Added min-height for consistency */}
              {/* Starburst for larger screens */}
              <div
                className="hidden sm:flex bg-indigo-700 text-white w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full flex-col items-center justify-center text-center p-3 sm:p-4 shadow-2xl transform md:-rotate-12 hover:rotate-0 transition-transform duration-300"
                style={{
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                }}
              >
                <Zap size={24} sm={28} className="mb-0.5 sm:mb-1"/>
                <p className="text-sm sm:text-base md:text-lg font-bold leading-tight">{weightboostData.availability}</p>
              </div>
              {/* Simpler circle for very small screens (xs) */}
              <div
                className="sm:hidden bg-indigo-700 text-white w-36 h-36 rounded-full flex flex-col items-center justify-center text-center p-3 shadow-xl"
              >
                <Zap size={24} className="mb-1"/>
                <p className="text-sm font-bold leading-tight">{weightboostData.availability}</p>
              </div>
            </div>

            {/* Dosage Section - Order 3 on mobile */}
            <div className="bg-white p-4 sm:p-5 rounded-lg shadow-lg order-3 md:order-none">
              <h3 className="text-slate-700 text-lg sm:text-xl font-bold mb-2 sm:mb-3">{weightboostData.dosageTitle}</h3>
              <div className="space-y-2.5 sm:space-y-3">
                {weightboostData.dosages.map((dose, index) => (
                  <div key={index} className={`${darkBlueBg} text-white p-2.5 sm:p-3 rounded-md text-center shadow`}>
                    <p className="font-semibold text-base sm:text-lg">{dose.animal}</p>
                    <p className="text-sm sm:text-base">{dose.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Red Footer Bar */}
      <footer className={`${redAccentBg} text-white text-center py-2.5 sm:py-3 md:py-4 mt-6 sm:mt-8 md:mt-12 shadow-md`}>
        <p className="text-base sm:text-lg md:text-xl font-semibold tracking-wide px-2">{weightboostData.footerTagline}</p>
      </footer>
    </div>
  );
}