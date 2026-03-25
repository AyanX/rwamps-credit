import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "1.5rem",
        background: "hsl(45, 30%, 96%)",
      }}
    >
      <img
        src="https://ik.imagekit.io/59p9lo9mv/rwamps%20finance/ll.png"
        alt="Rwamps Credit Finance"
        style={{ width: "80px", height: "80px", borderRadius: "50%" }}
      />
      <PuffLoader color="hsl(145, 63%, 32%)" size={60} />
      <p
        style={{
          color: "hsl(210, 30%, 15%)",
          fontFamily: "Poppins, sans-serif",
          fontSize: "0.875rem",
        }}
      >
        Loading...
      </p>
    </div>
  );
}
