import Meta from "../components/Meta";
import RegisterForm from "../components/RegisterForm";

const RegisterScreen = () => {
  return (
    <div className="container max-w-[28rem] mx-auto flex justify-center items-center h-[800px]">
      <Meta title={'Ecommerce - Register'}/>
      <RegisterForm />
    </div>
  );
};

export default RegisterScreen;
