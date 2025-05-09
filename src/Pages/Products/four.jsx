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
    pageBg: 'bg-white',
    cardBg: 'bg-white',
  };

  return (
    <div className={`min-h-screen ${colors.pageBg} font-sans antialiased`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 text-center sm:text-left">
            {innolivDsData.englishHeading}{' '}
            <span className="text-green-500">{innolivDsData.productNameHighlight}</span>
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            <span className="font-medium">{innolivDsData.tagline}</span>
            <span className="text-lg">
              <strong>Available Packs:</strong> {innolivDsData.availablePacks}
            </span>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left */}
          <div>
            <div className="mb-4">
              <span className={`font-bold text-sm uppercase tracking-wider ${colors.accentRed}`}>
                {innolivDsData.prefix}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-3">
                <span className={colors.accentRed}>{innolivDsData.hindiTitle}</span>{' '}
                {innolivDsData.mainTitle}
              </h2>
              <p className={`text-xl font-semibold ${colors.secondaryText}`}>
                {innolivDsData.subTitle}
                <span
                  className={`ml-3 text-sm py-1 px-2.5 rounded-full font-medium bg-green-100 ${colors.accentGreen} inline-flex items-center`}
                >
                  <Leaf size={14} className="mr-1.5" /> {innolivDsData.tagline}
                </span>
              </p>
            </div>

            <p className="text-lg mb-6 leading-relaxed">{innolivDsData.description}</p>

            <div className="space-y-4">
              {innolivDsData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <benefit.icon className="mt-1 mr-3 h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-base sm:text-lg">{benefit.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <span
                className={`inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-yellow-100 ${colors.accentYellow} font-medium shadow`}
              >
                <Box size={20} /> Available Packs: {innolivDsData.availablePacks}
              </span>
            </div>
          </div>

          {/* Right - Image and Highlight */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="bg-yellow-400 rounded-xl p-4">
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold text-red-700">
                    ULTRA {innolivDsData.hindiTitle}
                  </h2>
                  <h1 className="text-3xl sm:text-4xl font-bold text-red-700 mt-2">
                    INNOLIV-DS
                  </h1>
                  <h3 className="text-xl font-semibold text-red-700 mt-2">{innolivDsData.subTitle}</h3>
                </div>

                <ul className="bg-red-700 text-white rounded-lg p-4 mt-4 text-sm sm:text-base">
                  {innolivDsData.benefits.map((benefit, index) => (
                    <li key={index}>- {benefit.text}</li>
                  ))}
                </ul>

                <div className="flex justify-center mt-4">
                  <img
                    src={fourteen}
                    alt="INNOLIV-DS Bottle"
                    className="w-full h-auto max-h-64 object-contain"
                  />
                </div>
              </div>

              <div className="absolute top-3 right-3">
                <div className="bg-white rounded-full p-1 shadow-md">
                  <div className="bg-green-100 p-2 rounded-full text-center">
                    <Leaf className="h-6 w-6 text-green-600 mx-auto" />
                    <span className="text-xs font-medium block mt-1">WITH SILYMARINE</span>
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
          className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Chat Support"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
