import React, { useRef, ReactNode, useEffect } from "react";
import { useSpring } from "react-spring";
import { clamp } from "@/utils/mathUtils";

interface CardProps {
  supertype?: string;
  subtypes?: string;
  rarity?: string;
  image?: string;
  mask?: string;
  foil?: string;
  number?: string;
  isTrainerGallery?: boolean;
  children?: ReactNode;
  style?: React.CSSProperties;
  setScrollEnabled?: (enabled: boolean) => void;
}

const springConfig = {
  mass: 1,
  tension: 200,
  friction: 5,
  velocity: 0,
  precision: 0.01,
};

const Card: React.FC<CardProps> = ({
  supertype = "",
  subtypes = "",
  rarity = "",
  image,
  mask,
  foil,
  number = "",
  isTrainerGallery = false,
  children,
  style,
  setScrollEnabled,
  ...restProps
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardFrontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardFrontRef.current && cardRef.current && (mask || foil)) {
      const randomSeed = {
        x: Math.random(),
        y: Math.random(),
      };

      const cosmosPosition = {
        x: Math.floor(randomSeed.x * 734),
        y: Math.floor(randomSeed.y * 1280),
      };

      cardFrontRef.current.style.setProperty(
        "--cosmosbg",
        `${cosmosPosition.x}px ${cosmosPosition.y}px`
      );

      if (mask && foil) {
        cardFrontRef.current.style.setProperty(
          "--mask",
          `url(${mask})`,
          "important"
        );
        cardFrontRef.current.style.setProperty(
          "--foil",
          `url(${foil})`,
          "important"
        );
        cardRef.current.style.setProperty("--clip", "none", "important");
        // cardRef.current.style.setProperty("--clip-invert", "none", "important");
        cardRef.current.style.setProperty("--clip-stage", "none", "important");
        // cardRef.current.style.setProperty("--clip-stage-invert", "none", "important");
      }
    }
  }, [mask, foil]);

  const [, setSpringBackground] = useSpring(() => ({
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 },
    config: springConfig,
    onChange: ({ value: { x, y } }) => {
      if (cardRef.current) {
        cardRef.current.style.setProperty("--pos", `${x}% ${y}%`);
        cardRef.current.style.setProperty("--background-x", `${x}%`);
        cardRef.current.style.setProperty("--background-y", `${y}%`);
      }
    },
  }));

  const [, setSpringRotate] = useSpring(() => ({
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 },
    config: springConfig,
    onChange: ({ value: { x, y } }) => {
      if (cardRef.current) {
        cardRef.current.style.setProperty("--rotate-x", `${x}deg`);
        cardRef.current.style.setProperty("--rotate-y", `${y}deg`);
      }
    },
  }));

  const [, setSpringGlare] = useSpring(() => ({
    from: { x: 0, y: 0, o: 0.8 },
    to: { x: 0, y: 0, o: 0.9 },
    config: springConfig,
    onChange: ({ value: { x, y, o } }) => {
      const hyp = Math.min(
        Math.max(Math.sqrt((y - 50) ** 2 + (x - 50) ** 2) / 50, 0),
        1
      );
      const positionFromCenter = clamp(
        Math.sqrt((y - 50) ** 2 + (x - 50) ** 2) / 50,
        0,
        1
      );
      if (cardRef.current) {
        cardRef.current.style.setProperty("--pointer-x", `${x}%`);
        cardRef.current.style.setProperty("--pointer-y", `${y}%`);
        cardRef.current.style.setProperty(
          "--pointer-from-center",
          `${positionFromCenter}`
        );
        cardRef.current.style.setProperty("--card-opacity", `${o}`);
        cardRef.current.style.setProperty("--pointer-from-top", `${y / 100}`);
        cardRef.current.style.setProperty("--pointer-from-left", `${x / 100}`);
      }
    },
  }));

  return (
    <React.Fragment>
      <div
        className={`card ${mask ? "masked" : ""}`}
        data-supertype={supertype}
        data-subtypes={subtypes}
        data-rarity={rarity}
        data-trainer-gallery={isTrainerGallery ? "true" : "false"}
        data-number={number}
        style={style}
      >
        <div className="card__translater" style={style}>
          <div
            ref={cardRef}
            className="card__rotator"
            onTouchStart={(event) => {
              setScrollEnabled && setScrollEnabled(false);
            }}
            onTouchEnd={() => {
              setScrollEnabled && setScrollEnabled(true);
              setTimeout(() => {
                setSpringRotate({ x: 0, y: 0 });
                setSpringGlare({ x: 50, y: 50, o: 0 });
                setSpringBackground({ x: 50, y: 50 });
              }, 100);
            }}
            onMouseEnter={() => {
              if (
                rarity === "custom" &&
                typeof image === "string" &&
                cardRef.current
              ) {
                cardRef.current.style.setProperty(
                  "--customimage",
                  `url(${image})`
                );
              }
            }}
            onTouchMove={(event) => {
              const target = event.target as HTMLDivElement;
              const rect = target.getBoundingClientRect();
              const x = Math.floor(
                (100 / rect.width) * (event.touches[0].clientX - rect.left)
              );
              const y = Math.floor(
                (100 / rect.height) * (event.touches[0].clientY - rect.top)
              );
              const offsetX = x - 50;
              const offsetY = y - 50;

              if (cardRef.current) {
                cardRef.current.style.setProperty("--card-scale", "1");
                cardRef.current.style.setProperty("--translate-x", "0px");
                cardRef.current.style.setProperty("--translate-y", "0px");
              }

              setSpringBackground({
                x: Math.round(50 + x / 4 - 12.5),
                y: Math.round(50 + y / 3 - 16.67),
              });
              setSpringRotate({
                x: Math.floor(-offsetX / 3.5),
                y: Math.floor(offsetY / 2),
              });
              setSpringGlare({ x: Math.round(x), y: Math.round(y), o: 1 });
            }}
            onMouseMove={(event) => {
              const target = event.target as HTMLDivElement;
              const rect = target.getBoundingClientRect();
              const x = Math.floor(
                (100 / rect.width) * (event.clientX - rect.left)
              );
              const y = Math.floor(
                (100 / rect.height) * (event.clientY - rect.top)
              );
              const offsetX = x - 50;
              const offsetY = y - 50;

              if (cardRef.current) {
                cardRef.current.style.setProperty("--card-scale", "1");
                cardRef.current.style.setProperty("--translate-x", "0px");
                cardRef.current.style.setProperty("--translate-y", "0px");
              }

              setSpringBackground({
                x: Math.round(50 + x / 4 - 12.5),
                y: Math.round(50 + y / 3 - 16.67),
              });
              setSpringRotate({
                x: Math.floor(-offsetX / 3.5),
                y: Math.floor(offsetY / 2),
              });
              setSpringGlare({ x: Math.round(x), y: Math.round(y), o: 1 });
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setSpringRotate({ x: 0, y: 0 });
                setSpringGlare({ x: 50, y: 50, o: 0 });
                setSpringBackground({ x: 50, y: 50 });
              }, 100);
            }}
          >
            <div className="card__front" ref={cardFrontRef} {...restProps}>
              {children}
              <div className={`card__shine ${subtypes} ${supertype}`} />
              <div className={`card__glare ${subtypes} ${rarity}`} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
