"use client"
/* eslint-disable @next/next/no-img-element */

import GSAP from "gsap";
import { useGSAP } from "@gsap/react";

import img01 from "./src/img01.png";
import img02 from "./src/img02.png";
import img03 from "./src/img03.png";
import img04 from "./src/img04.png";
import img05 from "./src/img05.png";

const IMAGES = [img01, img02, img03, img04, img05];
const IMG_CLASS = "img w-[14vw] max-w-[140px] aspect-3/4 object-cover will-change-transform object-top";

function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between items-start px-5 md:px-10 pt-4 md:pt-6">
      <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium text-[#2A3428]">
        Alexandra Beaumont
      </span>
      <div className="flex gap-4 md:gap-6">
        {["Work", "About", "Contact"].map((item) => (
          <span
            key={item}
            className="text-[10px] md:text-xs tracking-[0.2em] uppercase cursor-pointer text-[#2A3428]"
          >
            {item}
          </span>
        ))}
      </div>
    </nav>
  );
}

function HeroText() {
  return (
    <div className="absolute inset-0 z-8 flex flex-col items-center justify-end pb-[1.5vh] md:pb-[2.5vh] pointer-events-none">
      <div className="w-fit h-fit overflow-hidden pb-0.5 md:pb-1">
        <h1 className="reveal-text font-(family-name:--font-display) uppercase text-[14vw] md:text-[12vw] leading-none tracking-[0.06em] text-center text-[#1C2418]">
          Alexandra
        </h1>
      </div>
      <div className="w-fit h-fit overflow-hidden pb-0.5 md:pb-1">
        <h1 className="reveal-text font-(family-name:--font-display) uppercase text-[12vw] md:text-[10vw] leading-none tracking-[0.06em] text-center text-[#1C2418]/35">
          Beaumont
        </h1>
      </div>
    </div>
  );
}

function ImageGallery() {
  const [first, second, hero, fourth, fifth] = IMAGES;
  return (
    <div className="image-container relative z-10 flex w-[90%] justify-center items-center h-full">
      <img src={first.src} alt="Portrait 1" className={`${IMG_CLASS} img-overlay hidden md:block`} />
      <img src={second.src} alt="Portrait 2" className={`${IMG_CLASS} img-overlay`} />
      <img src={hero.src} alt="Portrait 3" className={`${IMG_CLASS} hero-img`} />
      <img src={fourth.src} alt="Portrait 4" className={`${IMG_CLASS} img-overlay`} />
      <img src={fifth.src} alt="Portrait 5" className={`${IMG_CLASS} img-overlay hidden md:block`} />
    </div>
  );
}

export default function Hank() {
  useGSAP(() => {
    const mm = GSAP.matchMedia();

    const runAnimation = (isMobile: boolean) => {
      const container = document.querySelector(".image-container") as HTMLElement;
      const hero = document.querySelector(".hero-img") as HTMLElement;
      const all = GSAP.utils.toArray<HTMLElement>(".img").filter((el) => el.offsetWidth > 0);
      const overlays = GSAP.utils.toArray<HTMLElement>(".img-overlay").filter((el) => el.offsetWidth > 0);
      const bg = document.querySelector(".overlay") as HTMLElement;

      if (!container || !hero || !all.length) return;

      const w = all[0].clientWidth;
      const vw = window.innerWidth;
      const heroWidth = isMobile ? vw * 0.8 : vw * 0.25;
      const gap = (container.clientWidth - all.length * w) / (all.length - 1);

      GSAP.set(container, { gap: `${Math.max(0, gap)}px` });
      GSAP.set(all, { y: 60, opacity: 0, clipPath: "inset(0% 0% 0% 0%)" });
      GSAP.set(".reveal-text", { yPercent: 120 });

      GSAP.timeline({ defaults: { ease: "power3.inOut" } })
        .to(all, { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.08 })
        .to(container, { gap: `${w * 0.4}px`, duration: 1.2 }, "+=0.6")
        .to(all, { scale: 1.2, duration: 1.2 }, "<")
        .to(overlays, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, stagger: 0.06 }, "+=0.6")
        .to(hero, { width: heroWidth, maxWidth: "none", scale: 1, duration: 1.6, ease: "power4.inOut" }, "-=0.3")
        .to(bg, { scaleY: 0, transformOrigin: "top center", duration: 1, ease: "power4.inOut" }, "-=0.8")
        .to(".reveal-text", { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.1 }, "-=0.6");
    };

    mm.add("(min-width: 768px)", () => runAnimation(false));
    mm.add("(max-width: 767px)", () => runAnimation(true));

    return () => mm.revert();
  });

  return (
    <div className="bg-[linear-gradient(to_top,#BEC430,#FAFAF5)] h-dvh w-dvw relative overflow-hidden flex justify-center items-center">
      <div className="overlay inset-0 absolute bg-[#111] z-5" />
      <Nav />
      <HeroText />
      <ImageGallery />
    </div>
  );
}
