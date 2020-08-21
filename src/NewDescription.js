import React, {Component} from 'react'
import {selection, supprimerQuete, supprimerScenario, supprimerTache , taches} from "./data/data";
import ListEntity from './listes/ListEntity'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import {update} from './App';
import PostConditionTache from './conditions/PostconditionTache';
import PostConditionComposition from './conditions/PostConditionComposition'
import {descriptionStyle} from './styles/styles'
import {compositions} from "./types/TypeComposition";
import {update_navigation} from "./navigation/Navigation";
import * as Constants from "./configuration_app/Constants";



class NewDescription extends Component {

    /*state des modifications à apporter au noeud sélectionner (pour changer de nom ou de description) */
    state = {
        nom:"",
        description:"",

    };

    /* si un changement dans le nom ou la description, ce charge de l'enregistrer dans le state au dessus*/
    handleChange = id => event => {
        this.setState({ [id]: event.target.value });
    };

    /* gère la modification une fois valider, changement des sources et des targets des liens concernées */
    /* problèmme avec les liens  */
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.description !== "") selection.node.description=this.state.description;
        if (this.state.nom !== "") {
            for (let j = 0; j < selection.nodes.length; j++) {
                if (selection.nodes[j].id === selection.node.id) {
                    selection.nodes[j].nom = this.state.nom;
                    break;
                }
            }
            selection.node.nom = this.state.nom;
        }

        this.setState({nom:"", description:""});
        update();
        update_navigation()
    };

    retourEntite = () => {
        //fonction qui qui deselectionne l 'element cliqué
       selection.node=null;
        for (let i=0;i<selection.nodes.length;i++){
            selection.nodes[i].color=Constants.GRAPH_NODES_DEFAULT_COLOR;
        }
        update();
    };




    supprimer=()=>{
        selection.nodes=selection.nodes.filter(x=>x.id!==selection.node.id);
        selection.links=selection.links.filter(x=>x.source!==selection.node.id);
        selection.links=selection.links.filter(x=>x.target!==selection.node.id);

        switch (selection.node.type) {
            case compositions.SCENARIO:
                supprimerScenario(selection.node.id);
                break;
            case compositions.QUETE:
                supprimerQuete(selection.node.id);
                break;
            case compositions.TACHE:
                supprimerTache(selection.node.id);
                console.log(taches);
                break ;
            default:
                console.log('null');
                return null;
        }
        update();
        update_navigation();
    };

/*

    supprime_postcondition = () => {
        activites[0].links = activites[0].links.filter(v=> v.source !== activites[0].node.id);
        activites[0].links = activites[0].links.filter(v => v.target !== activites[0].node.id);

        update();
    };
*/
    render() {

        /* description du noeud sélectionné */
        if (selection.node !== null) {
            return (
                <div className="Description" style={descriptionStyle}>
                    <div>
                        {/* utilisation des forms de modal-ui, nom et description dans les forms */}
                        <form>
                            <TextField
                                id="standard-name"
                                label={"Nom: " + selection.node.nom}
                                value={this.state.nom}
                                onChange={this.handleChange('nom')}
                                margin="normal"
                            />
                        </form>
                        <form>
                            <TextField
                                id="standard-name"
                                label={"Description: " + selection.node.description}
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                margin="normal"
                            />
                        </form>

                        <div className="flex1">
                            <Button variant="outlined" color="primary" onClick={this.handleSubmit}>modifier</Button>
                        </div>

                        <div className="ListLien">
                            <div>
                                {
                                    /* A-t-il au moins un successeur? Est-il une tâche? */
                                    /*noeudARelation(activites[0].node.id, activites[0].node.type, activites[0].node.idPere) && // Ne fonctionne pas pour le moment. Il faut un état dynamique. */
                                   selection.node.type === compositions.TACHE ? (<PostConditionTache/>) : (<PostConditionComposition/>)
                                }
                            </div>
                        </div>
                    </div>

                    <div className="RetourModif">
                        <div className="flex1">
                            <Button variant="outlined" color="primary" onClick={this.retourEntite}>retour</Button>
                        </div>
                        <div className="flex1">
                            <Button variant="outlined" color="primary" onClick={this.supprimer}>supprimer </Button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                /* affichage des entité si pas de noeud sélectionné */
                <div className="Description" style={descriptionStyle}>
                    <div>
                        <ListEntity />
                    </div>
                </div>
            )
        }
    }
}

export default NewDescription;