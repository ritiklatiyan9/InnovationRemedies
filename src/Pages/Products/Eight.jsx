import React from 'react';
import { CheckCircle, XCircle, ShieldAlert, Box } from 'lucide-react'; // XCircle, ShieldAlert, Box not currently used but kept for potential future use.

// --- IMPORT YOUR IMAGES ---
import makkhiSoapBoxImage from '../../assets/Images/seventeen.png'; // Product image
import innovationRemediesLogo from '../../assets/Images/beast.png'; // Optional logo

// --- Product Data (keeping as is) ---
const makkhiAdvanceSoapData = {
  tagline: "For Effective Control of Ticks, Fleas & Mites",
  mainTitle: "Makkhi",
  qualifier: "Advance Soap",
  hindiTitle: "मक्खी एडवांस साबुन",
  hindiSlogan: [
    "जिसने भी मक्खी साबुन को लगाया ।",
    "मक्खी चीचड़ी कलिली का किया सफाया ।।"
  ],
  compositionTitle: "Composition",
  compositionDetails: "Permethrin 8%, Certimide 1% With Aloevera 1% Soap noodle q.s.",
  keyPoints: [
    "Makkhi Advance Soap use for External use only",
    "Makkhi Advance Soap very effective against Fleas Fly & Ticks"
  ],
  boxDetails: {
    mainIngredients: "Permethrin 8%, Cetrimide, & Aloevera Soap",
    productName: "Makkhi Advance Soap",
    hindiName: "मक्खी एडवांस",
    usage: "(For Vet. Use Only)",
    packSizeShort: "75 gm.",
    benefit: "Freedom from Ticks & Flies"
  },
  availablePack: "Available Pack 75 gms"
};

// Helper function for multi-color title rendering
const MultiColorTitle = ({ text, qualifier, blueTextClass, greenTextClass, orangeTextClass, defaultClass = "" }) => {
    const mainTitleParts = text.match(/.{1,6}/g) || []; // Split "Makkhi" into "Makk" and "hi" (approx)
    const qualifierParts = qualifier.split(' ');

    return (
        <>
            {mainTitleParts.length > 0 && <span className={blueTextClass}>{mainTitleParts[0]}</span>}
            {mainTitleParts.length > 1 && <span className={greenTextClass}>{mainTitleParts.slice(1).join('')}</span>}
            {qualifierParts.length > 0 && <span className={greenTextClass}> {qualifierParts[0]} </span>}
            {qualifierParts.length > 1 && <span className={orangeTextClass}>{qualifierParts[1]}</span>}
        </>
    );
};


