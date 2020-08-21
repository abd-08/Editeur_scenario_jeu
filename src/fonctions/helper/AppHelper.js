//fonction qui créer un ID unique ,génère un ID basée sur les secondes
import {compositions} from "../../types/TypeComposition";
import {rechercheNav} from "./NavigationHelper";
import {listeScenario} from "./ScenarioHelper";
import {listeQuete} from "./QueteHelper";
import {listeTache} from "./TacheHelper";

export function getUniqueID () {
    let uniqueID = new Date();
    return uniqueID.getTime();
}

export function liste_entite(node){
    let noeudFils = node;
    let r;
    while ( noeudFils.type!==compositions.ACTIVITE){
        r=rechercheNav(noeudFils.idPere);
        noeudFils = r.tab[r.i];
    }
    return noeudFils.listeEntites;
}


export function pere(id){
    let r=rechercheNav(id);
    let node = r.tab[r.i];
    while (node.type!==compositions.ACTIVITE){
        r=rechercheNav(node.idPere);
        node=r.tab[r.i];
    }
    return node;
}


export function download(id){
    let activity=pere(id);
    let scenar =[];
    let quest=[];
    let task=[];
    let S;
    let Q=[];
    let T=[];


    S = listeScenario(activity.id);//on sélectionne les scénario dont le père est A */*
    for (let j = 0; j < S.length; j++) {// on parcours les scenarios d'une activite A

        /* Liste des quêtes d'un scénario donné */
        Q = listeQuete(S[j].id);
        for (let k = 0; k < Q.length; k++) { //on parcours les quêtes du scenario i
            T=listeTache(Q[k].id);
            for (let i = 0; i < T.length; i++) {
                task.push(T[i]);
            }
            quest.push(Q[k]);
        }
        scenar.push(S[j]);
    }



    return {activite:activity,scenarios:scenar,quetes:quest,taches:task};
}
