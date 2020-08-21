import React, { Component } from 'react'
import {activite} from './data/store'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {update} from './App'
import Button from "@material-ui/core/Button";
import {listDeroulante} from "./styles/styles";

/* permet de créer un lien  */

class CreateLienCible extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source:activite.node.id, //le 1 er noeud séléctionner pour le lié
            target:activite.nodes[0].id, //le 2eme
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        activite.links.push(this.state);
        console.log(this.state);
        update();

    };

    render() {

        return (
            <form autoComplete="off">
                <FormControl className={listDeroulante.formControl}>
                    lié à
                    <Select
                        autoWidth={true}
                        value={this.state.target}
                        onChange={this.handleChange}
                        inputProps={{
                            name: "target",
                            id: 'age-simple',
                        }}
                    >
                        {activite.nodes.map((index)=>(
                            <MenuItem key={index.id} value={index.id}>{index.id}</MenuItem>
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

export default CreateLienCible


/**/