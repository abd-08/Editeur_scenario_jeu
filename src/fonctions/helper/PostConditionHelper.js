import {activites, quetes} from "../../data/data";

/*
    Permet d'accéder au parent.
 */

export function accesLinksParentNoeudSelection( )
{
    let indexQueteAModifier = quetes.findIndex(quete => quete.id === activites[0].node.idPere);
    let x = quetes[indexQueteAModifier].links.filter((link) => link.source === activites[0].node.id);

    return x[0];
}