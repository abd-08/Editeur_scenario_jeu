import React, {Component} from "react";
import {selection} from "../data/data";
import Entity from "../composant/Entity";
import {entites} from "../types/TypeEntite";

export default class ListPNJ extends Component {

    /* exactement la même chose mais pour les PNJ */
    render() {
        if (selection.listeEntites !== null){
            return(
                <div className="project-list section">
                    { selection && selection.listeEntites.map(Entite => {
                        if (Entite.type === entites.PNJ){
                            return (
                                <div key={Entite.id}>
                                    <Entity Entite={Entite}/>
                                </div>
                            )
                        }else{
                            return null;
                        }

                    })}
                </div>

            )
        }else{
            return null
        }
    }
}