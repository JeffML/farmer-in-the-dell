export const characters = {
    farmer: {},
    wife: {},
    child: {},
    nurse: {},
    cow: {},
    dog: {},
    cat: {},
    mouse: {},
    cheese: {},
};

export const relationshipColors = {
    married: "blue",
    owns: "turquoise",
    adopts: "pink",
    employs: "orange",
    needs: "yellow",
    "cares for": "purple",
    milks: "cream",
    guards: "red",
    befriends: "skyblue",
    hunts: "crimson",
    eats: "green",
};

export const doRelations = () => {
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


