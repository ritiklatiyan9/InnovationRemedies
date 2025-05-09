import React from 'react';
import { ChevronRight } from 'lucide-react';
import imgf from '../../assets/Images/thirteen.png'; // Actual image for the product

// Data (keeping as is, it's well-structured)
const calfShaktiData = {
    mainTitle: "Calf Shakti",
    qualifier: "Advance",
    ingredients: [
        "DHA", "Aloevera", "Flex Oil", "Methylcobalamin", "Iron Folic Acid Niacin",
        "Vitamin A", "Vitamin D3", "Vitamin E", "Zinc", "Cobalt",
        "Vitamin H (Biotin)", "Selenium", "Energy Value"
    ],
    benefitsSectionTitle: "Benefits",
    benefits: [
        "काफ शक्ति बकरो, बकरी व भेड़ का वजन बढ़ाने के लिये लाभ दायक है।",
        "काफ शक्ति छोटे जानवरों में पाईका (मिट्टी खाना, लकड़ी खाना, कपड़ा खाना आदि) चीजो को खाने से रोकता है।",
        "काफ शक्ति छोटे जानवरों में तेजी से वजन बढ़ाता है।",
        "काफ शक्ति छोटे जानवरों में समय पर यौवन तक पहुंचाने की क्षमता में सुधार करता है।",
        "काफ शक्ति छोटे जानवरों के लिये संपूर्ण तरल पोषण है।",
        "काफ शक्ति छोटे जानवरों में विटामिन की कमी और कुपोषण को रोकता है।",
        "काफ शक्ति छोटे जानवरों में परिवहन, जलवायु प्रबंधन आदि सहित विभिन्न प्रकार के हाने वाले तनाव को रोकने मे सहायक है।",
        "काफ शक्ति छोटे जानवरों के समग्र स्वास्थ्य मे लाभ पहुंचाने में सहायक है।"
    ],
    note: "नोट : छोटे जानवरों में यौवन अवस्था को प्राप्त करने के लिये काफ शक्ति + वेटबूस्ट पाउडर का उपयोग करे।",
    indicationsSectionTitle: "Indications",
    indications: [
        "After Cropping in Pet.",
        "After Dehorning in Calf.",
        "Faster Recovery After Illness.",
        "After Dewarming.",
        "Weakness & debilitating conditions in small Animals",
        "Neuronal Disorder like lameness & improper gait"
    ],
    dosageSectionTitle: "DOSAGE",
    dosage: {
        CALVES: "20 ML/DAILY",
        SHEEP_GOAT: "20 ML/DAILY",
        DOGS: "1ML/5 KG/DAILY",
        LAMBS: "5ML/DAILY"
    },
    packaging: {
        capInfo: "With 10 ml Measuring Cap",
        packSize: "Available Pack : 200 ml"
    },
    productShot: {
        altText: "Calf Shakti Advance bottle and packaging",
        boxDetails: {
            title: "Calf-Shakti",
            subtitle: "ADVANCE",
            tagline: "A Complete Nutritional Supplement",
            hindiName: "काफ-शक्ति एडवांस",
            benefit: "Strong Growth and Immunity Booster for New Born Calf"
        }
    }
};


