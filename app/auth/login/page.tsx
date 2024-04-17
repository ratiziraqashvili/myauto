import { Tnet } from "@/components/images/tnet";
import { LoginForm } from "../_components/login-form";
import { Heading } from "@/components/heading";

const LoginPage = () => {
  return (
    <div className="flex flex-col w-[40%]">
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

export default LoginPage;
