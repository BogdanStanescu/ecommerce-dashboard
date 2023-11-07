import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import AuthLayout from "../(auth)/layout";

const SetupPage = () => {
  return (
    <nav className="p-4">
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
};

export default SetupPage;
