import { Car, Shield, Cloud, CreditCard, Monitor, Users } from "lucide-react";
import { IconBadge } from "../shared/icon-badge";

const features = [
  {
    icon: Car,
    title: "Location de voitures",
    description:
      "Louez des voitures adaptées à vos besoins, que ce soit pour un voyage d'affaires ou un déplacement professionnel.",
  },
  {
    icon: Shield,
    title: "Sécurité",
    description:
      "Protégez vos biens avec nos véhicules entièrement assurés pour vous offrir une tranquillité d'esprit totale.",
  },
  {
    icon: Cloud,
    title: "Réservation en ligne",
    description:
      "Réservez votre véhicule en ligne, à tout moment, de manière rapide et facile. Une expérience de location moderne et simple.",
  },
  {
    icon: CreditCard,
    title: "Tarification transparente",
    description:
      "Nous offrons une tarification claire et sans surprise. Vous payez seulement pour ce que vous utilisez.",
  },
  {
    icon: Monitor,
    title: "Gestion de flotte",
    description:
      "Gérez et surveillez vos locations de véhicules à partir d'une plateforme centralisée, accessible en ligne.",
  },
  {
    icon: Users,
    title: "Service clientèle",
    description:
      "Bénéficiez d'un support client dédié et réactif, disponible à tout moment pour répondre à vos besoins.",
  },
];

const Features: React.FC = () => {
  return (
    <div className="w-full my-32">
      <div className="max-w-screen-md mb-8 lg:mb-16">
        <h2 className="mb-4 text-5xl tracking-tight font-bold text-gray-900 dark:text-white">
          Conçu pour les équipes d'affaires comme la vôtre
        </h2>
        <p className="text-gray-500 sm:text-xl  dark:text-gray-400">
          Chez nous, nous nous concentrons sur des solutions de location de
          voitures flexibles et pratiques pour toutes vos affaires.
        </p>
      </div>
      <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:space-y-0">
        {features.map((feature, index) => (
          <div key={index} className="w-full flex flex-col gap-2">
            <div className="w-fit">
              <IconBadge icon={feature.icon} size={"default"} />
            </div>
            <h3 className="mt-2 text-2xl font-bold dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
