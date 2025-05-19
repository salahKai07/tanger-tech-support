
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "600 DH",
      period: "/mois",
      description: "Idéal pour les très petites entreprises ou les indépendants.",
      features: [
        "Support à distance",
        "Maintenance mensuelle",
        "Jusqu'à 3 postes",
        "2 heures d'assistance par mois",
        "Temps de réponse sous 48h"
      ],
      id: "basic"
    },
    {
      name: "Standard",
      price: "1200 DH",
      period: "/mois",
      description: "Parfait pour les petites entreprises en pleine croissance.",
      popular: true,
      features: [
        "Tous les services Basic",
        "Assistance sur site",
        "Jusqu'à 10 postes",
        "5 heures d'assistance par mois",
        "Temps de réponse sous 24h",
        "Audit annuel",
        "Conseils d'optimisation"
      ],
      id: "standard"
    },
    {
      name: "Pro",
      price: "2000 DH",
      period: "/mois",
      description: "La solution complète pour les entreprises établies.",
      features: [
        "Tous les services Standard",
        "Intervention prioritaire",
        "Plus de 10 postes",
        "10 heures d'assistance par mois",
        "Temps de réponse sous 12h",
        "Audit semestriel",
        "Conseils personnalisés",
        "Support téléphonique dédié"
      ],
      id: "pro"
    }
  ];

  const faqs = [
    {
      question: "Comment fonctionne le service de maintenance mensuelle ?",
      answer: "Notre service de maintenance mensuelle comprend des vérifications régulières de vos systèmes, des mises à jour logicielles, l'optimisation des performances et la résolution proactive des problèmes potentiels pour éviter les interruptions."
    },
    {
      question: "Puis-je changer de forfait en cours d'abonnement ?",
      answer: "Oui, vous pouvez passer à un forfait supérieur à tout moment. Pour passer à un forfait inférieur, le changement sera effectif à la fin de votre période d'abonnement en cours."
    },
    {
      question: "Y a-t-il un engagement de durée ?",
      answer: "Nos forfaits sont proposés avec un engagement minimal de 3 mois, après quoi vous pouvez résilier avec un préavis d'un mois."
    },
    {
      question: "Proposez-vous des services ponctuels en dehors des forfaits ?",
      answer: "Oui, nous proposons des interventions ponctuelles pour des besoins spécifiques. Contactez-nous pour un devis personnalisé."
    },
    {
      question: "Comment se déroule l'audit informatique ?",
      answer: "L'audit informatique comprend une analyse complète de votre infrastructure, l'identification des faiblesses potentielles, et un rapport détaillé avec des recommandations d'amélioration."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-it-blue text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Nos Forfaits</h1>
          <p className="text-center max-w-3xl mx-auto opacity-90">
            Des solutions adaptées à tous les budgets et à toutes les tailles d'entreprise.
            Choisissez le forfait qui correspond le mieux à vos besoins.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`price-card bg-white ${plan.popular ? 'price-card-highlight' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-it-blue text-white py-1 px-3 rounded-full text-sm inline-block mb-2">
                    Populaire
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-gray-600">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild 
                  className={`w-full ${plan.popular ? 'bg-it-blue hover:bg-it-darkBlue' : 'bg-it-blue hover:bg-it-darkBlue'}`}
                >
                  <Link to={`/demande?plan=${plan.id}`}>Choisir ce forfait</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote */}
      <section className="py-16 bg-it-gray">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Besoin d'un forfait personnalisé ?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Nous comprenons que certaines entreprises ont des besoins spécifiques qui ne correspondent pas 
            à nos forfaits standards. Contactez-nous pour discuter d'une solution adaptée à votre situation.
          </p>
          <Button asChild variant="outline" className="border-it-blue text-it-blue hover:bg-it-blue/5">
            <Link to="/contact">Demander un devis personnalisé</Link>
          </Button>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Questions fréquentes</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-it-darkGray">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
