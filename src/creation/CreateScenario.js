import React, { Component } from 'react'
import { selection} from '../data/data'
import {update , onCloseModalScenario} from "../App";
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import {compositions,sousCategorie} from "../types/TypeComposition";
import {update_navigation} from "../navigation/Navigation";
import {rechercheNav} from "../fonctions/helper/NavigationHelper";
import {getUniqueID} from "../fonctions/helper/AppHelper";
import {GRAPH_NODES_DEFAULT_COLOR} from "../configuration_app/Constants";


/*permet de créer une tâche*/
class CreateScenario extends Component {

    /* tâche */
    state = {
        description:'',
        nom:'',
    };

    handleChange = id => event => {
        this.setState({ [id]: event.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let id = getUniqueID();

        selection.nodes.push({id:id ,nom:this.state.nom,color:GRAPH_NODES_DEFAULT_COLOR
            ,postconditions:[ {
                nomEntite: null,
                typeEntite: null,
                typeInteraction: null,
                etat: null
            }]
            ,x:300,y:300});

        //on recherche l'élement sélectionné dans nav
        let search= rechercheNav(selection.id);
        let i = search.i;
        let pere = search.tab;
        pere[i].nodes=selection.nodes;//on met a jour les noeuds



        ///on va ajouter les noeuds dans sa catégories

        let sous_cat = sousCategorie(selection.type); //le type de noeud qu'on va creer
        switch (selection.type) {
            case compositions.ACTIVITE :
                sous_cat.tab.push(
                    {
                        id: id,
                        description:this.state.description,
                        nom:this.state.nom,
                        type: sous_cat.type,
                        idPere:  selection.id,
                        links:[],
                        nodes:[],
                        postconditions: null,
                    });
                break;


            case compositions.SCENARIO: // on ajoute  quete
                sous_cat.tab.push(
                    {
                        id: id,
                        description:this.state.description,
                        nom:this.state.nom,
                        type: sous_cat.type,
                        idPere:  selection.id,
                        links:[],
                        nodes:[],
                        postconditions:null
                    });
                    break;
            case compositions.QUETE ://on ajoute une tache
                sous_cat.tab.push(
                    {
                        id: id,
                        description:this.state.description,
                        nom:this.state.nom,
                        type: sous_cat.type,
                        idPere:  selection.id,
                        postconditions: [{
                            nomEntite: null,
                            typeEntite: null,
                            typeInteraction: null,
                            etat: null
                        }]
                    });

                break;
            default :
                console.log(selection.type);
                console.log("erreur");
                break;
        }

        update();
        update_navigation();
        this.setState({id:'',description:'',nom:''});
        onCloseModalScenario();

    };

    render() {

        return (
            <div className="container">
                <div className="modal-content">
                    <form>
                        <TextField
                            id="standard-name"
                            label={"TITRE DE "+ sousCategorie(selection.type).type}
                            value={this.state.nom}
                            onChange={this.handleChange('nom')}
                            margin="normal"
                        />
                    </form>
                    <form>
                        <TextField
                            id="standard-name"
                            label="description"
                            multiline
                            rows="4"
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                            margin="normal"
                        />
                    </form>
                    <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Créer</Button>
                </div>
            </div>
        )
    }
}

export default CreateScenario;


