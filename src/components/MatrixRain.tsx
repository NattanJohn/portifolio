"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [boost, setBoost] = useState(false);

  useEffect(() => {
    const handleTrigger = () => {
      setBoost(true);
      setTimeout(() => setBoost(false), 10000);
    };

    window.addEventListener("TERMINAL_MATRIX_TRIGGER", handleTrigger);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    let currentSpeed = 1;
    let colorMix = 0;

    const draw = () => {
      // Efeito de rastro
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const targetSpeed = boost ? 2.5 : 1;
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;

      const targetMix = boost ? 1 : 0;
      colorMix += (targetMix - colorMix) * 0.05;

      ctx.fillStyle = theme.color;
      ctx.globalAlpha = 1 - colorMix;
      ctx.font = fontSize + "px monospace";
      
      drawDrops(ctx, drops, charArray, fontSize, currentSpeed);

      if (colorMix > 0.01) {
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = colorMix;
        drawDrops(ctx, drops, charArray, fontSize, currentSpeed);
      }
      
      ctx.globalAlpha = 1;
    };

    function drawDrops(context: CanvasRenderingContext2D, dropsArr: number[], characters: string[], fSize: number, speed: number) {
      for (let i = 0; i < dropsArr.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        context.fillText(text, i * fSize, dropsArr[i] * fSize);

        if (dropsArr[i] * fSize > context.canvas.height && Math.random() > 0.975) {
          dropsArr[i] = 0;
        }
        dropsArr[i] += speed;
      }
    }

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("TERMINAL_MATRIX_TRIGGER", handleTrigger);
    };
  }, [theme, boost]);

  return (
    <canvas
      ref={canvasRef}
      style={{ 
        opacity: boost ? 0.4 : 0.15,
        transition: "opacity 3s ease-in-out"
      }} 
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
}