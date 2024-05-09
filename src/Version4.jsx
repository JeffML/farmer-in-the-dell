import { useRef, useEffect } from "react";
import p5 from "p5";
import { characters, relationships } from "./characters";

const doRelations = () => {
    for (let c in characters) characters[c].relations = [];

    const { farmer, wife, child, nurse, cow, dog, cat, mouse, cheese } =
        characters;

    let r = farmer.relations;
    r.married = wife;
    r.owns = cow;
    r.owns = dog;

    r = wife.relations;
    r.married = farmer;
    r.adopts = child;
    r.employs = nurse;

    r = child.relations;
    r.needs = nurse;

    r = nurse.relations;
    r["cares for"] = child;
    r.milks = cow;

    r = dog.relations;
    r.guards = cow;
    r.befriends = cat;

    r = cat.relations;
    r.befriends = dog;
    r.adopts = farmer;
    r.hunts = mouse;

    mouse.relations.eats = cheese;
};

export const Version4 = () => {
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

                for (const c in characters) {
                    const character = characters[c];
                    const [x, y] = character.location;

                    for (const rel in character.relations) {
                        const relation = character.relations[rel]
                        const [x2, y2] = relation.location;
                        p.push()
                        console.log(rel, relationships[rel])
                        p.stroke(relationships[rel])
                        p.line(x, y, x2, y2);
                        p.pop()
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
