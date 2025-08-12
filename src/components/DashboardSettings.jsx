import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, DollarSign, Ruler, Edit, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DashboardSettings = ({ settings }) => {
  const { toast } = useToast();

  const handleEdit = () => {
    toast({
      title: '🚧 Feature in Development',
      description: "Editing settings is coming soon! You can request this feature in the next prompt.",
    });
  };

  return (
    <Card className="shadow-lg w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle className="text-2xl flex items-center">
            <Settings className="mr-3 h-6 w-6 text-blue-500" />
            Business Settings
          </CardTitle>
          <CardDescription>Your default values for creating new estimates.</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full"><DollarSign className="h-6 w-6 text-blue-600" /></div>
                <div>
                    <p className="text-sm text-gray-500">Currency</p>
                    <p className="font-semibold text-lg">{settings?.currency || 'N/A'}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full"><Ruler className="h-6 w-6 text-blue-600" /></div>
                <div>
                    <p className="text-sm text-gray-500">Units</p>
                    <p className="font-semibold text-lg capitalize">{settings?.units || 'N/A'}</p>
                </div>
            </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center"><Package className="mr-2 h-5 w-5 text-gray-600"/> Default Service Types</h4>
          {settings?.service_types && Array.isArray(settings.service_types) && settings.service_types.length > 0 ? (
            <div className="space-y-2">
              {settings.service_types.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-3 bg-white border rounded-lg"
                >
                  <span className="font-medium">{service.service}</span>
                  <span className="text-gray-600">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: settings.currency || 'USD' }).format(service.rate)} / {service.unit}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4 bg-slate-50 rounded-lg">No default services have been configured.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardSettings;