import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 h-[100vh]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <a
          href="#"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          role="alert"
        >
          <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">
            Nouveau
          </span>
          <span className="text-sm font-medium text-black">
            Découvrez nos nouvelles offres de location de voitures
          </span>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl dark:text-white">
          Louez une voiture et explorez le monde
        </h1>
        <p className="mb-8 text-lg font-normal text-black lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Découvrez une large gamme de véhicules adaptés à vos besoins.
          Conduisez en toute liberté et confort où que vous soyez.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            En savoir plus
          </a>
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Voir la vidéo
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;