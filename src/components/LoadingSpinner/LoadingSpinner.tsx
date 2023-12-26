import { Oval } from 'react-loader-spinner';

import { AnimatePresence, motion } from 'framer-motion';

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
      <AnimatePresence>
        {message && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-bold text-center text-loading dark:text-loadingDark"
          >
            {message}
          </motion.h1>
        )}{' '}
      </AnimatePresence>
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
