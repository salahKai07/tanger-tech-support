
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Index = () => {
  const services = [
    {
      title: "Audit informatique",
      description: "Évaluation complète de votre infrastructure informatique pour identifier les problèmes et opportunités d'amélioration.",
      icon: "🔍"
    },
    {
      title: "Maintenance mensuelle",
      description: "Service proactif de maintenance pour garantir le bon fonctionnement de vos systèmes informatiques.",
      icon: "🔧"
    },
    {
      title: "Support à distance",
      description: "Assistance technique à distance rapide pour résoudre vos problèmes sans délai.",
      icon: "💻"
    },
    {
      title: "Remplacement matériel",
      description: "Service de remplacement et d'installation de matériel informatique défectueux.",
      icon: "🖥️"
    },
    {
      title: "Sécurité informatique",
      description: "Protection complète de vos données et systèmes contre les menaces informatiques.",
      icon: "🔒"
    },
    {
      title: "Gestion de réseau",
      description: "Installation et gestion de réseaux informatiques pour une connectivité optimale.",
      icon: "📡"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Solutions informatiques professionnelles à Tanger
              </h1>
              <p className="text-lg mb-8 opacity-90">
                Support informatique complet pour entreprises et professionnels. 
                De l'audit à la maintenance, nous garantissons la performance de vos systèmes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-it-blue hover:bg-gray-100">
                  <Link to="/demande">Demander un service</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://placehold.co/600x400/033E8C/FFFFFF?text=IT+Support+Tanger" 
                alt="IT Support Services" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-it-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos services</h2>
            <p className="text-it-darkGray max-w-2xl mx-auto">
              Découvrez notre gamme complète de services informatiques conçus pour répondre 
              à tous vos besoins technologiques.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-white">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-it-darkGray mb-4">{service.description}</p>
                <Link to="/services" className="text-it-blue hover:underline font-medium">
                  En savoir plus →
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-it-blue hover:bg-it-darkBlue">
              <Link to="/services">Voir tous nos services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos forfaits</h2>
            <p className="text-it-darkGray max-w-2xl mx-auto">
              Des solutions adaptées à tous les budgets et à toutes les tailles d'entreprise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="price-card bg-white">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Basic</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold">600 DH</span>
                  <span className="text-sm text-gray-600">/mois</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Support à distance</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Maintenance mensuelle</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Jusqu'à 3 postes</span>
                </li>
              </ul>
              
              <Button asChild className="w-full bg-it-blue hover:bg-it-darkBlue">
                <Link to="/demande">Choisir ce forfait</Link>
              </Button>
            </div>
            
            {/* Standard Plan */}
            <div className="price-card price-card-highlight bg-white">
              <div className="text-center mb-6">
                <div className="bg-it-blue text-white py-1 px-3 rounded-full text-sm inline-block mb-2">
                  Populaire
                </div>
                <h3 className="text-xl font-semibold">Standard</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold">1200 DH</span>
                  <span className="text-sm text-gray-600">/mois</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Tous les services Basic</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Assistance sur site</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Jusqu'à 10 postes</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Audit annuel</span>
                </li>
              </ul>
              
              <Button asChild className="w-full bg-it-blue hover:bg-it-darkBlue">
                <Link to="/demande">Choisir ce forfait</Link>
              </Button>
            </div>
            
            {/* Pro Plan */}
            <div className="price-card bg-white">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold">Pro</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold">2000 DH</span>
                  <span className="text-sm text-gray-600">/mois</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Tous les services Standard</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Intervention prioritaire</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Plus de 10 postes</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Audit semestriel</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Conseils personnalisés</span>
                </li>
              </ul>
              
              <Button asChild className="w-full bg-it-blue hover:bg-it-darkBlue">
                <Link to="/demande">Choisir ce forfait</Link>
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/pricing" className="text-it-blue hover:underline font-medium">
              Voir plus de détails sur nos forfaits →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-it-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à améliorer votre infrastructure informatique ?</h2>
          <p className="text-it-darkGray max-w-2xl mx-auto mb-8">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir 
            comment nos services peuvent vous aider à atteindre vos objectifs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-it-blue hover:bg-it-darkBlue">
              <Link to="/demande">Demander un service</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-it-blue text-it-blue hover:bg-it-blue/5">
              <Link to="/contact">Contactez-nous</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