export default function MakkhiAdvanceSoapPage() {
  const redColorBg = "bg-red-600";
  const redText = "text-red-600";
  const blueTextClass = "text-blue-700";
  const greenTextClass = "text-green-600";
  const orangeTextClass = "text-orange-500";
  const pageBg = "bg-white";

  return (
    <div className={`min-h-screen ${pageBg} font-sans antialiased`}>
      <div className="container mx-auto p-4 sm:p-6 max-w-5xl">

        {/* Top Tagline & Optional Logo */}
        <header className="relative mb-4 md:mb-6 text-center sm:text-left">
          <p className={`text-base sm:text-lg md:text-xl font-semibold ${redText} py-1.5 sm:py-2 px-3 sm:px-4 inline-block`}>
            {makkhiAdvanceSoapData.tagline}
          </p>
          {innovationRemediesLogo && (
            <img
              src={innovationRemediesLogo}
              alt="Innovation Remedies Logo"
              className="absolute top-0 right-0 h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-contain"
            />
          )}
        </header>

        {/* Main Title Section */}
        <section className="mb-6 md:mb-8 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-tight sm:leading-none">
            <MultiColorTitle
                text={makkhiAdvanceSoapData.mainTitle}
                qualifier={makkhiAdvanceSoapData.qualifier}
                blueTextClass={blueTextClass}
                greenTextClass={greenTextClass}
                orangeTextClass={orangeTextClass}
            />
          </h1>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${blueTextClass} mt-1 sm:mt-2`}>
            {makkhiAdvanceSoapData.hindiTitle}
          </h2>
        </section>

        {/* Main Content Grid */}
        {/* On mobile, image section (right column) comes first */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">

          {/* Right Column: Product Box & Availability - Order 1 on mobile */}
          <div className="flex flex-col items-center space-y-6 order-1 md:order-none">
            <div className="w-full max-w-sm sm:max-w-md bg-slate-100 p-3 sm:p-4 rounded-lg shadow-xl border border-slate-200">
              <div className="text-center mb-2">
                <p className="text-xs sm:text-sm font-semibold text-slate-600">{makkhiAdvanceSoapData.boxDetails.mainIngredients}</p>
                <h4 className="text-lg sm:text-xl font-bold leading-tight">
                    <MultiColorTitle
                        text={makkhiAdvanceSoapData.boxDetails.productName.split(' ')[0]} // "Makkhi"
                        qualifier={makkhiAdvanceSoapData.boxDetails.productName.split(' ').slice(1).join(' ')} // "Advance Soap"
                        blueTextClass={blueTextClass}
                        greenTextClass={greenTextClass}
                        orangeTextClass={orangeTextClass}
                    />
                </h4>
                <p className={`${blueTextClass} text-base sm:text-lg font-semibold`}>{makkhiAdvanceSoapData.boxDetails.hindiName}</p>
                <p className="text-[10px] sm:text-xs text-slate-500">{makkhiAdvanceSoapData.boxDetails.usage}</p>
              </div>

              <img
                src={makkhiSoapBoxImage}
                alt="Makkhi Advance Soap Box"
                className="w-full h-auto object-contain rounded mb-2 sm:mb-3 shadow-md"
                loading="lazy"
              />
              <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm font-bold text-green-700">{makkhiAdvanceSoapData.boxDetails.benefit}</p>
                <p className="text-xs sm:text-sm font-bold bg-red-500 text-white px-1.5 sm:px-2 py-0.5 rounded">{makkhiAdvanceSoapData.boxDetails.packSizeShort}</p>
              </div>
            </div>

            <p className={`text-base sm:text-lg md:text-xl font-bold ${redText} bg-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-md shadow-md`}>
                {makkhiAdvanceSoapData.availablePack}
            </p>
          </div>

          {/* Left Column: Slogan, Composition, Key Points - Order 2 on mobile */}
          <div className="space-y-6 order-2 md:order-none">
            <div className={`${redColorBg} text-white p-3 sm:p-4 md:p-5 rounded-lg shadow-md text-center`}>
              {makkhiAdvanceSoapData.hindiSlogan.map((line, index) => (
                <p key={index} className="text-base sm:text-lg md:text-xl font-bold">
                  {line}
                </p>
              ))}
            </div>

            <div className="bg-yellow-400 text-black p-3 sm:p-4 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 text-center">{makkhiAdvanceSoapData.compositionTitle}</h3>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-center">{makkhiAdvanceSoapData.compositionDetails}</p>
            </div>

            <div className="bg-white p-3 sm:p-4 border-2 border-yellow-400 rounded-lg shadow-md">
              <ul className="space-y-1.5 sm:space-y-2">
                {makkhiAdvanceSoapData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start text-sm sm:text-base md:text-lg font-medium text-slate-700">
                    <CheckCircle size={18} sm={20} className="mr-2 mt-0.5 sm:mt-1 text-yellow-500 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>

        {/* Decorative curved element */}
        <div className="mt-8 md:mt-12 h-12 sm:h-16 md:h-20 lg:h-24 w-full relative overflow-hidden">
            <div className={`absolute -bottom-1/2 left-0 w-full h-full ${redColorBg} rounded-t-full opacity-80`}></div>
            <div className={`absolute -bottom-1/3 left-1/4 w-1/2 h-full bg-green-500 rounded-t-full opacity-70`}></div>
            <div className={`absolute -bottom-1/4 left-1/3 w-1/3 h-full bg-blue-600 rounded-t-full opacity-60`}></div>
        </div>
      </div>
    </div>
  );
}