import ButtonBusy from '../LoadingSpinner/ButtonBusy';

type AdminLoginFormProps = {
  handleLoginSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
};

export default function AdminLoginForm({
  handleLoginSubmit,
  isSubmitting,
}: AdminLoginFormProps) {
  const UsernameInputContent = (
    <div className="relative z-0">
      <input
        required
        autoComplete="off"
        id="username"
        name="username"
        type="text"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
        placeholder=" "
      />
      <label
        htmlFor="username"
        className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Username
      </label>
    </div>
  );

  const PasswordInputContent = (
    <div className="relative z-0">
      <input
        required
        autoComplete="off"
        id="password"
        name="password"
        type="password"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cPink peer"
        placeholder=" "
      />
      <label
        htmlFor="password"
        className="absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cPink peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Password
      </label>
    </div>
  );

  const BusyButtonContent = <ButtonBusy />;

  const NormalButtonContent = (
    <span className="z-10 relative w-full flex justify-center items-center p-2 md:p-4 text-sm md:text-lg">
      <span className="transition-all duration-300">Login</span>
    </span>
  );

  return (
    <div className="w-full">
      <div>
        <h1 className="md:text-2xl font-semibold">Admin Login</h1>
      </div>
      <form
        action=""
        method="POST"
        onSubmit={handleLoginSubmit}
        className="divide-y divide-gray-200"
      >
        <div className="py-2 md:py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          {UsernameInputContent}
          {PasswordInputContent}
          <div className="flex w-full">
            <button
              disabled={isSubmitting}
              className={`relative overflow-hidden w-full bg-sky-700 text-white text-lg md:text-xl font-bold rounded transition duration-500 ease-in-out ${
                isSubmitting
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'hover:bg-sky-600'
              }`}
            >
              {isSubmitting ? BusyButtonContent : NormalButtonContent}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
