import { Tnet } from "@/components/images/tnet";
import { LoginForm } from "../_components/login-form";
import { Heading } from "@/components/heading";

const RegisterPage = () => {
  return (
    <div className="flex flex-col w-full md:w-[60%] lg:w-[40%] md:px-0 px-5">
      <div>
        <Tnet />
      </div>
      <div className="py-10">
        <Heading label="ავტორიზაცია" />
      </div>
      <LoginForm />
    </div>
  );
};

export default RegisterPage;
