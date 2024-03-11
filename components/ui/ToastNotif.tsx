export const ToastNotif = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      className={`fixed left-1/2 top-10 -translate-x-1/2 bg-white flex w-fit mx-auto border-2 border-green-500 p-6 items-center rounded-lg gap-6 shadow-xl ${
        isLoading
          ? "animate-show-from-top"
          : "animate-unshow-from-top top-[-100%]"
      }`}
    >
      <div>
        <p className="">Modifications en cours ...</p>
      </div>
    </div>
  );
};
