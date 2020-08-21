import {activites, scenarios , quetes , taches ,selection} from "../../data/data";
import {accesScenarioIndice, listeScenario} from "./ScenarioHelper";
import {accesQueteIndice, listeQuete} from "./QueteHelper";
import {accesTacheIndice} from "./TacheHelper";
import {accesActiviteIndice} from "./ActiviteHelper";
import {compositions,type_element} from "../../types/TypeComposition";

export function mise_a_jour_na(){
    let activity=[];
    let scenario =[];
    let quest=[];
    let S;
    let Q=[ ];

    for (let i=0 ; i<activites.length;i++) {// on parcours la liste des activites

        S = listeScenario(activites[i].id);//on sélectionne les scénario dont le père est A */*
        for (let j = 0; j < S.length; j++) {// on parcours les scenarios d'une activite A

            /* Liste des quêtes d'un scénario donné */
            Q = listeQuete(S[j].id);
            for (let k = 0; k < Q.length; k++) { //on parcours les quêtes du scenario i
                if (Q[k].id===selection.id) quest.push({id:Q[k].id,selected:true, text: Q[k].nom});
                else quest.push({id: Q[k].id, text: Q[k].nom});
            }

            if (S[j].id===selection.id) scenario.push({id: S[j].id, expanded: true , selected:true, text: S[j].nom, items: quest});
            else scenario.push({id: S[j].id, expanded: true, text: S[j].nom, items: quest});
            quest = [];
        }

        if (activites[i].id===selection.id) activity.push({id: activites[i].id, text: activites[i].nom,selected:true, expanded: true, items: scenario});
        else activity.push({id: activites[i].id, text: activites[i].nom, expanded: true, items: scenario});
        scenario=[];console.log('activite'+i);
    }
    return activity;
}



export function rechercheNav(id){
    let res = type_element(id);
    let i;
    switch (res) {
        case compositions.QUETE:
            i=accesQueteIndice(id);
            return {tab:quetes,i:i};

        case compositions.TACHE:
            i=accesTacheIndice(id);
            return {tab:taches,i:i};

        case compositions.SCENARIO:
            i=accesScenarioIndice(id);
            return {tab:scenarios,i:i};

        case compositions.ACTIVITE:
            i=accesActiviteIndice(id);
            return {tab:activites,i:i};

        default:
            return null;
    }
}


