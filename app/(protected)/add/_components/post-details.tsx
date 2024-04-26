import { Separator } from "@/components/ui/separator";

export const PostDetails = () => {
  const steps = [
    {
      name: "ძირითადი მახასიათებლები",
      isFinished: false,
    },
    {
      name: "მდებარეობა და განბაჟება",
      isFinished: false,
    },
    {
      name: "ფოტო / ვიდეო",
      isFinished: false,
    },
    {
      name: "ფასი",
      isFinished: false,
    },
    {
      name: "კონტაქტი",
      isFinished: false,
    },
  ];

  return (
    <div className="bg-white rounded-xl w-full lg:w-[24%] p-5 flex flex-col">
      {steps.map((step) => (
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-full border-2 border-gray-200 h-4 w-4 cursor-pointer"></div>
            {step.name !== "კონტაქტი" && (
              <Separator
                className="h-10 w-[0.1rem] my-1"
                orientation="vertical"
              />
            )}
          </div>
          <ul className="text-[0.75rem] text-gray-400 -mt-[0.165rem] cursor-pointer tracking-wide">
            {step.name}
          </ul>
        </div>
      ))}
    </div>
  );
};
