// src/pages/VeterinaryPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WellnessCheckImage from '../../../assets/Images/one.png';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';

function VeterinaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/70 via-green-100/50 to-white p-4 md:p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-full overflow-hidden">

        <main className="p-4 md:p-8 flex flex-col space-y-8">

          {/* 1. Hero */}
          <section className="flex flex-col-reverse md:flex-row items-center gap-6">
            {/* Left column */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left px-4 md:px-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">आपके प्यारे</span>
                <span className="block mt-2">जानवरों की</span>
                <span className="block mt-2">
                  संपूर्ण <span className="text-green-600">देखभाल</span>
                </span>
              </h1>
            </div>

            {/* Right column */}
            <div className="w-full md:w-1/2 flex justify-center px-4 md:px-0">
              <Link to="/services/wellness-exams" aria-label="Proactive Wellness Exams">
                <img
                  src={WellnessCheckImage}
                  alt="Veterinarian performing a wellness check on a dog"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto md:h-[400px] object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
          </section>
  <div className='flex flex-col md:flex-row space-y-6'>
   {/* 2. Product / Promotion Card */}
   <section className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 px-4 md:px-0">
            <Card className="relative bg-green-500 text-white rounded-3xl p-6 overflow-hidden flex-1 group">
              {/* animated circle */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-[8] pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-semibold mb-1">WeightBooster: Nutritional Mix</h3>
                <p className="text-sm opacity-90">Support healthy weight gain &amp; muscle development</p>
              </div>
              <Button
                variant="secondary"
                size="icon"
                className="relative z-10 rounded-full bg-white text-green-600 hover:bg-gray-100 self-end mt-4"
                aria-label="Explore WeightBooster"
              >
                <ArrowUpRight className="h-5 w-5" />
              </Button>
              <Link
                to="/product/weight-booster"
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                aria-label="Shop Now: WeightBooster Nutritional Mix"
              >
                <Button
                  variant="secondary"
                  className="rounded-full bg-white/90 hover:bg-white text-green-600 px-6 py-3 shadow-lg backdrop-blur-sm text-sm font-semibold"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" /> Shop Now
                </Button>
              </Link>
            </Card>
          </section>

          {/* 3. Clinic Info / Stats */}
          <section className="bg-gray-50 p-6 rounded-3xl px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col items-start">
                <div className="flex -space-x-2 mb-3">
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120"
                      alt="Happy Dog Owner"
                    />
                    <AvatarFallback>DO</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120"
                      alt="Happy Cat Owner"
                    />
                    <AvatarFallback>CO</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1591768575198-8838345a9130?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120"
                      alt="Happy Pet Owner"
                    />
                    <AvatarFallback>PO</AvatarFallback>
                  </Avatar>
                </div>
                <p className="text-3xl sm:text-4xl font-bold">15+ Years</p>
                <p className="text-sm text-gray-600">of dedicated pet care experience</p>
              </div>
              {/* Add more stats here if you like */}
            </div>
          </section>
  </div>
       

        </main>
      </div>
    </div>
  );
}

export default VeterinaryPage;
