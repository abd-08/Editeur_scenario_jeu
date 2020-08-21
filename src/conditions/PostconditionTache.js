import React, {Component} from 'react'
import {selection, quetes} from "../data/data";

import Select from "@material-ui/core/Select/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import Button from "@material-ui/core/Button/index";
import FormControl from "@material-ui/core/FormControl/index";
import {interactionsObjet, interactionsPnj} from '../types/TypeInteraction';
import {entites} from "../types/TypeEntite";
import {etatsTerminaux} from "../types/EtatComposition";
import {update} from "../App";

class PostconditionTache extends Component {

    constructor(props) {
        super(props);

        /* L'état de la postcondition du noeud pointé */
        this.state = {
            typeEntite: selection.node.postconditions[0].typeEntite,
            nomEntite: selection.node.postconditions[0].nomEntite,
            typeInteraction:selection.node.postconditions[0].typeInteraction,
            etat: selection.node.postconditions[0].etat
        };
    }

    /* s'il y a un changement, se charge de modifier le state*/
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /* met à jour le graphe */
    handleSubmit = (e) => {
        e.preventDefault();

        let i = selection.nodes.findIndex(n=>n.id == selection.node.id);
        selection.nodes[i].postconditions=this.state;
        i = selection.links.findIndex(n=>n.source == selection.node.id);
        selection.links[i].label= this.state.typeInteraction + " " + this.state.nomEntite;
        selection.node.postconditions=this.state;
        /* mise à jour du graphe */
        update();

    };

    selectionInteraction = () =>{

        if (this.state.typeEntite === entites.OBJET){

            return (
                <Select
                    value={this.state.typeInteraction}
                    onChange={this.handleChange}
                    inputProps={{
                        name: "typeInteraction",
                        id: 'age-simple',
                    }}
                >
                    {Object.keys(interactionsObjet).map((index)=>(
                        <MenuItem key={index} value={index}>{index}</MenuItem>
                    ))}
                </Select>
            )
        }else if(this.state.typeEntite === entites.PNJ){
            return (
                <Select
                    value={this.state.typeInteraction}
                    onChange={this.handleChange}
                    inputProps={{
                        name: "typeInteraction",
                        id: 'age-simple',
                    }}
                >
                    {Object.keys(interactionsPnj).map((index)=>(
                        <MenuItem key={index} value={index}>{index}</MenuItem>
                    ))}
                </Select>
            )

        }

    };

    selectionEntite = () =>{
        if (this.state.typeEntite === entites.OBJET){
            return (
                <Select
                    value={this.state.nomEntite}
                    onChange={this.handleChange}
                    inputProps={{
                        name: "nomEntite",
                        id: 'age-simple',
                    }}
                >
                    { selection.listeEntites
                        .filter(entite => entite.type === entites.OBJET)
                        .map(entite => {
                            return <MenuItem key={entite.id} value={entite.id}>{entite.id}</MenuItem>
                        })
                    }
                </Select>
            )

        }else if(this.state.typeEntite === entites.PNJ){
            return (
                <Select
                    value={this.state.nomEntite}
                    onChange={this.handleChange}
                    inputProps={{
                        name: "nomEntite",
                        id: 'age-simple',
                    }}
                >
                    { selection.listeEntites
                        .filter(entite => entite.type === entites.PNJ)
                        .map(entite => {
                            return <MenuItem key={entite.id} value={entite.id}>{entite.id}</MenuItem>
                        })
                    }
                </Select>
            )
        }


    };

    render() {

        return(
            <div>
                <h4>POSTCONDITION</h4>
                <FormControl>
                    <Select
                        value={this.state.typeEntite}
                        onChange={this.handleChange}
                        inputProps={{
                            name: "typeEntite",
                            id: 'age-simple',
                        }}
                    >
                        {Object.keys(entites).map((index)=>(
                            <MenuItem key={index} value={index}>{index}</MenuItem>
                        ))}
                        )
                    </Select>

                    {this.selectionEntite()}
                    {this.selectionInteraction()}

                    <Select
                        value={this.state.etat}
                        onChange={this.handleChange}
                        inputProps={{
                            name: "etat",
                            id: 'age-simple',
                        }}
                    >
                        <MenuItem value={etatsTerminaux.REUSSITE}>{etatsTerminaux.REUSSITE}</MenuItem>
                        <MenuItem value={etatsTerminaux.ECHEC}>{etatsTerminaux.ECHEC}</MenuItem>
                    </Select>
                    <div className="buttonLien">
                        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Mettre à jour</Button>
                    </div>

                </FormControl>
            </div>
        )
    }

}

export default PostconditionTache;