import { useState } from "react";

/**
 * React hook responsible for managing MUI snackbars
 * @param config
 * * duration: the amount of time in mmili-seconds the timer should wait before resetting the display state
 * @returns
 * * displayState: The current display state
 * * triggerDisplay: Function responsible for triggering the display
 * * triggerClose: Function responsible for hiding the snackbar
 */
const useSnackbarAlert = (config?: {
  duration: number;
}): {
  displayState: boolean;
  triggerDisplay: Function;
  triggerClose: Function;
} => {
  const [displayState, setDisplayState] = useState(false);
  const triggerDisplay = () => {
    setDisplayState(true);

    setTimeout(() => setDisplayState(false), config?.duration || 1000);
  };

  const triggerClose = () => setDisplayState(false);

  return {
    displayState,
    triggerDisplay,
    triggerClose,
  };
};

export default useSnackbarAlert;
