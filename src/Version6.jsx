import { useRef, useEffect } from "react";
import p5 from "p5";
import { characters, relationshipColors, doRelations } from "./characters";

export const Version6 = () => {
    const renderRef = useRef();
    doRelations();

    useEffect(() => {
        let remove;

        new p5((p) => {
            remove = p.remove;
            p.setup = () => {
                const r = 250;
                const dia = 40;
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
                let i = 0;
                for (const c in characters) {
                    const character = characters[c];
                    const [x, y] = character.location;

                    for (const rel in character.relations) {
                        const relation = character.relations[rel];
                        const [x2, y2] = relation.location;
                        p.push();
                        p.stroke(relationshipColors[rel]);

                        const fudge = (v) => ((v*i*3)/40)

                        const nx = x + fudge(x)
                        const ny = y + fudge(y)
                        const nx2 = x2 + fudge(x2)
                        const ny2 = y2 + fudge(y2)

                        i++;

                        const cp1 = [nx / 2, ny / 2];
                        const cp2 = [nx2 / 2, ny2 / 2];

                        p.noFill();
                        p.bezier(x, y, cp1[0], cp1[1], cp2[0], cp2[1], x2, y2);
                        p.pop();
                    }
                }

                for (const c in characters) {
                    const character = characters[c];
                    const [x, y] = character.location;

                    p.ellipse(x, y, dia);
                    p.text(c, x, y);
                }
            };
        });

        return remove;
    });

    return <div id="Version4" ref={renderRef}></div>;
};
