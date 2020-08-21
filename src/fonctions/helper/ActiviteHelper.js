import {activites} from "../../data/data";
import {compositions} from "../../types/TypeComposition";
import {getUniqueID} from "./AppHelper";

/*
    Prend l'id de l'activité en paramètre.
    Retourne son indice dans la liste des activités.
 */
export function accesActiviteIndice(id){
    return activites.findIndex(v => v.id === id);
}

/*
    Remplace l'activité par une autre
 */
export function modificationActivite(activite,id){
    let i = accesActiviteIndice(id);
    activites[i]=activite;
}


/*
export function supprimerActivite(id){
    activites = activites.filter(a=>a.id!==id);

    let scenes = scenarios.filter(s=>s.idPere===id);

    let quest = [];
    for (let i=0;i<scenes.length;i++){
        quest = quetes.filter(q=>q.idPere===scenes[i].id);
        for (let j=0;j<quest.length;j++){
            taches=taches.filter(t=>t.idPere!==quest[j].id);
        }
        quetes=quetes.filter(q=>q.idPere!==scenes[i].id)
    }
    scenarios=scenarios.filter(s=>s.idPere!==id);
    return null;
}
*/
export function ajouterActivite(nom,descr) {
    let id = getUniqueID();
    let activite = {
        id:id,
        nom:nom,
        type:compositions.ACTIVITE,
        description: descr,
        nodes: [],
        links: [],
        listeEntites: [],
    };
    activites.push(activite);

    return null;
}
