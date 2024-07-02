import React, { useEffect, useRef } from "react";
import { vmax } from "../utils/card";
import MouseCoordinate from "../utils/MouseCoordinate";

function Vmax() {
  const Ref = useRef<(HTMLDivElement | null)[]>([]);

  const mouseMoveListener = (index: number) => (e: MouseEvent) => {
    const ref = Ref.current[index];
    if (!ref) return;

    const rect = ref.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const { lp, tp, card_x, card_y } = MouseCoordinate({ x, y });

    ref.style.transition = "0s";
    ref.style.setProperty("--vmax--bg-position", `${tp / 4}% ${lp / 4}%`);
    ref.style.setProperty("--bg-position", `${lp}% ${tp}%`);
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
    vmax.forEach((_, index) => {
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
      <div className="text text--large text--bold">역방향 배경 파티클 효과</div>
      <div style={{ border: "1px solid white" }} />
      <div style={{ height: "20px" }} />
      <div className="text">카드 전체에 애니메이션 파티클이 적용됩니다.</div>
      <div className="text">광원과 파티클은 서로 역방향으로 움직입니다.</div>
      <div className="container">
        {vmax.map((data, index) => (
          <div
            key={index}
            ref={(e) => {
              Ref.current[index] = e;
            }}
            className="card vmax light"
            style={{ backgroundImage: `url(${data.url})` }}
          />
        ))}
      </div>
    </div>
  );
}

export default Vmax;
