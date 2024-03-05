import { useErrorProvider } from "@/providers/ErrorProvider";
import { Button } from ".";

export const ToastError = ({
  message,
  statusCode,
}: {
  message: string;
  statusCode: number;
}) => {
  const { eraseError, isClosing } = useErrorProvider();

  return (
    <div
      className={`fixed top-10 left-1/2 -translate-x-1/2 bg-white flex w-[75%] mx-auto border-2 border-red-500 p-6 items-center rounded-lg gap-6 shadow-xl ${
        isClosing ? "animate-unshow-from-top" : "animate-show-from-top"
      }`}
    >
      <Button onClick={eraseError} variant={"ghost"} className="fill-red-500">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 8L8 14M8 8L14 14M6.86 1H15.14L21 6.86V15.14L15.14 21H6.86L1 15.14V6.86L6.86 1Z"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <div>
        <h1 className="font-bold text-2xl">{statusCode}</h1>
        <p className="">{message}</p>
      </div>
    </div>
  );
};
