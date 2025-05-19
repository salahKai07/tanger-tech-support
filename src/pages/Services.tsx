
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Services = () => {
  const servicesData = [
    {
      id: "audit",
      title: "Audit informatique",
      description: "Évaluation complète de votre infrastructure informatique pour identifier les faiblesses et proposer des améliorations.",
      icon: "🔍",
      details: [
        "Analyse de l'architecture réseau",
        "Évaluation de la sécurité",
        "Audit des performances",
        "Vérification de la conformité",
        "Recommandations détaillées"
      ]
    },
    {
      id: "maintenance",
      title: "Maintenance mensuelle",
      description: "Service proactif de maintenance pour garantir le bon fonctionnement de vos systèmes informatiques.",
      icon: "🔧",
      details: [
        "Mises à jour système régulières",
        "Vérification des sauvegardes",
        "Nettoyage et optimisation",
        "Surveillance des performances",
        "Rapport mensuel d'activité"
      ]
    },
    {
      id: "remote",
      title: "Support à distance",
      description: "Assistance technique à distance rapide pour résoudre vos problèmes sans délai.",
      icon: "💻",
      details: [
        "Dépannage en temps réel",
        "Accès sécurisé à distance",
        "Résolution rapide des problèmes",
        "Assistance utilisateur",
        "Disponibilité étendue"
      ]
    },
    {
      id: "hardware",
      title: "Remplacement matériel",
      description: "Service de remplacement et d'installation de matériel informatique défectueux.",
      icon: "🖥️",
      details: [
        "Diagnostic matériel précis",
        "Sourcing des composants",
        "Installation et configuration",
        "Tests de performance",
        "Garantie sur les interventions"
      ]
    },
    {
      id: "security",
      title: "Sécurité informatique",
      description: "Protection complète de vos données et systèmes contre les menaces informatiques.",
      icon: "🔒",
      details: [
        "Installation d'antivirus",
        "Configuration de pare-feu",
        "Gestion des droits d'accès",
        "Protection contre les ransomwares",
        "Formation à la cybersécurité"
      ]
    },
    {
      id: "network",
      title: "Gestion de réseau",
      description: "Installation et gestion de réseaux informatiques pour une connectivité optimale.",
      icon: "📡",
      details: [
        "Configuration de routeurs et switches",
        "Mise en place de VLANs",
        "Optimisation du réseau WiFi",
        "Résolution des problèmes de connectivité",
        "Monitoring du trafic réseau"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-it-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Nos Services</h1>
          <p className="text-center max-w-3xl mx-auto opacity-90">
            Nous proposons une gamme complète de services informatiques pour répondre 
            à tous les besoins de votre entreprise. De l'audit à la maintenance, 
            notre équipe d'experts est là pour vous accompagner.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {servicesData.map((service, index) => (
              <div key={index} className="service-card bg-white" id={service.id}>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-it-darkGray mb-4">{service.description}</p>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Ce service inclut :</h4>
                  <ul className="space-y-1 mb-6">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-it-blue mr-2">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button asChild className="w-full bg-it-blue hover:bg-it-darkBlue">
                  <Link to={`/demande?service=${service.id}`}>Demander ce service</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions */}
      <section className="py-16 bg-it-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Vous avez besoin d'une solution personnalisée ?</h2>
            <p className="mb-8 text-it-darkGray">
              Nous comprenons que chaque entreprise a des besoins uniques. 
              Notre équipe peut concevoir une solution sur mesure adaptée 
              spécifiquement à votre situation.
            </p>
            <Button asChild size="lg" className="bg-it-blue hover:bg-it-darkBlue">
              <Link to="/contact">Discuter de vos besoins</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
