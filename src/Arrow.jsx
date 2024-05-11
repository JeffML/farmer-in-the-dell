import { useRef, useEffect } from "react";
import p5 from "p5";

function arrowHead(start, vector, p) {
  var norm = p.createVector(vector.x, vector.y);
  norm.normalize();

  p.applyMatrix(
    norm.x, norm.y,
    -norm.y, norm.x,
    vector.x - start.x,
    vector.y - start.y);
  p.triangle(0, 6, 12, 0, 0, -6)

}

export const ArrowTest = () => {
    const renderRef = useRef();
    
    useEffect(() => {
        let remove;
        
        new p5((p) => {
            remove = p.remove;

            p.setup = () => {
                const r =  250
                p.createCanvas(600,600).parent(renderRef.current)
                p.background(150)
                p.translate(p.width/2, p.height/2)
                p.ellipseMode(p.CENTER);

                p.push()
                const angle = 5*p.TWO_PI/3
                const loc = [r*p.sin(angle), r*p.cos(angle)]

                const center = p.createVector(0,0)
                const dest = p.createVector(loc[0], loc[1])
                p.line(0, 0, dest.x, dest.y)

                const X = dest.x - (30 * p.sin(angle))  
                const Y = dest.y - (30 * p.cos(angle))
                const edge = p.createVector(X, Y)
                arrowHead(center, edge, p)

                p.pop()
                p.ellipse(loc[0], loc[1], 40)

            }
        })
        return remove
    })

    return <div id="arrowTest" ref={renderRef}></div>
}