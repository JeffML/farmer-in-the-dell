import { relationshipColors } from "./characters";


export const Legend = () => {
    const legends = Object.entries(relationshipColors).map(([key, val]) => (
        <span
            key={val}
            style={{ color: val, fontWeight: "bold", marginLeft: "1em" }}
        >
            {key}
        </span>
    ));

    return <div style={{ backgroundColor: "paleturquoise" }}> {legends} </div>;
};
