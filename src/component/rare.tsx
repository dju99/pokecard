import React, { useEffect, useRef } from "react";
import { rare } from "../utils/card";
import MouseCoordinate from "../utils/MouseCoordinate";

function Rare() {
  const Ref = useRef<(HTMLDivElement | null)[]>([]);

  const mouseMoveListener = (index: number) => (e: MouseEvent) => {
    const ref = Ref.current[index];
    if (!ref) return;

    const rect = ref.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { lp, tp, card_x, card_y } = MouseCoordinate({ x, y });

    ref.style.filter = "saturate(1.5)";
    ref.style.transition = "0s";
    ref.style.setProperty("--bg-position", `${lp}% ${tp}%`);
    ref.style.transform = `perspective(700px) rotateX(${card_x}deg) rotateY(${card_y}deg)`;
  };

  const mouseLeaveListener = (index: number) => () => {
    const ref = Ref.current[index];
    if (!ref) return;

    ref.style.transition = "0.5s ease";
    setTimeout(() => {
      ref.style.transform = "none";
      ref.style.filter = "saturate(1)";
    }, 500);
  };

  useEffect(() => {
    rare.forEach((_, index) => {
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
      <div className="text text--large text--bold">일러스트 배경 파티클 효과</div>
      <div style={{ border: "1px solid white" }} />
      <div style={{ height: "20px" }} />
      <div className="text">기본 광원 효과가 적용됩니다.</div>
      <div className="text">일러스트의 배경에 애니메이션 파티클을 입힙니다.</div>
      <div className="container">
        {rare.map((data, index) => (
          <div
            key={index}
            ref={(e) => {
              Ref.current[index] = e;
            }}
            className="card rare light"
            style={{ backgroundImage: `url(${data.url})` }}
          />
        ))}
      </div>
    </div>
  );
}

export default Rare;
