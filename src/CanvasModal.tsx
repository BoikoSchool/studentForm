// src/CanvasModal.tsx
import { useRef, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";

interface CanvasModalProps {
  visible: boolean;
  onClose: () => void;
  onRecognize: (text: string) => void;
}

export default function CanvasModal({
  visible,
  onClose,
  onRecognize,
}: CanvasModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.lineCap = "round";
      }
    }
  }, [visible]);

  const startDrawing = (e: any) => {
    setDrawing(true);
    const ctx = canvasRef.current!.getContext("2d")!;
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0].clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0].clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: any) => {
    if (!drawing) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0].clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0].clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => setDrawing(false);

  const handleClear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleRecognize = async () => {
    if (!canvasRef.current) return;
    setLoading(true);
    const dataUrl = canvasRef.current.toDataURL();

    const worker = await createWorker("uk");
    const { data } = await worker.recognize(dataUrl);
    await worker.terminate();

    onRecognize(data.text.trim());
    setLoading(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 10,
          maxWidth: "90%",
          textAlign: "center",
        }}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ border: "1px solid #ccc", marginBottom: 10 }}
        />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={handleClear}>Очистити</button>
          <button onClick={onClose}>Скасувати</button>
          <button onClick={handleRecognize} disabled={loading}>
            {loading ? "Розпізнаю..." : "Розпізнати"}
          </button>
        </div>
      </div>
    </div>
  );
}
