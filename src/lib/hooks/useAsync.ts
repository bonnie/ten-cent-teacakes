import { useEffect } from "react";

// from https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component/60907638#60907638
export function useAsync<PromiseType>(
  asyncFn: () => Promise<PromiseType>,
  onSuccess: (data: PromiseType) => void,
) {
  useEffect(() => {
    let isActive = true;
    asyncFn().then((data) => {
      if (isActive) onSuccess(data);
    });
    return () => {
      isActive = false;
    };
  }, [asyncFn, onSuccess]);
}
