import { Oval } from 'react-loader-spinner';

type LoadingSpinnerProps = {
  message?: string;
};

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
  const brightThemeColor = 'rgba(0,0,0,0.4)';
  const highlightColor = '#0598BC';

  const firstColor = highlightColor;
  const secondColor = brightThemeColor;

  return (
    <div className="h-full w-full m-auto flex flex-col justify-center items-center gap-4">
      {message && (
        <h1 className="font-bold text-center text-loading dark:text-loadingDark">
          {message}
        </h1>
      )}{' '}
      <Oval
        height={30}
        width={30}
        color={firstColor}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={secondColor}
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </div>
  );
}
