import { useState } from 'react'
import './App.css'
import { Display } from './Display';
import { versions } from './versions';


function App() {

  const [viz, setViz] = useState("");
  const handler = ({ target }) => {
      setViz(target.value);
  };

  return (
    <>
        <div className="parent">
            <h2 className="div1">
                The farmer in the dell
            </h2>
            <div className="div2">
                {Object.keys(versions).map((k) => (
                    <div key={k}>
                        <label>
                            <input
                                type="radio"
                                name="viz"
                                value={k}
                                onClick={handler}
                                style={{ width: "1em" }}
                            ></input>
                            {k}
                        </label>
                    </div>
                ))}
            </div>
            <Display {...{ viz }}/>
        </div>

    </>
  )
}

export default App
