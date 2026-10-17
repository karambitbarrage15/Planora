"use client";

import { useEffect, useRef } from "react";

export default function FlowingRedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Wave parameters for luxury flowing crimson beams
    let step = 0;
    const lines = [
      { color: "rgba(229, 9, 20, 0.22)", speed: 0.008, amplitude: 70, wavelength: 0.0018, yOffset: 0.45 },
      { color: "rgba(255, 30, 45, 0.16)", speed: 0.012, amplitude: 95, wavelength: 0.0014, yOffset: 0.52 },
      { color: "rgba(180, 5, 15, 0.25)", speed: 0.006, amplitude: 60, wavelength: 0.0022, yOffset: 0.38 },
      { color: "rgba(229, 9, 20, 0.12)", speed: 0.015, amplitude: 110, wavelength: 0.0012, yOffset: 0.58 }
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step++;

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "rgba(229, 9, 20, 0.4)";
        ctx.shadowBlur = 20;

        for (let x = 0; x <= width; x += 8) {
          const y =
            height * line.yOffset +
            Math.sin(x * line.wavelength + step * line.speed) * line.amplitude +
            Math.cos(x * 0.0008 + step * 0.005) * 30;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="flowingRedCanvas"
    />
  );
}
