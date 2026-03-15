import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import s from "./NotFound.module.scss";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className={s.page}>
      <div className={s.content}>
        <h1 className={s.title}>404</h1>
        <p className={s.text}>Oops! Page not found</p>
        <a href="/" className={s.link}>Return to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
