import {quetes,taches,scenarios} from "../../data/data";



export function accesScenarioIndice(id){
    return scenarios.findIndex(v => v.id == id);
}



export function modificationScenario(scenario,id){
    let i = accesScenarioIndice(id);
    scenarios[i]=scenario;
}



export function ajouterScenario(scenario) {
    scenarios.push(scenario);
}

export function listeScenario(idActivite){

    let res =scenarios.filter(s=>s.idPere==idActivite);
    return res;
}



export function supprimerScenario(id){
    scenarios =scenarios.filter(s=>s.id!==id);
    let quest = quetes.filter(q=>q.idPere===id);
    for (let i=0;i<quest.length;i++){
        taches=taches.filter(t=>t.idPere!==quest[i].id);
    }
    quetes=quetes.filter(q=>q.idPere!==id);
}


export function supprimerQuete(id){
    quetes=quetes.filter(q=>q.id!==id);
    taches=taches.filter(t=>t.idPere!==id);
}


export function supprimerTache(id){
    taches =taches.filter(t=>t.id!==id);
}
