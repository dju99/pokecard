import React, { useEffect, useRef } from "react";
import MouseCoordinate from "../utils/MouseCoordinate";
import "../style/style";

function Header() {
  const Ref = useRef<HTMLDivElement>(null);

  const mouseMoveListener = (e: MouseEvent) => {
    const ref = Ref.current;

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

  const mouseLeaveListener = () => {
    const ref = Ref.current;

    if (!ref) return;

    ref.style.transition = "0.5s ease";

    setTimeout(() => {
      ref.style.transform = "none";
    }, 500);
  };

  useEffect(() => {
    const ref = Ref.current;

    if (!ref) return;

    ref.addEventListener("mousemove", mouseMoveListener);
    ref.addEventListener("mouseleave", mouseLeaveListener);

    return () => {
      ref.removeEventListener("mousemove", mouseMoveListener);
      ref.removeEventListener("mouseleave", mouseLeaveListener);
    };
  }, []);

  return (
    <div className="header">
      <div className="text text--title">Pokemon Holography Card</div>
      <div className="header__container">
        <div style={{ width: "50%", color: "white" }}>
          <div className="text text--large">포켓몬 카드 이미지에</div>
          <div className="text text--large">CSS로 3D 홀로그램을 표현했습니다.</div>
          <div className="text--sm">filter, gradients 등으로 효과를 JavaScript로 움직임을 표현</div>
          <a href="https://github.com/dju99/pokecard" style={{ display: "flex", alignItems: "center" }}>
            <svg style={{ width: "2rem", marginRight: "0.5rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)">
              <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
            </svg>
            <div className="text">Github</div>
          </a>
        </div>
        <div style={{ height: "50px" }} />
        <div style={{ border: "1px solid white" }} />
        <div style={{ height: "50px" }} />
        <div className="text text--large text--bold">Sample / 대각 무지개 광원 효과</div>
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
          <div className="sample" style={{ backgroundImage: `url(https://images.pokemontcg.io/swsh11tg/TG05_hires.png)` }} />
          <div className="text text--title"> + </div>
          <div className="sample rainbow_sample" />
          <div className="text text--title"> = </div>
          <div ref={Ref} className="sample rainbow_sample" style={{ backgroundImage: `url(https://images.pokemontcg.io/swsh11tg/TG05_hires.png)` }} />
        </div>
      </div>
    </div>
  );
}

export default Header;
