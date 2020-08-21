import {quetes, taches} from "../../data/data";


export function accesQueteIndice(id){
    return quetes.findIndex(v => v.id == id);
}


export function modificationQuetes(quete,id){
    let i = accesQueteIndice(id);
    quetes[i]=quete;
}


export function supprimerQuete(id){
    quetes=quetes.filter(q=>q.id!==id);
    taches=taches.filter(t=>t.idPere!==id);
}

export function ajouterQuete(quete) {
    quetes.push(quete);
}

export function listeQuete(idScenario) {
    return quetes.filter(q => q.idPere == idScenario)
}