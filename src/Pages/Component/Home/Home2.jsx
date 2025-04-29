// src/pages/VeterinaryPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WellnessCheckImage from '../../../assets/Images/one.png';
import { ArrowRight, ArrowUpRight, Eye, ShoppingBag, Stethoscope } from 'lucide-react';

function VeterinaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/70 via-green-100/50 to-white p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-9xl overflow-hidden mx-auto">

        <main className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* Left Column - Top: Hero Text */}
            <div className="flex flex-col justify-center space-y-6 md:pr-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-center md:text-left">
  <span className="block">आपके प्यारे</span>
  <span className="block md:inline">जानवरों की</span>
  <span className="block">संपूर्ण <span className='text-green-600'>देखभाल</span></span>
</h1>

              {/* Link the main button to the WeightBooster product page */}
              <Link to="/product/weight-booster">
                <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 self-start text-sm h-auto">
                  Buy WeightBooster
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Right Column - Top: Service Highlight Card (e.g., Wellness Exams) */}
            <Card className="group rounded-3xl overflow-hidden relative h-full min-h-[500px] md:min-h-[500px] cursor-pointer">
              <img
                src={WellnessCheckImage}
                alt="Veterinarian performing a checkup on a dog"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-colors duration-300 group-hover:from-black/70"></div>

              <CardContent className="absolute bottom-0 left-0 p-6 text-white z-10 w-full flex justify-between items-end pointer-events-none">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Proactive Wellness Exams</h3>
                  <p className="text-sm opacity-90">Keep them healthy year-round</p>
                </div>
              </CardContent>

              {/* Fixed: Link to a wellness-exam service page */}
              <Link
                  to="/product/weight-booster
                  " 
                  className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Learn More: Proactive Wellness Exams"
              >
                  <Button
                    variant="secondary"
                    className="rounded-full bg-white/90 hover:bg-white text-black px-6 py-3 shadow-lg backdrop-blur-sm text-sm font-semibold h-auto"
                  >
                     <ShoppingBag className="mr-2 h-5 w-5"/> Buy Now
                  </Button>
              </Link>
            </Card>

            {/* Left Column - Bottom: Product Highlight Card (WeightBooster) */}
            <Card className="group relative bg-green-500 text-white rounded-3xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer">
                 <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-[8] pointer-events-none"></div>

                <div className="relative z-10 pointer-events-none">
                    <h3 className="text-2xl font-semibold mb-2">WeightBooster: Nutritional Mix</h3>
                    <p className="text-sm opacity-90">Support healthy weight gain & muscle development</p>
                </div>

                {/* Original Arrow Button (hidden on hover) */}
                <Button variant="secondary" size="icon" className="relative z-10 rounded-full bg-white text-green-600 hover:bg-gray-100 self-end mt-4 transition-opacity duration-300 group-hover:opacity-0">
                   <ArrowUpRight className="h-5 w-5" />
                </Button>

                {/* Link to WeightBooster product page */}
                <Link
                  to="/product/weight-booster"
                  className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Shop Now: WeightBooster Nutritional Mix"
                 >
                  <Button
                    variant="secondary"
                    className="rounded-full bg-white/90 hover:bg-white text-green-600 px-6 py-3 shadow-lg backdrop-blur-sm text-sm font-semibold h-auto"
                  >
                     <ShoppingBag className="mr-2 h-5 w-5"/> Shop Now
                  </Button>
                 </Link>
            </Card>


            {/* Right Column - Bottom: Clinic Info / Stats (remains the same) */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-center bg-gray-50 p-6 rounded-3xl">
                {/* Clinic Stats/Reviews Section */}
                <div className='flex flex-col items-start'>
                    <div className="flex -space-x-2 mb-3">
                       {/* Placeholder avatars */}
                       <Avatar className="h-10 w-10 border-2 border-white">
                         <AvatarImage src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=120&h=120" alt="Happy Dog Owner" />
                         <AvatarFallback>DO</AvatarFallback>
                       </Avatar>
                       <Avatar className="h-10 w-10 border-2 border-white">
                         <AvatarImage src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=120&h=120" alt="Happy Cat Owner" />
                         <AvatarFallback>CO</AvatarFallback>
                       </Avatar>
                       <Avatar className="h-10 w-10 border-2 border-white">
                         <AvatarImage src="https://images.unsplash.com/photo-1591768575198-8838345a9130?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBldCUyMG93bmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=120&h=120" alt="Happy Pet Owner" />
                         <AvatarFallback>PO</AvatarFallback>
                       </Avatar>
                    </div>
                    <p className="text-4xl font-bold">15+ Years</p>
                    <p className="text-sm text-gray-600">of dedicated pet care experience</p>
                </div>

               
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default VeterinaryPage;