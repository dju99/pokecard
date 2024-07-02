import React, { useEffect, useRef } from "react";
import { gx } from "../utils/card";

function GX() {
  const Ref = useRef<(HTMLDivElement | null)[]>([]);

  const mouseMoveListener = (index: number) => (e: MouseEvent) => {
    const ref = Ref.current[index];

    if (!ref) return;
    const rect = ref.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    var px = Math.abs(Math.floor((100 / 300) * x) - 100);
    var py = Math.abs(Math.floor((100 / 412.5) * y) - 100);
    var lp = 50 + (px - 50) / 1.5;
    var tp = 50 + (py - 50) / 1.5;

    const Xdeg = (10 / 103) * y - 20;
    const Ydeg = (-2 / 15) * x + 20;

    ref.style.transition = "0s";
    ref.style.setProperty("--bg-position", `${lp}% ${tp}%`);
    ref.style.transform = `perspective(700px) rotateX(${Xdeg}deg) rotateY(${Ydeg}deg)`;
  };

  const mouseLeaveListener = (index: number) => () => {
    const ref = Ref.current[index];

    if (!ref) return;
    ref.style.transition = "0.5s ease";

    setTimeout(() => {
      ref.style.transform = "none";
    }, 500);
  };

  useEffect(() => {
    gx.forEach((_, index) => {
      const ref = Ref.current[index];
      if (!ref) return;

      const onMouseMove = mouseMoveListener(index);
      const onMouseLeave = mouseLeaveListener(index);

      ref.addEventListener("mousemove", onMouseMove);
      ref.addEventListener("mouseleave", onMouseLeave);

      return () => {
        ref.removeEventListener("mousemove", onMouseMove);
        ref.removeEventListener("mouseleave", onMouseLeave);
      };
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="text text--large text--bold">배경 파티클 @ 홀로그램 효과</div>
      <div style={{ border: "1px solid white" }} />
      <div style={{ height: "20px" }} />
      <div className="text">빛나는 테두리를 적용합니다.</div>
      <div className="text">옅은 파티클과 홀로그램, 대각 그라데이션 광원 효과를 적용됩니다.</div>
      <div className="container" style={{ justifyContent: "space-evenly" }}>
        {gx.map((data, index) => (
          <div
            key={index}
            ref={(e) => {
              Ref.current[index] = e;
            }}
            className="card gx"
            style={{ backgroundImage: `url(${data.url})` }}
          />
        ))}
      </div>
    </div>
  );
}

export default GX;
