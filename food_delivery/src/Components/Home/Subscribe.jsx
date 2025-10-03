"use client";
import OTPModal from "@/Components/Home/OtpModal";
import { useState } from "react";
import leafImg from '@/assets/banner/leafImg.jpg';
import Image from "next/image";

const Subscribe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const handleModalClose = () => {
    setEmail("")
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && (
        <OTPModal isOpen={isModalOpen} onClose={handleModalClose} />
      )}
      <section className="py-20  bg-white">
        <div className="container relative overflow-hidden mx-auto px-4">
          <div className="absolute inset-0 z-0">
            <Image
              src={leafImg}
              alt="Fresh fruits background"
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-white/50"></div>
          </div>
          <div className="container  mx-auto px-4 pt-24 pb-12 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl text-textClr md:text-4xl font-bold text-navy-900 mb-4">
                Tasty News, Delivered Weekly
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Subscribe now and get the latest food deals, updates, and tasty
                offers delivered straight to your inbox.
              </p>
              <div className=" flex justify-center items-center my-5">
                <div className="sm:border sm:bg-white sm:border-primary sm:rounded-full inline-block mx-1">
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="no-spinner  my-2 border border-primary sm:border-none text-center focus:outline-none rounded-full px-4 py-2"
                    name="mobile"
                    id="mobile"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary hover:bg-coral-600 sm:mr-1 text-white px-4 py-2 rounded-full  font-medium transition-colors shadow-lg"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subscribe;
