import {interactionsObjet, interactionsPnj, interactionsMonstre} from "../types/TypeInteraction";
import {entites} from "../types/TypeEntite";

/*

    Dans la postcondition d'une tâche, on ne doit pouvoir sélectionner
    que les interactions disponibles pour un type d'entité donné, et
    inversement.

 */

/*
    Interaction -> Type entité

    Entrée:
        - une interaction

    Sortie:
        - un type d'entité
        - si échec, retourne null
 */

export function interactionVersTypeEntite( nomInteraction )
{
    switch (nomInteraction) {

        /* Cas objet */
        case interactionsObjet.ACTIVER:
            return entites.OBJET;
        case interactionsObjet.JETER:
            return entites.OBJET;
        case interactionsObjet.POSSEDER:
            return entites.OBJET;

        /* Cas pnj */
        case interactionsPnj.PARLER:
            return entites.PNJ;

        /* Cas monstre */
        case interactionsMonstre.COMBATTRE:
            return entites.MONSTRE;
        case interactionsMonstre.VAINCRE:
            return entites.MONSTRE;

        /* Autre cas */
        default:
            return null;
    }
}


/*
    Type entité -> Liste d'interactions
 */

export function typeEntiteVersInteractions( typeEntite )
{
    switch (typeEntite)
    {
        case entites.OBJET:
            return Object.keys(interactionsObjet);
        case entites.PNJ:
            return Object.keys(interactionsPnj);
        case entites.MONSTRE:
            return Object.keys(interactionsMonstre);
        default:
            return null;
    }
}

/*
    Entité -> Type entité
 */


/*
    Type entités -> Liste d'entités
 */