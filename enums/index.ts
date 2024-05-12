import * as z from "zod";

export const VehicleType = z.enum(["Car", "SpecialVehicle", "Motorcycle"]);
export const RentingType = z.enum(["ForSale", "ForRent"]);
export const LengthUnitType = z.enum(["KM", "MI"]);
export const SteeringWheelType = z.enum(["Right", "Left"], { message: "შეავსე ველი" });
export const TransmissionType = z.enum(
  ["Manual", "Automatic", "Tiptronic", "Variator"],
  { message: "შეავსე ველი" }
);
export const FuelType = z.enum(
  [
    "Gasoline",
    "Diesel",
    "Electric",
    "Hybrid",
    "RechargeableHybrid",
    "LiquidGas",
    "NaturalGas",
    "Hydrogen",
  ],
  { message: "შეავსე ველი" }
);
export const LeadingWheelsType = z.enum(["Front", "Back", "Four_Four"], {
  message: "შეავსე ველი",
});
export const DoorsType = z.enum(["Two_Three", "Four_Five", "Greater_Than_Five"], {
  message: "შეავსე ველი",
});
export const InteriorMaterialType = z.enum(["Piece", "Leather", "ArtificialLeather"], {
  message: "შეავსე ველი",
});
export const CurrencyType = z.enum(["GEL", "USD"], { message: "შეავსე ველი" });