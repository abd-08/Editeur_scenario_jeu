import {activites, quetes, scenarios, taches} from "../data/data";

export const compositions = {
    ACTIVITE: "ACTIVITE",
    SCENARIO: "SCENARIO",
    QUETE: "QUETE",
    TACHE: "TACHE"
};


export function type_element(id){

    let i=activites.findIndex(x=>x.id==id);
    if (i>-1) return compositions.ACTIVITE;

    i=scenarios.findIndex(x=>x.id==id);
    if (i>-1) return compositions.SCENARIO;

    i=quetes.findIndex(x=>x.id==id);
    if (i>-1) return compositions.QUETE;

    i=taches.findIndex(x=>x.id==id);
    if (i>-1) return compositions.TACHE;

    return null;
}


export function sousCategorie (type) {
    switch (type) {
        case compositions.QUETE:
            return {type: compositions.TACHE, tab: taches};

        case compositions.SCENARIO:
            return {type: compositions.QUETE, tab: quetes};

        case compositions.ACTIVITE:
            return {type: compositions.SCENARIO, tab: scenarios};

        default:
            return null;

    }
}

