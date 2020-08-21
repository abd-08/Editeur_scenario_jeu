import {entites} from "../types/TypeEntite"
import {interactionsObjet} from "../types/TypeInteraction";
import {etatsTerminaux} from "../types/EtatComposition";
import * as Constantes from "../configuration_app/Constants"
import {compositions} from "../types/TypeComposition";


export var selection ={
    id:1,
    nom:'PAQUES',
    type:compositions.ACTIVITE,
    description: "C'est cool.",
    nodes: [
        {
            id:10,
            nom: "CHOCOLAT",
            color: Constantes.GRAPH_NODES_DEFAULT_COLOR,
            postconditions: [],
        }
    ],
    links: [],
    listeEntites: [
        {
            id: "Oeuf en chocolat",
            description: "Un oeuf en chocolat.",
            type: entites.OBJET
        },
        {
            id: "Lapin de Paques",
            description: "Le seul et l'unique.",
            type: entites.PNJ
        },
        {
            id: "Michael",
            description: "Il adore le chocolat.",
            type: entites.PNJ
        }
    ],
    node: null,
    link: null,
    idPere:null,
};

export var activites =[
    {
        id:1,
        nom:'PAQUES',
        type:compositions.ACTIVITE,
        description: "C'est cool.",
        nodes: [
            {
                id:10,
                nom: "CHOCOLAT",
                color: Constantes.GRAPH_NODES_DEFAULT_COLOR,
                postconditions: [],
            }
        ],
        links: [],
        listeEntites: [
            {
                id: "Oeuf en chocolat",
                description: "Un oeuf en chocolat.",
                type: entites.OBJET
            },
            {
                id: "Lapin de Paques",
                description: "Le seul et l'unique.",
                type: entites.PNJ
            },
            {
                id: "Michael",
                description: "Il adore le chocolat.",
                type: entites.PNJ
            }
        ]
    }
];

export var scenarios = [
    {
        id: 10,
        nom:"CHOCOLAT",
        type:compositions.SCENARIO,
        description: "C'est fort en chocolat.",
        postconditions: [],
        nodes: [
            {

                id: 100,
                nom:"BLANC",
                color: Constantes.GRAPH_NODES_DEFAULT_COLOR,
                postconditions: [],
            },
            {
                id:101,
                nom: "LAIT",
                color: Constantes.GRAPH_NODES_DEFAULT_COLOR,
                postconditions: [],
            }
        ],
        links: [
            {
                source: 100,
                target: 101,
                label: ""
            }
        ],
        idPere:1,
    }
];

export var quetes = [
    {

        id:100,
        nom: "BLANC",
        description: "Du chocolat blanc.",
        type:compositions.QUETE,
        postconditions: [],
        nodes: [
            {
                id:1000,
                nom: "LAPIN",
                color: Constantes.GRAPH_NODES_DEFAULT_COLOR,
                postconditions: [],
            },
            {
                id:1001,
                nom:"OEUF",
                color: Constantes.GRAPH_NODES_DEFAULT_COLOR,
                postconditions: [],
            },
            {
                id:1002,
                nom: "OMELETTE",
                color: Constantes.GRAPH_NODES_DEFAULT_COLOR,
                postconditions: [],
            },
            {
                id:1003,
                nom:"REPAS",
                color: Constantes.GRAPH_NODES_DEFAULT_COLOR,
                postconditions: [],
            }
        ],
        links: [
            {
                source: 1001,
                target: 1002,
                label: "POSSEDER Oeuf en chocolat"
            }
        ],
        idPere:10,
    },
    {
        id:101,
        nom: "LAIT",
        description: "Du chocolat au lait.",
        type:compositions.QUETE,
        postconditions: [],
        nodes: [
            {
                id:1004,
                nom: "LAIT_DEFAUT",
                color: Constantes.GRAPH_NODES_DEFAULT_COLOR,
                postconditions: [],
            }
        ],
        links: [

        ],
        idPere: 10,
    }
];


export var taches = [
    {
        id:1000,
        nom: "LAPIN",
        description: "Un lapin",
        type:compositions.TACHE,
        postconditions: [
            {
                nomEntite: null,
                typeEntite: null,
                typeInteraction: null,
                etat: null
            }
        ],
        idPere: 100
    },
    {
        id:1001,
        nom: "OEUF",
        description: "Un oeuf",
        type:compositions.TACHE,
        postconditions: [
            {
                nomEntite: "Oeuf en chocolat",
                typeEntite: entites.OBJET,
                typeInteraction: interactionsObjet.POSSEDER,
                etat: etatsTerminaux.REUSSITE
            }
        ],
        idPere: 100,
    },
    {
        id:1002,
        nom: "OMELETTE",
        description: "Une omelette.",
        type:compositions.TACHE,
        postconditions: [
            {
                nomEntite: null,
                typeEntite: null,
                typeInteraction: null,
                etat: null
            }
        ],
        idPere: 100,
    },
    {
        id:1003,
        nom: "REPAS",
        description: "Un repas.",
        type:compositions.TACHE,
        postconditions: [
            {
                nomEntite: null,
                typeEntite: null,
                typeInteraction: null,
                etat: null
            }
        ],
        idPere: 100,
    },
    {
        id:1004,
        nom: "LAIT_DEFAUT",
        type:compositions.TACHE,
        description: "",
        postconditions: [
            {
                nomEntite: null,
                typeEntite: null,
                typeInteraction: null,
                etat: null
            }
        ],
        idPere: 101,
    }
];






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


export function supprimerTache(id) {
    taches = taches.filter(t => t.id != id);
}

export function supprimerActivite(id){
    activites=activites.filter(a=>a.id!=id);
}



//fonction qui va recharge le projet via la
export function actualise(){
    activites=JSON.parse(localStorage.getItem("Activites"));
    console.log(activites);
    taches=JSON.parse(localStorage.getItem("Taches"));
    console.log(taches);
    quetes=JSON.parse(localStorage.getItem("Quetes"));
    console.log(quetes);
    scenarios=JSON.parse(localStorage.getItem("Scenarios"));
    console.log(scenarios);
    selection=JSON.parse(localStorage.getItem("Selection"));
    console.log(selection);
}

