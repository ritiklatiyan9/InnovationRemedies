import React from 'react';
import { ArrowRightCircle } from 'lucide-react';
// Assuming this path is correct for your project structure
import resolutionKitProductImage from '../../assets/Images/rs.png';

const resolutionKitData = {
  mainTitle: "RESOLUTION-KIT",
  productType: "POWDER",
  hindiTitle: "रीसोल्युशन-किट पाउडर",
  composition: [
    { no: '1.', name: 'OMEGA 3 & 6 (FATTY ACID)', quantity: '500 mg', highlight: true },
    { no: '2.', name: 'CH. COPPER SULPHATE', quantity: '18 gm' },
    { no: '3.', name: 'CH. ZINC SULPHATE', quantity: '44 gm' },
    { no: '4.', name: 'CH. MAGNESE CHLORIDE', quantity: '14.5 gm' },
    { no: '5.', name: 'CH. CHROMIUM SULPHATE', quantity: '1500 mg' },
    { no: '6.', name: 'SELENIUM', quantity: '22 mg' },
    { no: '7.', name: 'POTASSIUM IODATE (IODINE)', quantity: '340 mg' },
    { no: '8.', name: 'SODIUM ACID PHOSPHATE', quantity: '98.635 gm' },
    { no: '9.', name: 'DICALCIUM PHOSPHATE', quantity: '315 gm' },
    { no: '10.', name: 'COBALT SULPHATE', quantity: '500 mg' },
    { no: '11.', name: 'FEROUS SULPHATE (IRON)', quantity: '500 mg' },
    { no: '12.', name: 'VITAMIN A', quantity: '1.60 gm (ABOUT 50 Lac IU)', highlight: true },
    { no: '13.', name: 'VITAMIN D3', quantity: '0.40 gm (ABOUT 16 Lac IU)', highlight: true },
    { no: '14.', name: 'VITAMIN E', quantity: '2000 mg (ABOUT 30 Lac IU)', highlight: true },
    { no: '15.', name: 'HERBALS', quantity: 'q.s.' },
  ],
  keyIngredients: [
    "Omega 3 & 6",
    "Trace Minerals",
    "Phosphorus",
    "Potassium iodate",
    "DCP",
    "Vitamin AD₃E",
    "RS Heat Kit"
  ],
  // Added Benefits from the image
  benefitsTitle: "Key Benefits:",
  benefits: [
    "Development of Genital Organs",
    "Improves Conception Rate",
    "Maintain Pregnancy",
    "Non Specific Anoestrus",
    "Repeat Breeder",
    "Silent-Estrous"
  ],
  recommendedDosageTitle: "Recommended Dosage :",
  dosageInstructions: [
    "Cattle/Buffalo/heifer",
    "For 1st 15 Days Resolution Powder 25 gm/Day",
    "After on 16 Days Start Resolution Powder 25 gm",
    "+ 1 Strip of RS Heat Kit For Next 5 Days"
  ],
  availablePack: {
    title: "Available Pack :",
    details: "Resolution Powder 500 gm + RS Heat Kit"
  },
  // Added Product Note from the image
  productNote: "Note : It's means Resolution powder for the treatment of infertility. And other mineral powder for defence of infertility. So you will choose? You have need treatment product or defence product.",
  footerTagline: "सर इसका मतलब रीसोल्युशन किट बांझपन के इलाज के लिए सम्पूर्ण समाधान हैं ।"
};

