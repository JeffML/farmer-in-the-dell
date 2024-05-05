/* eslint-disable react/prop-types */
import {versions} from "./versions"

export const Display = ({ viz }) => {
    if (viz) {
        return versions[viz]
    }

    return null;
};
