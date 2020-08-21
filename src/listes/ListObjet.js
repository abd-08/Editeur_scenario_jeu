import React, {Component} from "react";
import {selection} from "../data/data";
import Entity from "../composant/Entity";
import {entites} from "../types/TypeEntite";

export default class ListObjet extends Component {

    /* affichage des entité Objet*/
    render() {
        if (selection.listeEntites !== null){
            return(
                <div className="project-list section">
                    {/* on parcourt la liste, si c'est un type objet on l'affiche*/}
                    { selection && selection.listeEntites.map(Entite => {
                        if (Entite.type === entites.OBJET){
                            return (
                                <div key={Entite.id}>
                                    <Entity Entite={Entite}/>
                                </div>
                            )
                            /* si pas d'entité de ce type, renvoye null */
                        }else{
                            return null;
                        }

                    })}
                </div>

            )
        }else{
            console.log(selection);
            return null
        }
    }


}