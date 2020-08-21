import React, { Component } from 'react'
import {selection} from '../data/data'
import {onCloseModalPNJ} from '../listes/ListEntity'
import {update} from "../App";
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import {entites} from "../types/TypeEntite";

class CreatePNJ extends Component {

    /* permet de créer une entité */
    state = {
        id: '',
        description: '',
        type: entites.PNJ
    };

    handleChange = id => event => {
        this.setState({ [id]: event.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        selection.listeEntites.push(this.state);
        onCloseModalPNJ();
        update();

    };

    render() {
        /* permet de choisir un nom(id), une description et le type (un Objet, un PNJ ou un PJ) */
        return (
            <div className="container">
                <form>
                    <TextField
                        id="standard-name"
                        label="Nom de l'objet"
                        value={this.state.id}
                        onChange={this.handleChange('id')}
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
        )
    }
}

export default CreatePNJ