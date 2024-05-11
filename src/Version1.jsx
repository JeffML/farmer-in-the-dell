import { useRef, useEffect } from "react";
import p5 from "p5";
import { characters } from "./characters";

export const Version1 = () => {
    const renderRef = useRef();

    useEffect(() => {
        let remove;

        new p5((p) => {
            remove = p.remove;
            p.setup = () => {
                const r = 250;
                const cast = Object.entries(characters);

                for (const [index, [key]] of Object.entries(cast)) {
                    const character = characters[key];
                    character.angle =
                        (p.TWO_PI / Object.keys(characters).length) * index;
                    character.location = [
                        r * p.sin(character.angle),
                        r * p.cos(character.angle),
                    ];
                }

                p.createCanvas(600, 600).parent(renderRef.current);
                p.background(150);
                //move 0,0 to the center of the canvas
                p.translate(p.width / 2, p.height / 2);
                p.ellipseMode(p.CENTER);
                p.textAlign(p.CENTER, p.CENTER);
                p.textFont("Georgia");

                for (const c in characters) {
                    const [x, y] = characters[c].location;
                    p.ellipse(x, y, 40);
                    p.text(c, x, y);
                }
            };
        });

        return remove;
    });

    return <div id="Version1" ref={renderRef}></div>;
};
