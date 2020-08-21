import React, { Component } from 'react'
import {selection} from '../data/data'
import {onCloseModalPJ} from '../listes/ListEntity'
import {update} from "../App";
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import {entites} from "../types/TypeEntite";

class CreatePJ extends Component {

    /* permet de créer une entité */
    state = {
        id: '',
        description: '',
        type: entites.PJ
    };

    handleChange = id => event => {
        this.setState({ [id]: event.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        selection.listeEntites.push(this.state);
        onCloseModalPJ();
        update();
    };

    render() {
        /* permet de choisir un nom(id), une description et le type (un Objet, un PNJ ou un PJ) */
        return (
            <div className="container">
                <form>
                    <TextField
                        id="standard-name"
                        label="Nom du PJ"
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
                        onChange={this.handleChange('Description.js')}
                        margin="normal"
                    />
                </form>
                <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Créer</Button>
            </div>
        )
    }
}

export default CreatePJ