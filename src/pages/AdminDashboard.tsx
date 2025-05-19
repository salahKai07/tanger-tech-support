
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type ServiceRequest = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company: string | null;
  description: string | null;
  service_type: string | null;
  plan: string | null;
  file_url: string | null;
  file_name: string | null;
  status: string;
  total_amount: number | null;
  payment_status: string;
  created_at: string;
};

const AdminDashboard = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true); // For demo purposes, everyone is admin
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setRequests(data as ServiceRequest[]);
    } catch (error: any) {
      console.error('Error fetching requests:', error);
      toast.error(`Erreur lors du chargement des demandes: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setSheetOpen(true);
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({ status })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update the local state
      setRequests(requests.map(req => 
        req.id === id ? {...req, status} : req
      ));
      
      // If we're looking at the details of this request, update that too
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({...selectedRequest, status});
      }
      
      toast.success(`Statut mis à jour avec succès: ${status}`);
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error(`Erreur lors de la mise à jour: ${error.message}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">En attente</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Refusé</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">En cours</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Terminé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord administrateur</h1>
      <h2 className="text-xl font-semibold mb-4">Demandes de service</h2>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p>Aucune demande de service pour le moment.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Liste des demandes de service.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Forfait</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{formatDate(request.created_at)}</TableCell>
                  <TableCell>
                    {request.full_name}
                    <div className="text-xs text-gray-500">{request.email}</div>
                  </TableCell>
                  <TableCell>{request.service_type || 'N/A'}</TableCell>
                  <TableCell>
                    {request.plan === 'basic' && 'Basic'}
                    {request.plan === 'standard' && 'Standard'}
                    {request.plan === 'pro' && 'Pro'}
                    {!request.plan && 'N/A'}
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{request.total_amount ? `${request.total_amount} DH` : 'N/A'}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDetails(request)}
                    >
                      Voir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          {selectedRequest && (
            <>
              <SheetHeader>
                <SheetTitle>Détails de la demande</SheetTitle>
                <SheetDescription>
                  Demande soumise le {formatDate(selectedRequest.created_at)}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Informations client</h4>
                  <div className="mt-2 border rounded-md p-3">
                    <p><strong>Nom:</strong> {selectedRequest.full_name}</p>
                    <p><strong>Email:</strong> {selectedRequest.email}</p>
                    <p><strong>Téléphone:</strong> {selectedRequest.phone}</p>
                    {selectedRequest.company && <p><strong>Entreprise:</strong> {selectedRequest.company}</p>}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Détails du service</h4>
                  <div className="mt-2 border rounded-md p-3">
                    {selectedRequest.service_type && <p><strong>Service:</strong> {selectedRequest.service_type}</p>}
                    {selectedRequest.plan && (
                      <p>
                        <strong>Forfait:</strong> {selectedRequest.plan === 'basic' ? 'Basic' : 
                                            selectedRequest.plan === 'standard' ? 'Standard' : 
                                            selectedRequest.plan === 'pro' ? 'Pro' : selectedRequest.plan}
                      </p>
                    )}
                    {selectedRequest.total_amount && <p><strong>Montant:</strong> {selectedRequest.total_amount} DH</p>}
                    {selectedRequest.description && (
                      <div className="mt-2">
                        <strong>Description:</strong>
                        <p className="mt-1 whitespace-pre-wrap">{selectedRequest.description}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {selectedRequest.file_url && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Fichier joint</h4>
                    <div className="mt-2">
                      <a 
                        href={`${supabase.storage.from('service_request_files').getPublicUrl(selectedRequest.file_url).data.publicUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                        {selectedRequest.file_name || 'Télécharger le fichier'}
                      </a>
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Gérer la demande</h4>
                  <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    {selectedRequest.status === 'pending' && (
                      <>
                        <Button 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleUpdateStatus(selectedRequest.id, 'approved')}
                        >
                          Approuver
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={() => handleUpdateStatus(selectedRequest.id, 'rejected')}
                        >
                          Refuser
                        </Button>
                      </>
                    )}
                    {selectedRequest.status === 'approved' && (
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleUpdateStatus(selectedRequest.id, 'in_progress')}
                      >
                        Marquer en cours
                      </Button>
                    )}
                    {selectedRequest.status === 'in_progress' && (
                      <Button 
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => handleUpdateStatus(selectedRequest.id, 'completed')}
                      >
                        Marquer comme terminé
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      onClick={() => setSheetOpen(false)}
                    >
                      Fermer
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminDashboard;
