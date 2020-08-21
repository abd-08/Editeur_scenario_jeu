import {activites , scenarios, quetes} from "../../data/data";
import {compositions} from "../../types/TypeComposition";

/*
    Vérifie si le noeud donné est source d'au moins une relation.

    Retourne un booléen.
 */

export function noeudARelation (id, type, idPere)
{
    let index;
    let rel;

    switch (type) {
        case compositions.SCENARIO:
            rel = activites[0].links.filter(link => link.source === id);
            return rel.length > 0;
        case compositions.QUETE:
            index = scenarios.findIndex(scenario => scenario.id === idPere);
            rel = scenarios[index].links.filter(link => link.source === id);
            return rel.length > 0;
        case compositions.TACHE:
            index = quetes.findIndex(quete => quete.id === idPere);
            rel = quetes[index].links.filter(link => link.source === id);
            return rel.length > 0;
        default:
            return false;
    }
}

/*
    Vérifie si le noeud donné est source d'au moins une relation.

    Retourne le successeur.
 */

export function noeudSuccesseur(id, type, idPere)
{
    let index;
    let rel;

    switch (type) {
        case compositions.SCENARIO:
            rel = activites[0].links.filter(link => link.source === id);
            break;
        case compositions.QUETE:
            index = scenarios.findIndex(scenario => scenario.id === idPere);
            rel = scenarios[index].links.filter(link => link.source === id);
            break;
        case compositions.TACHE:
            index = quetes.findIndex(quete => quete.id === idPere);
            rel = quetes[index].links.filter(link => link.source === id);
            break;
        default:
            return null;
    }

    if(rel.length > 0) {
        return rel[0].target;
    }
    else {
        return null;
    }
}