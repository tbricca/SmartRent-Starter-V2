import { useRef, useEffect } from "react";

export const useDocumentTitle = (title: string, retainOnUnmount = false) => {
  const previousTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!retainOnUnmount) {
        // eslint-disable-next-line react-hooks/exhaustive-deps -- False positive due to the use of a ref.
        document.title = previousTitle.current;
      }
    };
  }, [retainOnUnmount]);
};
