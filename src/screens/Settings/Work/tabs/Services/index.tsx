import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useConfirm } from '@/hooks/useConfirm';
import { services as servicesTestData } from '@/screens/test-store';
import { FC, useEffect, useState } from "react";
import { View } from 'react-native';
import { ServiceCard } from './components/ServiceCard';
import { ServiceFormDialog } from './components/ServiceFormDialog';
import { Service } from './Services.types';

export const ServiceManager: FC = () => {
  const { confirm, ConfirmDialogElement } = useConfirm();
  const [ services, setServices ] = useState<Service[]>([]);
  const [ editingService, setEditingService ] = useState<Service | null>(null);
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);

  useEffect(
    () => {
      setServices(servicesTestData)
    },
    [],
  );

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddPress = (service: Service) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
    };
    
    setServices([...services, newService]);
  }

  const handleEditPress = (id: string) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      setEditingService(service);
      setIsDialogOpen(true);
    }
  };

  const handleUpdatePress = (updatedService: Service) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
    setEditingService(null);
  };

  const handleDeletePress = (id: string) => {
    confirm({
      title: "Удалить услугу?",
      cancelText: "Отменить",
      confirmText: "Подтвердить",
      onConfirm: () => deleteService(id),
    });
  }

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingService(null);
    }
  };

  return (
    <Card>
      <CardHeader className='flex-row justify-between'>
        <View className='flex-1'>
          <CardTitle>Управление услугами</CardTitle>
          <CardDescription>
            Создайте услуги, которые будут доступны для записи.
          </CardDescription>
        </View>
        <ServiceFormDialog
          onAddPress={handleAddPress}
          editingService={editingService}
          onUpdatePress={handleUpdatePress}
          open={isDialogOpen}
          onOpenChange={handleDialogOpenChange}
        />
      </CardHeader>
      <CardContent className='gap-5'>
        {services.length === 0 ? (
          <View>
            <Text className="text-center text-muted-foreground">Пока нет созданных услуг</Text>
            <View className="flex-row justify-center items-center">
              <Text variant='muted' className="text-center text-muted-foreground">Нажмите</Text>
              <Text variant='code' className='px-2 ml-2'>+</Text>
              <Text variant='muted' className="text-center text-muted-foreground">, чтобы начать</Text>
            </View>
          </View>
        ) : (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={(id: string) => handleEditPress(id)}
              onDelete={handleDeletePress}
            />
          ))
        )}
      </CardContent>

      {ConfirmDialogElement}
    </Card>
  );
};