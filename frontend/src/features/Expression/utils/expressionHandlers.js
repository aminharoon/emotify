import { detect, init } from "./faceExpression";

function stopResources({ landmarkerRef, streamRef, videoRef }) {
    if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
    }

    if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
    }

    if (videoRef.current?.srcObject) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
    }
}

export function setupExpressionLifecycle({ landmarkerRef, streamRef, videoRef }) {
    let isMounted = true;

    const start = async () => {
        await init({ landmarkerRef, videoRef, streamRef });

        if (!isMounted) {
            stopResources({ landmarkerRef, streamRef, videoRef });
        }
    };

    start();

    return () => {
        isMounted = false;
        stopResources({ landmarkerRef, streamRef, videoRef });
    };
}

export async function handleDetectClick({
    landmarkerRef,
    streamRef,
    videoRef,
    setExpression,
    onClick,
}) {
    if (!landmarkerRef.current || !streamRef.current || !videoRef.current?.srcObject) {
        await init({ landmarkerRef, videoRef, streamRef });
    }

    const expression = detect({ landmarkerRef, videoRef, setExpression });
    if (expression) {
        onClick(expression);
    }
}

export function handleDisableClick({ landmarkerRef, streamRef, videoRef, setExpression }) {
    stopResources({ landmarkerRef, streamRef, videoRef });
    setExpression("Detection stopped");
}
