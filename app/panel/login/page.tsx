import LoginForm from "@/components/forms/LoginForm";

type Props = {};

export default async function LoginPage({}: Props) {

  return (
    <div className="flex bg-white min-h-screen text-black justify-center w-full">
      <LoginForm />
    </div>
  );
}
