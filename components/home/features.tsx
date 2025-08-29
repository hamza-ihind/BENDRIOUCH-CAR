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
    <section className="page-config max-sm:px-8 md:px-12 lg:px-48 full-width-section bg-gray-50 dark:bg-neutral-900">
        <div className="text-center mb-16">
          <h2 className="mb-6 font-bold text-gray-900 text-4xl lg:text-5xl xl:text-6xl dark:text-white">
            Conçu pour les équipes d'affaires comme la{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              vôtre
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Chez nous, nous nous concentrons sur des solutions de location de
            voitures flexibles et pratiques pour toutes vos affaires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-500 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
    </section>
  );
};

export default Features;
