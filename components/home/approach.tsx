import React from "react";
import Title from "../shared/Title";
import Image from "next/image";
import { StepForward } from "lucide-react";

const Approche = () => {
  return (
    <main className="page-config" id="APPROCHE">
      <Title
        icon={StepForward}
        title="Notre Approche"
        description="Suivez ces étapes simples pour réserver votre voiture facilement."
      />
      <div className="w-full px-4 xl:px-0 py-10 lg:pt-20 lg:pb-20">
        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-32 lg:items-center">
          <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
            <Image
              className="object-cover rounded-xl"
              src="/approach.png"
              alt="Car Rental"
              width={800}
              height={200}
            />
          </div>
          {/* End Col */}

          {/* Timeline */}
          <div>
            {/* Heading */}
            <div className="mb-4">
              <h3 className="text-yellow-400 text-xs font-medium uppercase">
                Étapes
              </h3>
            </div>
            {/* End Heading */}

            {/* Item 1 */}
            <div className="flex gap-x-5 ms-1">
              {/* Icon */}
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:left-4 after:w-px after:bg-neutral-800">
                <div className="relative z-10 w-8 h-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center w-8 h-8 border border-neutral-800 text-yellow-400 font-semibold text-xs uppercase rounded-full">
                    1
                  </span>
                </div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-lg lg:text-xl text-neutral-800 font-normal">
                  <span className="font-bold text-black">
                    Inscription ou connexion :
                  </span>{" "}
                  Créez un compte ou connectez-vous pour commencer votre
                  réservation.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item 1 */}

            {/* Item 2 */}
            <div className="flex gap-x-5 ms-1">
              {/* Icon */}
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:left-4 after:w-px after:bg-neutral-800">
                <div className="relative z-10 w-8 h-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center w-8 h-8 border border-neutral-800 text-yellow-400 font-semibold text-xs uppercase rounded-full">
                    2
                  </span>
                </div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-lg lg:text-xl text-neutral-800 font-normal">
                  <span className="font-bold text-black">
                    Commencez une réservation :
                  </span>{" "}
                  Choisissez la voiture de votre choix parmi notre flotte
                  disponible.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item 2 */}

            {/* Item 3 */}
            <div className="flex gap-x-5 ms-1">
              {/* Icon */}
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:left-4 after:w-px after:bg-neutral-800">
                <div className="relative z-10 w-8 h-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center w-8 h-8 border border-neutral-800 text-yellow-400 font-semibold text-xs uppercase rounded-full">
                    3
                  </span>
                </div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-lg lg:text-xl text-neutral-800 font-normal">
                  <span className="font-bold text-black">
                    Choisissez la voiture :
                  </span>{" "}
                  Sélectionnez le modèle, la taille et les options selon vos
                  préférences.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item 3 */}

            {/* Item 4 */}
            <div className="flex gap-x-5 ms-1">
              {/* Icon */}
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:left-4 after:w-px after:bg-neutral-800">
                <div className="relative z-10 w-8 h-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center w-8 h-8 border border-neutral-800 text-yellow-400 font-semibold text-xs uppercase rounded-full">
                    4
                  </span>
                </div>
              </div>
              {/* End Icon */}

              {/* Right Content */}
              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-lg lg:text-xl text-neutral-800 font-normal">
                  <span className="font-bold text-black">
                    Attendez la confirmation :
                  </span>{" "}
                  Un administrateur confirmera votre réservation et vous enverra
                  les détails.
                </p>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item 4 */}

            <a
              className="group inline-flex items-center gap-x-2 py-2 px-3 bg-yellow-400 font-medium text-sm text-neutral-800 rounded-full focus:outline-none"
              href="#"
            >
              Commencez votre réservation
            </a>
          </div>
          {/* End Timeline */}
        </div>
        {/* End Grid */}
      </div>
    </main>
  );
};

export default Approche;
