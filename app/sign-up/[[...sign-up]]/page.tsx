import { SignUp } from "@clerk/nextjs";

const SignUpComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp 
        routing="hash"
        signInUrl="/sign-in"
        forceRedirectUrl="/"
        fallbackRedirectUrl="/"
      />
    </div>
  );
};

export default SignUpComponent;