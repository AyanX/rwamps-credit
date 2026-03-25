import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const ScrollToTop = ({ children }: Props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // change to "auto" if you don’t want animation
    });
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;