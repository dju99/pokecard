import React, { useEffect, useRef } from "react";
import MouseCoordinate from "../utils/MouseCoordinate";
import { rainbow } from "../utils/card";

function Rainbow() {
  const Ref = useRef<(HTMLDivElement | null)[]>([]);

  const mouseMoveListener = (index: number) => (e: MouseEvent) => {
    const ref = Ref.current[index];

    if (!ref) return;

    const rect = ref.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { lp, tp, card_x, card_y } = MouseCoordinate({ x, y });

    ref.style.transition = "0s";
    ref.style.setProperty("--bg-position", `${lp}% ${tp}%`);
    ref.style.setProperty("--background-y", `${lp}%`);
    ref.style.setProperty("--background-x", `${tp}%`);
    ref.style.transform = `perspective(700px) rotateX(${card_x}deg) rotateY(${card_y}deg)`;
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
    rainbow.forEach((_, index) => {
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
      <div className="text text--large text--bold">대각 무지개 광원 효과</div>
      <div style={{ border: "1px solid white" }} />
      <div style={{ height: "20px" }} />
      <div className="text">대각선 광원 효과가 적용됩니다.</div>
      <div className="text">광원이 비추는 곳에 무지개 그라데이션 효과가 나타납니다.</div>
      <div className="container">
        {rainbow.map((data, index) => (
          <div
            key={index}
            ref={(e) => {
              Ref.current[index] = e;
            }}
            className="card rainbow"
            style={{ backgroundImage: `url(${data.url})` }}
          />
        ))}
      </div>
    </div>
  );
}

export default Rainbow;
