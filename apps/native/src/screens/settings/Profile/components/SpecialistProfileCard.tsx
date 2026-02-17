import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectField, SelectValueProps } from "@/components/ui/select-field";
import { Separator } from "@/components/ui/separator";
import { useContentInsets } from "@/hooks/useContentInsets";
import { getSpecialistForm } from "@/screens/settings/Profile/components/SpecialistForms";
import { FC } from "react";

const ACTIVITY_OPTIONS = [
  { label: "Инструктор по вождению", value: "driving_instructor" },
  { label: "Другое", value: "other" },
];

export const SpecialistProfileCard: FC<SelectValueProps> = ({
  value,
  onValueChange,
}) => {
  const contentInsets = useContentInsets();
  const SpecialistForm = value ? getSpecialistForm(value.value) : null;

  return (
    <Card className="m-5">
      <CardHeader>
        <CardTitle>Специализация</CardTitle>
        <CardDescription>
          Выберите вид деятельности и заполните необходимые поля.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-6">
        <SelectField
          nativeID="activity"
          label="Вид деятельности"
          value={value}
          onValueChange={onValueChange}
          placeholder="Выберите вид деятельности"
          options={ACTIVITY_OPTIONS}
          groupLabel="Деятельность"
          contentInsets={contentInsets}
        />

        {SpecialistForm && (
          <>
            <Separator />
            <SpecialistForm />
          </>
        )}
      </CardContent>
    </Card>
  );
};
