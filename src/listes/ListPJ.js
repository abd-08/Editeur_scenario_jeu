import React, {Component} from "react";
import {selection} from "../data/data";
import Entity from "../composant/Entity";
import {entites} from "../types/TypeEntite";

export default class ListPJ extends Component {

    /* exactement pareil mais pour les PJ */
    render() {
        if (selection.listeEntites !== null) {
            return (
                <div className="project-list section">
                    {selection && selection.listeEntites.map(Entite => {
                        if (Entite.type === entites.PJ) {
                            return (
                                <div key={Entite.id}>
                                    <Entity Entite={Entite}/>
                                </div>
                            )
                        } else {
                            return null;
                        }

                    })}
                </div>

            )
        } else {
            console.log(selection);
            return null
        }
    }
}