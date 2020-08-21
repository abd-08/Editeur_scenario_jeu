//ici permet de lister toute les entité selon leur type (Objet, PNJ, PJ)
//chaque entité et rangé dans une "boite" par ordre d'apparition dans la liste et selon son type

import React, { Component } from 'react'
import Entity from './Entity'
import {activite} from "../store"
import {selection} from "../data/data";

class ListObjet extends Component {


/* affichage des entité Objet*/
    render() {
        if (selection.listeEntites !== null){
            return(
                <div className="project-list section">
                    {/* on parcourt la liste, si c'est un type objet on l'affiche*/}
                    { activite && selection.listeEntites.map(Entite => {
                        if (Entite.type === "Objet"){
                            return (
                                <div>
                                    <Entity key={Entite.name} Entite={Entite}/>
                                </div>
                            )

                            // si pas d'entité de ce type, renvoye null
                        }else{
                            return null;
                        }

                    })}
                </div>

            )
        }else{
            console.log(activite);
            return null
        }
    }


}

class ListPNJ extends Component {

/* exactement la même chose mais pour les PNJ */
    render() {
        if (selection.listeEntites !== null){
            return(
                <div className="project-list section">
                    { selection && selection.listeEntites.map(Entite => {
                        if (Entite.type === "PNJ"){
                            return (
                                <div>
                                    <Entity key={Entite.name} Entite={Entite}/>
                                </div>
                            )
                        }else{
                            return null;
                        }

                    })}
                </div>

            )
        }else{
            console.log(activite);
            return null
        }
    }
}

class ListPJ extends Component {

/* exactement pareil mais pour les PJ */
    render() {
        if (selection.listeEntites !== null) {
            return (
                <div className="project-list section">
                    {selection && selection.listeEntites.map(Entite => {
                        if (Entite.type === "PJ") {
                            return (
                                <div>
                                    <Entity key={Entite.name} Entite={Entite}/>
                                </div>
                            )
                        } else {
                            return null;
                        }

                    })}
                </div>

            )
        } else {
            console.log(activite);
            return null
        }
    }
}

class ListEntity extends Component {

/* affichage de toutes les entitées des boites  selon leur type*/

    render() {
        return (
            <div className="project-list section">
                <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <div className="ListEntity">

                            <h2>Objet</h2>
                            <div className="section box" style={{height: '20vh', width: '400px', position: 'relative', overflow: 'auto', padding: '0'}}>
                                <ListObjet activite={activite}/>
                            </div>
                            <h2>PNJ</h2>
                            <div className="section box" style={{height: '20vh', width: '400px', position: 'relative', overflow: 'auto', padding: '0'}}>
                                <ListPNJ activite={activite}/>
                            </div>
                            <h2>PJ</h2>
                            <div className="section box" style={{height: '20vh', width: '400px', position: 'relative', overflow: 'auto', padding: '0'}}>
                                <ListPJ activite={activite}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};




export default ListEntity