import LoginForm from "../components/LoginForm";
import Meta from "../components/Meta";

const LoginScreen = () => {
  return (
    <div className="container max-w-[28rem] mx-auto flex justify-center items-center h-[800px]">
      <Meta title={'Ecommerce -Login'}/>
      <LoginForm />
    </div>
  );
};

export default LoginScreen;
