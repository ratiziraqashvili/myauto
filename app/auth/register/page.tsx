import { Tnet } from "@/components/images/tnet";
import { Heading } from "@/components/heading";
import { RegisterForm } from "../_components/register-form";

const LoginPage = () => {
  return (
    <div className="flex flex-col w-full md:w-[60%] lg:w-[40%] md:px-0 px-5">
      <div>
        <Tnet />
      </div>
      <div className="py-10">
        <Heading label="ანგარიშის შექმნა" />
      </div>
      <RegisterForm />
    </div>
  );
};

export default LoginPage;
