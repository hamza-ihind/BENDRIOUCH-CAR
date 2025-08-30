import React from "react";
import Title from "../shared/Title";
import Image from "next/image";
import { StepForward } from "lucide-react";

const Approche = () => {
  return (
    <section className="page-config max-sm:px-8 md:px-12 lg:px-48 full-width-section bg-white dark:bg-neutral-950" id="APPROCHE">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full mb-6">
            <StepForward className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span className="text-yellow-800 dark:text-yellow-300 font-medium">Notre Approche</span>
          </div>
          <h2 className="mb-6 font-bold text-gray-900 text-4xl lg:text-5xl xl:text-6xl dark:text-white">
            Suivez ces étapes pour{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              réserver{" "}
            </span>
            votre voiture facilement
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl transform -rotate-3"></div>
            <div className="relative z-10">
              <Image
                className="object-cover rounded-2xl shadow-2xl w-full h-[400px] lg:h-[500px]"
                src="/approach.png"
                alt="Car Rental Process"
                width={600}
                height={500}
              />
            </div>
          </div>
          {/* End Col */}

          {/* Timeline */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Heading */}
            <div className="mb-8">
              <h3 className="text-yellow-600 dark:text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">
                Processus Simple
              </h3>
              <p className="text-gray-600 dark:text-neutral-300 text-lg">
                Quatre étapes faciles pour obtenir votre véhicule
              </p>
            </div>
            {/* End Heading */}

            {/* Item 1 */}
            <div className="flex gap-x-6">
              {/* Icon */}
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-yellow-400 to-transparent"></div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="flex-1 pb-4">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Inscription ou connexion
                </h4>
                <p className="text-gray-600 dark:text-neutral-300 leading-relaxed">
                  Créez un compte ou connectez-vous pour commencer votre
                  réservation en toute sécurité.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item 1 */}

            {/* Item 2 */}
            <div className="flex gap-x-6">
              {/* Icon */}
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-yellow-400 to-transparent"></div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="flex-1 pb-4">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Commencez une réservation
                </h4>
                <p className="text-gray-600 dark:text-neutral-300 leading-relaxed">
                  Choisissez la voiture de votre choix parmi notre flotte
                  disponible et moderne.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item 2 */}

            {/* Item 3 */}
            <div className="flex gap-x-6">
              {/* Icon */}
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-yellow-400 to-transparent"></div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="flex-1 pb-4">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Choisissez la voiture
                </h4>
                <p className="text-gray-600 dark:text-neutral-300 leading-relaxed">
                  Sélectionnez le modèle, la taille et les options selon vos
                  préférences et besoins spécifiques.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item 3 */}

            {/* Item 4 */}
            <div className="flex gap-x-6">
              {/* Icon */}
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="flex-1 pb-4">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Confirmation rapide
                </h4>
                <p className="text-gray-600 dark:text-neutral-300 leading-relaxed mb-6">
                  Un administrateur confirmera votre réservation et vous enverra
                  tous les détails nécessaires rapidement.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item 4 */}

            <div>
              <button className="cta-button">
                Commencez votre réservation
              </button>
            </div>
          </div>
          {/* End Timeline */}
        </div>
        {/* End Grid */}
    </section>
  );
};

export default Approche;
