
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

const ServiceRequest = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preSelectedPlan = searchParams.get('plan');
  const preSelectedService = searchParams.get('service');
  
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    description: '',
    serviceType: preSelectedService || '',
    plan: preSelectedPlan || '',
    file: null as File | null,
  });

  const nextStep = () => {
    if (formStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast.error("Veuillez remplir tous les champs obligatoires");
        return;
      }
    }
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const getAmountFromPlan = (plan: string): number => {
    switch (plan) {
      case 'basic': return 600;
      case 'standard': return 1200;
      case 'pro': return 2000;
      default: return 0;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let fileUrl = null;
      let fileName = null;
      
      // Upload file if it exists
      if (formData.file) {
        const fileExt = formData.file.name.split('.').pop();
        fileName = `${uuidv4()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('service_request_files')
          .upload(fileName, formData.file);
          
        if (uploadError) {
          throw new Error(`Erreur lors du téléchargement du fichier: ${uploadError.message}`);
        }
        
        fileUrl = data?.path || null;
      }
      
      // Save form data to Supabase
      const { error } = await supabase
        .from('service_requests')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          description: formData.description,
          service_type: formData.serviceType,
          plan: formData.plan,
          file_url: fileUrl,
          file_name: fileName,
          total_amount: getAmountFromPlan(formData.plan),
        });
        
      if (error) {
        throw new Error(`Erreur lors de l'enregistrement: ${error.message}`);
      }
      
      // Show success message
      toast.success("Demande envoyée avec succès! Nous vous contacterons bientôt.");
      
      // Reset form and redirect to home page after delay
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          description: '',
          serviceType: '',
          plan: '',
          file: null,
        });
        setFormStep(1);
        navigate('/');
      }, 2000);
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(`Une erreur est survenue: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Demande de service</h1>
        
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-between">
            <div className={`text-center ${formStep >= 1 ? 'text-it-blue' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${formStep >= 1 ? 'bg-it-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <div className="text-sm">Informations</div>
            </div>
            <div className={`text-center ${formStep >= 2 ? 'text-it-blue' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${formStep >= 2 ? 'bg-it-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <div className="text-sm">Détails</div>
            </div>
            <div className={`text-center ${formStep >= 3 ? 'text-it-blue' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${formStep >= 3 ? 'bg-it-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                3
              </div>
              <div className="text-sm">Paiement</div>
            </div>
          </div>
          <div className="relative mt-2">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200"></div>
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-it-blue transition-all duration-300"
              style={{ width: `${(formStep - 1) * 50}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {formStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Vos informations</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nom complet *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Entreprise</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button type="button" onClick={nextStep} className="bg-it-blue hover:bg-it-darkBlue">
                      Suivant
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Service Details */}
              {formStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Détails de votre demande</h2>
                  
                  <div className="space-y-2">
                    <Label>Type de service</Label>
                    <RadioGroup
                      value={formData.serviceType}
                      onValueChange={(value) => handleRadioChange('serviceType', value)}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="audit" id="audit" />
                        <Label htmlFor="audit" className="cursor-pointer">Audit informatique</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="maintenance" id="maintenance" />
                        <Label htmlFor="maintenance" className="cursor-pointer">Maintenance mensuelle</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="remote" id="remote" />
                        <Label htmlFor="remote" className="cursor-pointer">Support à distance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hardware" id="hardware" />
                        <Label htmlFor="hardware" className="cursor-pointer">Remplacement matériel</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="security" id="security" />
                        <Label htmlFor="security" className="cursor-pointer">Sécurité informatique</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="network" id="network" />
                        <Label htmlFor="network" className="cursor-pointer">Gestion de réseau</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <Label>Forfait</Label>
                    <RadioGroup
                      value={formData.plan}
                      onValueChange={(value) => handleRadioChange('plan', value)}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
                    >
                      <div className="border rounded-lg p-4 hover:border-it-blue cursor-pointer transition-colors">
                        <div className="flex items-center">
                          <RadioGroupItem value="basic" id="basic" />
                          <Label htmlFor="basic" className="ml-2 cursor-pointer font-medium">Forfait Basic</Label>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">600 DH/mois</p>
                      </div>
                      <div className="border rounded-lg p-4 hover:border-it-blue cursor-pointer transition-colors">
                        <div className="flex items-center">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="ml-2 cursor-pointer font-medium">Forfait Standard</Label>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">1200 DH/mois</p>
                      </div>
                      <div className="border rounded-lg p-4 hover:border-it-blue cursor-pointer transition-colors">
                        <div className="flex items-center">
                          <RadioGroupItem value="pro" id="pro" />
                          <Label htmlFor="pro" className="ml-2 cursor-pointer font-medium">Forfait Pro</Label>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">2000 DH/mois</p>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <Label htmlFor="description">Description de votre problème ou demande</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Décrivez votre problème ou votre besoin en détail..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="file">Joindre un fichier (optionnel)</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-gray-500">Formats acceptés: PDF, DOC, JPG, PNG. Max: 10MB</p>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Retour
                    </Button>
                    <Button type="button" onClick={nextStep} className="bg-it-blue hover:bg-it-darkBlue">
                      Suivant
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {formStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Paiement</h2>
                  
                  <div className="border rounded-lg p-6 mb-6">
                    <h3 className="font-medium mb-4">Récapitulatif de votre commande</h3>
                    
                    {formData.serviceType && (
                      <div className="flex justify-between py-2 border-b">
                        <span>Service:</span>
                        <span className="font-medium">
                          {formData.serviceType === 'audit' && 'Audit informatique'}
                          {formData.serviceType === 'maintenance' && 'Maintenance mensuelle'}
                          {formData.serviceType === 'remote' && 'Support à distance'}
                          {formData.serviceType === 'hardware' && 'Remplacement matériel'}
                          {formData.serviceType === 'security' && 'Sécurité informatique'}
                          {formData.serviceType === 'network' && 'Gestion de réseau'}
                        </span>
                      </div>
                    )}
                    
                    {formData.plan && (
                      <div className="flex justify-between py-2 border-b">
                        <span>Forfait:</span>
                        <span className="font-medium">
                          {formData.plan === 'basic' && 'Forfait Basic - 600 DH/mois'}
                          {formData.plan === 'standard' && 'Forfait Standard - 1200 DH/mois'}
                          {formData.plan === 'pro' && 'Forfait Pro - 2000 DH/mois'}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between py-3 font-bold text-lg mt-2">
                      <span>Total:</span>
                      <span>
                        {formData.plan === 'basic' && '600 DH'}
                        {formData.plan === 'standard' && '1200 DH'}
                        {formData.plan === 'pro' && '2000 DH'}
                        {!formData.plan && 'À déterminer'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-it-gray p-6 rounded-lg">
                    <p className="text-center mb-4">
                      Pour finaliser votre demande de service, veuillez cliquer sur le bouton ci-dessous.
                      <br />Une fois votre demande reçue, nous vous contacterons pour les détails du paiement.
                    </p>
                    
                    <div className="flex justify-center">
                      <Button 
                        type="submit" 
                        className="bg-it-blue hover:bg-it-darkBlue px-8 py-6 text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Envoi en cours...' : 'Finaliser la demande'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                      Retour
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceRequest;