export default function CalfShaktiPage() {
  const colors = {
    primaryOrange: 'bg-orange-500',
    titleYellow: 'text-yellow-300',
    ingredientsText: 'text-black',
    contentBackground: 'bg-sky-100',
    sectionHeaderRedBg: 'bg-red-600',
    sectionHeaderRedText: 'text-red-600',
    textWhite: 'text-white',
    textBlack: 'text-black',
    listItemRedBullet: 'text-red-600',
  };

  return (
    <div className={`min-h-screen ${colors.contentBackground} font-sans antialiased`}>
      {/* Top Banner Section */}
      <header className={`${colors.primaryOrange} p-4 sm:p-6 shadow-lg`}>
        <div className="container mx-auto text-center">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${colors.titleYellow}`}>
            {calfShaktiData.mainTitle.toUpperCase()}{' '}
            <span className="text-white">{calfShaktiData.qualifier.toUpperCase()}</span>
          </h1>
          <p className={`mt-2 sm:mt-3 text-xs sm:text-sm md:text-base ${colors.ingredientsText} font-medium px-1 sm:px-2`}>
            <strong>Ingredients:</strong> {calfShaktiData.ingredients.join(', ')}
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">

          {/* Left Column (Information) */}
          <div className="lg:col-span-3 space-y-6 md:space-y-8">

            {/* Benefits Section */}
            <section>
              <div className={`${colors.sectionHeaderRedBg} inline-block rounded-t-lg shadow`}>
                <h2 className={`text-lg sm:text-xl font-bold px-4 sm:px-6 py-2 ${colors.textWhite}`}>
                  {calfShaktiData.benefitsSectionTitle}
                </h2>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-b-lg rounded-r-lg shadow-lg">
                <ul className="space-y-2 sm:space-y-2.5">
                  {calfShaktiData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`mr-2 sm:mr-2.5 mt-1 ${colors.listItemRedBullet} font-bold text-lg sm:text-xl leading-none`}>•</span>
                      <span className={`${colors.textBlack} text-sm sm:text-base`}>{benefit}</span>
                    </li>
                  ))}
                </ul>
                {calfShaktiData.note && (
                  <p className={`mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200 ${colors.sectionHeaderRedText} font-semibold text-sm sm:text-base`}>
                    {calfShaktiData.note}
                  </p>
                )}
              </div>
            </section>

            {/* Indications Section */}
            <section>
              <div className={`${colors.sectionHeaderRedBg} inline-block rounded-t-lg shadow`}>
                <h2 className={`text-lg sm:text-xl font-bold px-4 sm:px-6 py-2 ${colors.textWhite}`}>
                  {calfShaktiData.indicationsSectionTitle}
                </h2>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-b-lg rounded-r-lg shadow-lg">
                <ul className="space-y-2 sm:space-y-2.5">
                  {calfShaktiData.indications.map((indication, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 ${colors.listItemRedBullet} flex-shrink-0 mt-0.5 sm:mt-1`} strokeWidth={3}/>
                      <span className={`${colors.textBlack} text-sm sm:text-base`}>{indication}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Dosage Section */}
            <section>
               <div className={`${colors.sectionHeaderRedBg} inline-block rounded-t-lg shadow`}>
                 <h2 className={`text-lg sm:text-xl font-bold px-4 sm:px-6 py-2 ${colors.textWhite}`}>
                    {calfShaktiData.dosageSectionTitle}
                 </h2>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-b-lg rounded-r-lg shadow-lg">
                {Object.entries(calfShaktiData.dosage).map(([key, value]) => (
                  <p key={key} className={`${colors.sectionHeaderRedText} font-bold text-sm sm:text-base mb-1 sm:mb-1.5`}>
                    <span className="uppercase">{key.replace('_', ' & ')} :</span> {value}
                  </p>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Product Image and Packaging Info) - Reordered for mobile */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8 flex flex-col">
            {/* Product Image Area - Order 1 on mobile */}
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-xl text-center order-1 lg:order-none">
              <img
                src={imgf} // Using the imported image
                alt={calfShaktiData.productShot.altText}
                className="mx-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[450px] w-auto object-contain mb-3 sm:mb-4"
                loading="lazy"
              />
              <div className="mt-2">
                <h3 className={`text-xl sm:text-2xl font-bold text-gray-800`}>
                    {calfShaktiData.productShot.boxDetails.title} <span className={colors.sectionHeaderRedText}>{calfShaktiData.productShot.boxDetails.subtitle}</span>
                </h3>
                <p className="text-base sm:text-lg text-gray-700">{calfShaktiData.productShot.boxDetails.hindiName}</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">{calfShaktiData.productShot.boxDetails.tagline}</p>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base font-semibold text-green-700">{calfShaktiData.productShot.boxDetails.benefit}</p>
              </div>
            </div>

            {/* Packaging Info Oval - Order 2 on mobile */}
            <div className={`bg-yellow-400 text-center p-3 sm:p-4 rounded-xl shadow-md sm:-rotate-3 transform sm:hover:rotate-0 transition-transform duration-300 order-2 lg:order-none`}>
              <p className="text-black font-bold text-base sm:text-lg">{calfShaktiData.packaging.capInfo}</p>
              <p className="text-black font-bold text-base sm:text-lg">{calfShaktiData.packaging.packSize}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Chat Support Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          className="bg-blue-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
          aria-label="Chat Support"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
}