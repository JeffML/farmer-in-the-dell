import { useRef, useEffect } from "react";
import p5 from "p5";
import { characters } from "./characters";

const doRelations = () => {
    // for this version, all relations are the same.
    const keys = Object.keys(characters);
    keys.forEach((key, i) => {
        if (i + 1 < keys.length) {
            characters[key].takes = keys[i + 1];
        }
    });
};

export const Version2 = () => {
    const renderRef = useRef();
    doRelations();

    useEffect(() => {
        let remove;

        new p5((p) => {
            remove = p.remove;
            p.setup = () => {
                const r = 250;
                const cr = 40;
                const cast = Object.entries(characters);

                for (const [index, [key]] of Object.entries(cast)) {
                    const character = characters[key];

                    const angle = (character.angle =
                        (p.TWO_PI / Object.keys(characters).length) * index);

                    character.location = [r * p.sin(angle), r * p.cos(angle)];
                }

                p.createCanvas(600, 600).parent(renderRef.current);
                p.background(150);
                //move 0,0 to the center of the canvas
                p.translate(p.width / 2, p.height / 2);
                p.ellipseMode(p.CENTER);
                p.textAlign(p.CENTER, p.CENTER);
                p.textFont("Georgia");

                for (const c in characters) {
                    const character = characters[c];
                    const [x, y] = character.location;

                    if (character.takes) {
                        const taken = characters[character.takes];
                        const [x2, y2] = taken.location;
                        p.line(x, y, x2, y2);
                    }

                    p.ellipse(x, y, cr);
                    p.text(c, x, y);
                }
            };
        });

        return remove;
    });

    return <div id="Version2" ref={renderRef}></div>;
};
