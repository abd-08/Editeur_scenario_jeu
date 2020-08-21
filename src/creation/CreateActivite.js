import React, { Component } from 'react'
import {update , onCloseModalScenario} from "../App";
import TextField from "@material-ui/core/TextField/index";
import Button from "@material-ui/core/Button/index";
import {update_navigation} from "../navigation/Navigation";
import {ajouterActivite} from "../fonctions/helper/ActiviteHelper";


/*permet de créer une tâche*/
class CreateActivite extends Component {

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

        ajouterActivite(this.state.nom,this.state.description);
        update();
        update_navigation();
        this.setState({description:'',nom:''});
        onCloseModalScenario();

    };

    render() {

        return (
            <div className="container">
                <div className="modal-content">
                    <form>
                        <TextField
                            id="standard-name"
                            label={"TITRE DE L'ACTIVITE"}
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

export default CreateActivite;


