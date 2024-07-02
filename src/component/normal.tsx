import React, { useEffect, useRef } from "react";
import MouseCoordinate from "../utils/MouseCoordinate";
import { common } from "../utils/card";

function Normal() {
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
    common.forEach((_, index) => {
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
      <div className="text text--large text--bold">기본 광원 효과</div>
      <div style={{ border: "1px solid white" }} />
      <div style={{ height: "20px" }} />
      <div className="text">기본적으로 카드들은 마우스 포인터를 따라 회전합니다.</div>
      <div className="text">마우스 포인터를 따라 움직이는 광원입니다.</div>
      <div className="container">
        {common.map((data, index) => (
          <div
            key={index}
            ref={(e) => {
              Ref.current[index] = e;
            }}
            className="card light"
            style={{ backgroundImage: `url(${data.url})` }}
          />
        ))}
      </div>
    </div>
  );
}

export default Normal;
