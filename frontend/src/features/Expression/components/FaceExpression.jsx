import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/face.utils";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const expression = detect({ landmarkerRef, videoRef, setExpression });
    console.log(expression);
    onClick(expression);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "300px", borderRadius: "12px" }}
        playsInline
      />
      <h2>{expression}</h2>
      <button
        className="py-3 px-4 bg-green-500 rounded  font-xl text-black"
        onClick={handleClick}
      >
        Detect expression
      </button>
    </div>
  );
}
