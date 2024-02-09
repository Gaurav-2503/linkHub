import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";

const page = () => {
  return (
    <div>
      <div className=" border p-4 max-w-xs mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
            Sign in
        </h1>


        <p className="text-center mb-6 text-gray-500">
          Sign in by using one of the methods below
        </p>

        <LoginWithGoogle />
       
      </div>
    </div>
  );
}

export default page