export default function ResolutionKitProductPage() {
  const titleColor = "text-indigo-700";
  const powderColor = "text-red-600";
  const bgColor = "bg-sky-100";
  const tableHeaderBg = "bg-green-500";
  const tableQuantityBg = "bg-red-500";
  const tableEvenRowBg = "bg-green-100";
  const tableHighlightBg = "bg-purple-500";

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      {/* Title */}
      <header className="py-6 md:py-8 text-center bg-white shadow-sm">
        <h1 className={`text-4xl md:text-6xl font-extrabold uppercase ${titleColor} relative`}>
          {resolutionKitData.mainTitle}
          <span className="absolute text-xs -top-2 -right-6 md:-right-10 bg-white px-1 font-bold text-red-600">TM</span>
        </h1>
        <p className={`text-2xl md:text-3xl font-bold uppercase mt-1 ${powderColor}`}>
          {resolutionKitData.productType}
        </p>
      </header>

      {/* Content */}
      <section className={`${bgColor} py-8 md:py-12`}>
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hindi Title */}
          <h2 className={`text-center text-2xl md:text-3xl font-bold mb-6 ${powderColor}`}>
            {resolutionKitData.hindiTitle}
          </h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Table Section */}
            <div className="lg:col-span-5 overflow-auto rounded-lg shadow-xl bg-white">
              <table className="w-full min-w-[500px] text-sm md:text-base border-collapse">
                <thead>
                  <tr className={`${tableHeaderBg} text-white`}>
                    <th className="p-2 md:p-3 border border-green-600 text-left">S.No.</th>
                    <th className="p-2 md:p-3 border border-green-600 text-left">COMPOSITION</th>
                    <th className={`${tableQuantityBg} p-2 md:p-3 border border-red-600 text-left`}>
                      RESOLUTION (EACH 500 GM)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resolutionKitData.composition.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        item.highlight
                          ? `${tableHighlightBg} text-white`
                          : index % 2 === 0
                          ? 'bg-white'
                          : tableEvenRowBg
                      }
                    >
                      <td className="p-2 border border-slate-300 text-center font-medium">{item.no}</td>
                      <td className="p-2 border border-slate-300 font-medium">{item.name}</td>
                      <td className={`p-2 border border-red-600 ${item.highlight ? '' : tableQuantityBg + ' text-white'} font-semibold`}>
                        {item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ingredients & Arrow */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
              <div className="space-y-1 mb-4">
                {resolutionKitData.keyIngredients.map((ingredient, index) => (
                  <React.Fragment key={index}>
                    <p className={`text-lg font-semibold ${titleColor}`}>{ingredient}</p>
                    {index < resolutionKitData.keyIngredients.length - 1 && (
                      <p className={`text-lg font-semibold ${titleColor}`}>+</p>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* Arrow */}
              <div className="hidden lg:flex w-full items-center mt-4">
                <div className="h-1 bg-slate-600 flex-grow"></div>
                <ArrowRightCircle size={32} className={`${titleColor} mx-2 scale-x-150`} />
              </div>
              <div className="lg:hidden my-4">
                <ArrowRightCircle size={40} className={`${titleColor} rotate-90 mx-auto`} />
              </div>
            </div>

            {/* Image, Benefits & Dosage */}
            <div className="lg:col-span-4 flex flex-col items-center space-y-6">
              <div className="bg-white p-3 rounded-lg shadow-lg w-full max-w-xs">
                <img
                  src={resolutionKitProductImage}
                  alt="RESOLUTION-KIT POWDER"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Benefits Section */}
              {resolutionKitData.benefits && resolutionKitData.benefits.length > 0 && (
                <div className="w-full max-w-md p-4 rounded-xl shadow-lg bg-purple-600 text-white text-sm md:text-base">
                  <h3 className="font-bold text-lg mb-2 text-yellow-300">
                    {resolutionKitData.benefitsTitle}
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {resolutionKitData.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dosage Section */}
              <div className={`w-full max-w-md p-4 rounded-xl shadow-lg bg-indigo-100 ${titleColor} text-sm md:text-base`}>
                <h3 className="font-bold text-lg mb-2 text-yellow-600">
                  {resolutionKitData.recommendedDosageTitle}
                </h3>
                {resolutionKitData.dosageInstructions.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              {/* Available Pack Section */}
              <div className="text-center w-full max-w-md">
                <p className={`font-semibold text-base md:text-lg ${titleColor}`}>
                  {resolutionKitData.availablePack.title}{' '}
                  <span className="text-red-600 font-bold">{resolutionKitData.availablePack.details}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Note Section */}
      {resolutionKitData.productNote && (
        <section className={`${bgColor} py-4 md:py-6`}>
          <div className="container mx-auto px-4 max-w-7xl">
            <p className="text-center text-base md:text-lg font-medium text-slate-700 italic">
              {resolutionKitData.productNote}
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={`${bgColor} py-6`}>
        <p className={`text-center text-lg md:text-xl font-semibold px-4 ${titleColor}`}>
          {resolutionKitData.footerTagline}
        </p>
      </footer>
    </div>
  );
}