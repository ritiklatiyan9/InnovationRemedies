import React from 'react';
import {
  Box,
  Leaf,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Activity,
  Droplets,
} from 'lucide-react';
import fourteen from '../../assets/Images/fourteen.png';

export default function InnolivDSPage() {
  const innolivDsData = {
    mainTitle: 'INNOLIV-DS',
    hindiTitle: 'इन्नोलिव-डीएस',
    prefix: 'ULTRA',
    subTitle: 'LIQUID',
    tagline: 'WITH SILYMARINE',
    availablePacks: '500 ml, 1 Litre & 5 Litre',
    description:
      'A unique combination of Liver Boosting and Appetite Stimulant Herbs with Liver Extract, Amino Acids & Vitamin B Complex.',
    benefits: [
      { text: 'Improves Liver Health & Functions', icon: HeartPulse },
      { text: 'Improves Appetite, FCR & Growth Rate', icon: Sparkles },
      { text: 'Helps in Better Feed intake and Nutrient Metabolism', icon: Activity },
      { text: 'Prevents Fatty Liver Syndrome', icon: ShieldCheck },
      { text: 'Protects Liver from various Toxins', icon: ShieldCheck },
      { text: 'Improves Immune System', icon: ShieldCheck },
      { text: 'Provides Optimum Growth, FCR & Protein Synthesis', icon: Sparkles },
      { text: 'Provides Balanced Energy', icon: Droplets },
    ],
    englishHeading: 'Best Health and Immunity Booster:',
    productNameHighlight: 'INNOLIV-DS',
  };

  const colors = {
    primaryText: 'text-slate-800 dark:text-slate-100',
    secondaryText: 'text-slate-600 dark:text-slate-400',
    accentRed: 'text-red-600 dark:text-red-500',
    accentGreen: 'text-green-600 dark:text-green-500',
    accentYellow: 'text-yellow-500 dark:text-yellow-400',
    pageBg: 'bg-white dark:bg-slate-900', // Added dark mode bg for page
    cardBg: 'bg-white dark:bg-slate-800', // Added dark mode bg for cards (if any separate)
  };

  return (
    <div className={`min-h-screen ${colors.pageBg} font-sans antialiased`}>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${colors.primaryText} text-center sm:text-left`}>
            {innolivDsData.englishHeading}{' '}
            <span className={colors.accentGreen}>{innolivDsData.productNameHighlight}</span>
          </h1>
          <div className={`flex flex-col sm:flex-row sm:items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-6 text-center sm:text-left ${colors.secondaryText}`}>
            <span className="font-medium">{innolivDsData.tagline}</span>
            <span className="text-lg">
              <strong>Available Packs:</strong> {innolivDsData.availablePacks}
            </span>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column: Product Information */}
          <div>
            <div className="mb-4">
              <span className={`font-bold text-sm uppercase tracking-wider ${colors.accentRed}`}>
                {innolivDsData.prefix}
              </span>
              <h2 className={`text-3xl sm:text-4xl font-bold mt-1 sm:mt-2 mb-2 sm:mb-3 ${colors.primaryText}`}>
                <span className={colors.accentRed}>{innolivDsData.hindiTitle}</span>{' '}
                {innolivDsData.mainTitle}
              </h2>
              <p className={`text-xl font-semibold ${colors.secondaryText}`}>
                {innolivDsData.subTitle}
                <span
                  className={`ml-2 sm:ml-3 text-sm py-1 px-2.5 rounded-full font-medium bg-green-100 dark:bg-green-800 ${colors.accentGreen} inline-flex items-center`}
                >
                  <Leaf size={14} className="mr-1.5" /> {innolivDsData.tagline}
                </span>
              </p>
            </div>

            <p className={`text-lg mb-6 leading-relaxed ${colors.secondaryText}`}>{innolivDsData.description}</p>

            <div className="space-y-4">
              {innolivDsData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <benefit.icon className={`mt-1 mr-3 h-5 w-5 ${colors.accentGreen} flex-shrink-0`} />
                  <p className={`text-base sm:text-lg ${colors.primaryText}`}>{benefit.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 text-center sm:text-left">
              <span
                className={`inline-flex items-center gap-2 py-2 px-3 sm:px-4 rounded-lg bg-yellow-100 dark:bg-yellow-700 ${colors.accentYellow} font-medium shadow text-sm sm:text-base`}
              >
                <Box size={18} /> Available Packs: {innolivDsData.availablePacks}
              </span>
            </div>
          </div>

          {/* Right Column: Image and Highlight Card */}
          <div className="flex justify-center lg:justify-end items-start"> {/* Added items-start for better alignment if height differs */}
            <div className="relative w-full max-w-md">
              <div className="bg-yellow-400 dark:bg-yellow-500 rounded-xl p-4 shadow-lg"> {/* Added shadow */}
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-red-700 dark:text-red-800">
                    ULTRA {innolivDsData.hindiTitle}
                  </h2>
                  <h1 className="text-3xl sm:text-4xl font-bold text-red-700 dark:text-red-800 mt-1 sm:mt-2">
                    {innolivDsData.mainTitle}
                  </h1>
                  <h3 className="text-xl font-semibold text-red-700 dark:text-red-800 mt-1 sm:mt-2">{innolivDsData.subTitle}</h3>
                </div>

                {/* Benefits list inside the yellow card - consider a more compact presentation or selective display */}
                <ul className="bg-red-700 dark:bg-red-800 text-white rounded-lg p-3 sm:p-4 mt-4 text-xs sm:text-sm space-y-1">
                  {innolivDsData.benefits.slice(0, 5).map((benefit, index) => ( // Displaying first 5 for brevity, adjust as needed
                    <li key={index} className="flex items-start">
                      <benefit.icon className="h-4 w-4 mr-2 mt-0.5 text-yellow-300 flex-shrink-0" />
                      <span>{benefit.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-center mt-4">
                  <img
                    src={fourteen}
                    alt={`${innolivDsData.mainTitle} Bottle`}
                    className="w-full h-auto max-h-56 sm:max-h-64 object-contain"
                  />
                </div>
              </div>

              <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                <div className="bg-white dark:bg-slate-700 rounded-full p-1 shadow-md">
                  <div className="bg-green-100 dark:bg-green-800 p-1.5 sm:p-2 rounded-full text-center">
                    <Leaf className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.accentGreen} mx-auto`} />
                    <span className={`text-[10px] sm:text-xs font-medium block mt-0.5 sm:mt-1 ${colors.accentGreen}`}>
                      WITH SILYMARINE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-blue-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Chat Support"
        >
          <svg // Using a more common chat icon
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-7 sm:w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        </button>
      </div>
    </div>
  );
}