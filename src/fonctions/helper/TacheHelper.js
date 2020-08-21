import {taches} from "../../data/data";

export function accesTacheIndice(id){
    return taches.findIndex(v => v.id == id);
}

export function modificationTache(tache,id){
    let i = accesTacheIndice(id);
    taches[i]=tache;
}

export function supprimerTache(id){
    taches=taches.filter(t=>t.id!==id);
}

export function ajouterTache(tache) {
    taches.push(tache);
}

export function listeTache(idquete) {
    return taches.filter(q => q.idPere == idquete)
}