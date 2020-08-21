import React, { Component } from 'react'
import {selection} from "../data/data";
import MenuItem from '@material-ui/core/MenuItem/index';
import FormControl from '@material-ui/core/FormControl/index';
import Select from '@material-ui/core/Select/index';
import {onCloseModalLien, update} from '../App'
import Button from "@material-ui/core/Button/index";
import {rechercheNav} from "../fonctions/helper/NavigationHelper";

/* permet de créer un lien  */
class CreateLien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source:selection.nodes[0].id, //le 1 er noeud séléctionner pour le lié
            target:selection.nodes[0].id, //le 2eme
            label : "Toutes ses sous-compositions doivent être Accomplie"
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    /*grosse modification !! regarde dans quelle couche on est, puis on modifie le noeud demandé en le cherchant (PrecondQueteAModifier ect)
    puis on insère la postcondition dans ce noeud, enfin on push le lien*/
    handleSubmit = (e) => {
        e.preventDefault();

        selection.links.push(this.state);

        //charge les modifications dans la base de donnée
        let x = rechercheNav(selection.id);
        x.tab[x.i].links=selection.links;

        /* mise à jour du graphe */
        onCloseModalLien();
        update();
    };

    render() {

        return (
            <form autoComplete="off">
                <FormControl>
                    <Select
                        value={this.state.source}
                        onChange={this.handleChange}
                        inputProps={{
                            name: "source",
                            id: 'age-simple',
                        }}
                    >
                        {selection.nodes.map((index)=>(
                            <MenuItem value={index.id}>{index.nom}</MenuItem>
                        ))}
                    </Select>
                    lié à
                    <Select
                        value={this.state.target}
                        onChange={this.handleChange}
                        inputProps={{
                            name: "target",
                            id: 'age-simple',
                        }}
                    >
                        {selection.nodes.map((index)=>(
                            <MenuItem value={index.id}>{index.nom}</MenuItem>
                        ))}
                    </Select>
                    <div className="buttonLien">
                        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Nouveau Lien</Button>
                    </div>

                </FormControl>
            </form>
        )
    }
}

export default CreateLien


/**/