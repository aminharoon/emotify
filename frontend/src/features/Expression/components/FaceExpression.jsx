import { useEffect, useRef, useState } from "react";
import {
  handleDetectClick,
  handleDisableClick,
  setupExpressionLifecycle,
} from "../utils/expressionHandlers";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    return setupExpressionLifecycle({ landmarkerRef, streamRef, videoRef });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "12px" }}
        playsInline
      />
      <h2 className="text-2xl font-bold   ">{expression}</h2>
      <button
        className="bg-green-500 py-2 px-3 rounded  text-black text-xl font-bold"
        onClick={() =>
          handleDetectClick({
            landmarkerRef,
            streamRef,
            videoRef,
            setExpression,
            onClick,
          })
        }
      >
        Detect expression
      </button>
      <button
        className="bg-red-500 py-2 px-3 rounded  text-black text-xl font-bold ml-3"
        onClick={() =>
          handleDisableClick({
            landmarkerRef,
            streamRef,
            videoRef,
            setExpression,
          })
        }
      >
        stop Detect
      </button>
    </div>
  );
}
