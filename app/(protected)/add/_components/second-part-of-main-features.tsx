import { Control } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./post-forms";
import { ToggleGroupField } from "./toggle-group-field";

interface SecondPartOfMainFeaturesProps {
  control: Control<z.infer<typeof formSchema>>;
  errors: any;
}

export const SecondPartOfMainFeatures = ({
  control,
  errors,
}: SecondPartOfMainFeaturesProps) => {
  return (
    <div className="flex flex-col gap-12 px-6 py-6">
      <ToggleGroupField<typeof formSchema>
        control={control}
        name="steeringWheel"
        label="საჭე"
        errors={errors}
        options={[
          { value: "Right", label: "მარჯვენა" },
          { value: "Left", label: "მარცხენა" },
        ]}
      />
      <ToggleGroupField
        control={control}
        name="transmission"
        label="ტრანსმისია"
        errors={errors}
        options={[
          { value: "Manual", label: "მექანიკა" },
          { value: "Automatic", label: "ავტომატიკა" },
          { value: "Tiptronic", label: "ტიპტრონიკი" },
          { value: "Variator", label: "ვარიატორი" },
        ]}
      />
      <ToggleGroupField
        control={control}
        name="fuel"
        label="საწვავის ტიპი"
        errors={errors}
        options={[
          { value: "Gasoline", label: "ბენზინი" },
          { value: "Diesel", label: "დიზელი" },
          { value: "Electric", label: "ელექტრო" },
          { value: "Hybrid", label: "ჰიბრიდი" },
          { value: "RechargeableHybrid", label: "დატენვადი ჰიბრიდი" },
          { value: "LiquidGas", label: "თხევადი გაზი" },
          { value: "NaturalGas", label: "ბუნებრივი გაზი" },
          { value: "Hydrogen", label: "წყალბადი" },
        ]}
      />
      <ToggleGroupField
        control={control}
        name="leadingWheels"
        label="წამყვანი თვლები"
        errors={errors}
        options={[
          { value: "Front", label: "წინა" },
          { value: "Back", label: "უკანა" },
          { value: "Four_Four", label: "4x4" },
        ]}
      />
      <ToggleGroupField
        control={control}
        name="doors"
        label="კარის რაოდენობა"
        errors={errors}
        options={[
          { value: "Two_Three", label: "2/3" },
          { value: "Four_Five", label: "4/5" },
          { value: "Greater_Than_Five", label: ">5" },
        ]}
      />
      <ToggleGroupField
        control={control}
        name="catalyst"
        label="კატალიზატორი"
        errors={errors}
        options={[
          { value: "true", label: "კი" },
          { value: "false", label: "არა" },
        ]}
      />
    </div>
  );
};
