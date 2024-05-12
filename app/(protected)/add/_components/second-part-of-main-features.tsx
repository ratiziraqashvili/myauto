import { Control } from "react-hook-form";
import * as z from "zod";
import { SelectedOptionType } from "./post-forms";
import { ToggleGroupField } from "./toggle-group-field";
import { carPostSchema } from "@/schemas";

interface SecondPartOfMainFeaturesProps {
  control: Control<z.infer<typeof carPostSchema>>;
  errors: any;
  selectedOption: SelectedOptionType;
  isPending: boolean;
}

export const SecondPartOfMainFeatures = ({
  control,
  errors,
  selectedOption,
  isPending,
}: SecondPartOfMainFeaturesProps) => {
  return (
    <div className="flex flex-col gap-10 px-6 py-6 border-b">
      {selectedOption === "Car" && (
        <ToggleGroupField<typeof carPostSchema>
          control={control}
          name="steeringWheel"
          label="საჭე"
          errors={errors}
          options={[
            { value: "Right", label: "მარჯვენა" },
            { value: "Left", label: "მარცხენა" },
          ]}
          isPending={isPending}
        />
      )}
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
        isPending={isPending}
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
        isPending={isPending}
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
        isPending={isPending}
      />
      {selectedOption !== "Motorcycle" && (
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
          isPending={isPending}
        />
      )}
      {selectedOption === "Car" && (
        <ToggleGroupField
          control={control}
          name="catalyst"
          label="კატალიზატორი"
          errors={errors}
          options={[
            { value: "true", label: "კი" },
            { value: "false", label: "არა" },
          ]}
          isPending={isPending}
        />
      )}
      <ToggleGroupField
        control={control}
        name="color"
        label="ავტომობილის ფერი"
        errors={errors}
        options={[
          { value: "White", label: "თეთრი", color: "#ffffff" },
          { value: "Black", label: "შავი", color: "#000000" },
          { value: "Silver", label: "ვერცხლისფერი", color: "#e0e0e0" },
          { value: "Grey", label: "რუხი", color: "#7f7f7f" },
          { value: "Red", label: "წითელი", color: "#eb4137" },
          { value: "Blue", label: "ლურჯი", color: "#3b8aff" },
          { value: "Yellow", label: "ყვითელი", color: "#f4d053" },
          { value: "Green", label: "მწვანე", color: "#1bac18" },
          { value: "Orange", label: "ნარინჯისფერი", color: "#ff7a29" },
          { value: "Gold", label: "ოქროსფერი", color: "#d4af37" },
          { value: "Purple", label: "იისფერი", color: "#8c3bf0" },
          { value: "Pink", label: "ვარდისფერი", color: "#ec6cc8" },
          { value: "Beige", label: "ჩალისფერი", color: "#ede1d3" },
          { value: "Burgundy", label: "შინდისფერი", color: "#990000" },
          { value: "SkyBlue", label: "ცისფერი", color: "#a2d2ff" },
          { value: "Brown", label: "ყავისფერი", color: "#926644" },
        ]}
        isPending={isPending}
      />
      <div className="space-y-6">
        {selectedOption === "Car" && (
          <>
            <ToggleGroupField
              control={control}
              name="interiorMaterial"
              label="სალონის მასალა და ფერი"
              errors={errors}
              options={[
                { value: "Piece", label: "ნაჭერი" },
                { value: "Leather", label: "ტყავი" },
                { value: "ArtificialLeather", label: "ხელოვნური ტყავი" },
              ]}
              isPending={isPending}
            />
            <ToggleGroupField
              control={control}
              name="interiorMaterialColor"
              label=""
              errors={errors}
              options={[
                { value: "Black", label: "შავი", color: "#000000" },
                { value: "White", label: "თეთრი", color: "#ffffff" },
                { value: "Grey", label: "რუხი", color: "#7f7f7f" },
                { value: "Brown", label: "ყავისფერი", color: "#926644" },
                { value: "Beige", label: "ჩალისფერი", color: "#ede1d3" },
                { value: "Red", label: "წითელი", color: "#eb4137" },
                { value: "Blue", label: "ლურჯი", color: "#3b8aff" },
                { value: "Yellow", label: "ყვითელი", color: "#f4d053" },
                { value: "Orange", label: "ნარინჯისფერი", color: "#ff7a29" },
                { value: "Burgundy", label: "შინდისფერი", color: "#990000" },
                { value: "Gold", label: "ოქროსფერი", color: "#d4af37" },
              ]}
              isPending={isPending}
            />
          </>
        )}
        {selectedOption !== "SpecialVehicle" &&
          (selectedOption === "Car" ? (
            <ToggleGroupField
              control={control}
              name="additionalParameters"
              label="დამატებითი პარამეტრები"
              errors={errors}
              options={[
                { value: "ჰიდრავლიკა", label: "ჰიდრავლიკა" },
                { value: "ბორტკომპიუტერი", label: "ბორტკომპიუტერი" },
                { value: "კონდიციონერი", label: "კონდიციონერი" },
                { value: "პარკინგკონტროლი", label: "პარკინგკონტროლი" },
                { value: "უკანა ხედვის კამერა", label: "უკანა ხედვის კამერა" },
                { value: "ელექტრო შუშები", label: "ელექტრო შუშები" },
                { value: "კლიმატკონტროლი", label: "კლიმატკონტროლი" },
                { value: "კრუიზ-კონტროლი", label: "კრუიზ-კონტროლი" },
                { value: "Start/Stop სისტემა", label: "Start/Stop სისტემა" },
                { value: "ლუქი", label: "ლუქი" },
                { value: "სავარძლის გათბობა", label: "სავარძლის გათბობა" },
                {
                  value: "სავარძლის მეხსიერება",
                  label: "სავარძლის მეხსიერება",
                },
                { value: "ABS", label: "ABS" },
                {
                  value: "მოცურების საწინააღმდეგო სისტემა",
                  label: "მოცურების საწინააღმდეგო სისტემა",
                },
                { value: "ცენტრალური საკეტი", label: "ცენტრალური საკეტი" },
                { value: "სიგნალიზაცია", label: "სიგნალიზაცია" },
                { value: "სანისლე ფარები", label: "სანისლე ფარები" },
                {
                  value: "მონიტორი (ნავიგაცია)",
                  label: "მონიტორი (ნავიგაცია)",
                },
                { value: "AUX", label: "AUX" },
                { value: "Bluetooth", label: "Bluetooth" },
                { value: "მულტი საჭე", label: "მულტი საჭე" },
                { value: "დისკები", label: "დისკები" },
                { value: "სათადარიგო საბურავი", label: "სათადარიგო საბურავი" },
                { value: "სსმპ ადაპტირებული", label: "სსმპ ადაპტირებული" },
              ]}
              type="multiple"
              isPending={isPending}
            />
          ) : (
            <ToggleGroupField
              control={control}
              name="additionalParameters"
              label="დამატებითი პარამეტრები"
              errors={errors}
              options={[
                { value: "საქარე მინა", label: "საქარე მინა" },
                { value: "საბარგული", label: "საბარგული" },
                { value: "ელექტრო სტარტერი", label: "ელექტრო სტარტერი" },
              ]}
              type="multiple"
              isPending={isPending}
            />
          ))}
      </div>
    </div>
  );
};
