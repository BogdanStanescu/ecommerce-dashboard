import { toast } from "react-toastify";

const useClipboard = (description: string) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Key copied to clipboard!", {
      icon: "📋",
    });
  };

  return onCopy;
};

export default useClipboard;
