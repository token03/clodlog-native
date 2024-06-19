import React, { useRef, ReactNode } from "react";
import { useSpring } from "@react-spring/web";
import {Rarity} from "../../types/CardTypes";

interface CardProps {
  supertype?: string;
  subtype?: string;
  rarity?: Rarity;
  image?: string;
  dataGallery?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}

const springConfig = {
  mass: 1,
  tension: 170,
  friction: 18,
  velocity: 0,
  precision: 0.01
};

const Card: React.FC<CardProps> = ({
                                     supertype = "pokémon",
                                     subtype = "basic",
                                     rarity = "common",
                                     image,
                                     dataGallery = "false",
                                     children,
                                     style,
                                     ...restProps
                                   }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [, setSpringBackground] = useSpring(() => ({
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 },
    config: springConfig,
    onChange: ({ value: { x, y } }) => {
      if (cardRef.current) {
        cardRef.current.style.setProperty("--pos", `${x}% ${y}%`);
        cardRef.current.style.setProperty("--posx", `${x}%`);
        cardRef.current.style.setProperty("--posy", `${y}%`);
      }
    }
  }));

  const [, setSpringRotate] = useSpring(() => ({
    from: { x: 0, y: 0 },
    to: { x: 0, y: 0 },
    config: springConfig,
    onChange: ({ value: { x, y } }) => {
      if (cardRef.current) {
        cardRef.current.style.setProperty("--rx", `${x}deg`);
        cardRef.current.style.setProperty("--ry", `${y}deg`);
      }
    }
  }));


  const [, setSpringGlare] = useSpring(() => ({
    from: { x: 0, y: 0, o: 1 },
    to: { x: 0, y: 0, o: 1 },
    config: springConfig,
    onChange: ({ value: { x, y, o } }) => {
      const hyp = Math.min(Math.max(Math.sqrt((y - 50) ** 2 + (x - 50) ** 2) / 50, 0), 1);
      if (cardRef.current) {
        cardRef.current.style.setProperty("--mx", `${x}%`);
        cardRef.current.style.setProperty("--my", `${y}%`);
        cardRef.current.style.setProperty("--o", `${o}`);
        cardRef.current.style.setProperty("--hyp", `${hyp}`);
      }
    }
  }));

  return (
    <React.Fragment>
      <div
        className="card"
        data-supertype={supertype}
        data-subtypes={subtype}
        data-rarity={rarity}
        data-gallery={dataGallery}
        style={style}
      >
        <div className="card__translater"
             style={style}>
          <div
            ref={cardRef}
            className="card__rotator"
            onMouseEnter={() => {
              if (rarity === "custom" && typeof image === "string" && cardRef.current) {
                cardRef.current.style.setProperty("--customimage", `url(${image})`);
              }
            }}
            onMouseMove={(event) => {
              const target = event.target as HTMLDivElement;
              const rect = target.getBoundingClientRect();
              const x = Math.floor((100 / rect.width) * (event.clientX - rect.left));
              const y = Math.floor((100 / rect.height) * (event.clientY - rect.top));
              const offsetX = x - 50;
              const offsetY = y - 50;

              if (cardRef.current) {
                cardRef.current.style.setProperty("--s", "1");
                cardRef.current.style.setProperty("--tx", "0px");
                cardRef.current.style.setProperty("--ty", "0px");
              }

              setSpringBackground({ x: Math.round(50 + x / 4 - 12.5), y: Math.round(50 + y / 3 - 16.67) });
              setSpringRotate({ x: Math.floor(-offsetX / 3.5), y: Math.floor(offsetY / 2) });
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
            <div className="card__front" {...restProps}>
              {children}
            </div>
            <div className={`card__shine ${subtype} ${supertype}`} />
            <div className={`card__glare ${subtype} ${rarity}`} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
