import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `MANCORSARIC - ${title}`; 
  }, [title]);
};

export default useTitle;