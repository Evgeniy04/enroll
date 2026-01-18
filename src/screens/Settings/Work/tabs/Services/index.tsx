import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useConfirm } from '@/hooks/useConfirm';
import { ServiceCard } from '@/screens/Settings/Work/tabs/Services/components/ServiceCard';
import { ServiceFormDialog } from '@/screens/Settings/Work/tabs/Services/components/ServiceFormDialog';
import { Service } from '@/screens/Settings/Work/tabs/Services/Services.types';
import { services as mockServices } from '@/screens/test-store';
import { FC, useState } from 'react';
import { View } from 'react-native';

export const ServiceManager: FC = () => {
  const { confirm, ConfirmDialogElement } = useConfirm();
  const [ services, setServices ] = useState<Service[]>(mockServices);
  const [ activeService, setActiveService ] = useState<Service | null>(null);
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);

  const createService = (service: Service) => {
    const newService: Service = { ...service, id: Date.now().toString() };
    setServices(prev => [...prev, newService]);
  };

  const editService = (id: string) => {
    const serviceToEdit = services.find(s => s.id === id);
    if (!serviceToEdit) return;

    setActiveService(serviceToEdit);
    setIsDialogOpen(true);
  };

  const updateService = (updatedService: Service) => {
    setServices(prev =>
      prev.map(s => (s.id === updatedService.id ? updatedService : s))
    );
    setActiveService(null);
  };

  const removeService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const confirmDeleteService = (id: string) => {
    confirm({
      title: 'Удалить услугу?',
      cancelText: 'Отменить',
      confirmText: 'Подтвердить',
      onConfirm: () => removeService(id),
    });
  };

  const handleDialogToggle = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) setActiveService(null);
  };

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <View className="flex-1">
          <CardTitle>Управление услугами</CardTitle>
          <CardDescription>
            Создайте услуги, которые будут доступны для записи.
          </CardDescription>
        </View>

        <ServiceFormDialog
          open={isDialogOpen}
          editingService={activeService}
          onCreate={createService}
          onUpdate={updateService}
          onOpenChange={handleDialogToggle}
        />
      </CardHeader>

      <CardContent className="gap-5">
        {services.length === 0 ? (
          <Card className="border-dashed gap-0">
            <Text className="text-center text-muted-foreground">
              Пока нет созданных услуг
            </Text>
            <View className="flex-row justify-center items-center mt-2">
              <Text variant="muted">Нажмите</Text>
              <Text variant="code" className="px-2 ml-2">
                +
              </Text>
              <Text variant="muted">, чтобы начать</Text>
            </View>
          </Card>
        ) : (
          services.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={() => editService(service.id)}
              onDelete={() => confirmDeleteService(service.id)}
            />
          ))
        )}
      </CardContent>

      {ConfirmDialogElement}
    </Card>
  );
};