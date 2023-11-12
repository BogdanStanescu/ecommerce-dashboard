import { toast } from "react-toastify";

interface IClipboard {
  data: string;
  label: string;
}

const useClipboard = ({ data, label }: IClipboard) => {
  const onCopy = () => {
    navigator.clipboard.writeText(data);
    toast.info(`${label} copied to clipboard!`);
  };

  return onCopy;
};

export default useClipboard;
