import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Display } from "./Display";
import { versions } from "./versions";

function App() {
    const [viz, setViz] = useState("");
    const handler = ({ target }) => {
        setViz(target.value);
    };
    const v1 = useRef(null);

    const body = (
        <>
            <div className="parent">
                <h2 className="div1">The farmer in the dell</h2>
                <div className="div2">
                    {Object.keys(versions).map((k, i) => (
                        <div key={k}>
                            <label>
                                <input
                                    type="radio"
                                    name="viz"
                                    value={k}
                                    onClick={handler}
                                    style={{ width: "1em" }}
                                    ref={i === 0 ? v1 : null}
                                ></input>
                                {k}
                            </label>
                        </div>
                    ))}
                </div>
                <Display {...{ viz }} />
            </div>
        </>
    );

    useEffect(() => {
        v1.current?.click();
    }, []);
    return body;
}

export default App;
