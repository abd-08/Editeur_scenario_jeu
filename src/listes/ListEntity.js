import React, {Component} from "react";
import {activites, selection} from "../data/data"
import Button from "@material-ui/core/Button/index";
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import CreateObjet from "../creation/CreateObjet";
import CreatePNJ from "../creation/CreatePNJ";
import CreatePJ from "../creation/CreatePJ";
import DialogActions from "@material-ui/core/DialogActions/index";



import ListObjet from './ListObjet';
import ListPJ from './ListPJ';
import ListPNJ from './ListPNJ';

import { listeEntites, listeEntitesBoite } from '../styles/styles'

export function onCloseModalObjet(){
    this.setState(this.stateObjet = { openObjet: false });
}

export function onCloseModalPNJ () {
    this.setState(this.statePNJ ={ openPNJ: false });
}

export function onCloseModalPJ () {
    this.setState(this.statePJ ={ openPJ: false });
}


export function onOpenModalObjet () {

    console.log(this.stateObjet);
    this.setState(this.stateObjet ={ openObjet: true});
    console.log(this.stateObjet);
}

export function onOpenModalPNJ () {
    this.setState(this.statePNJ ={ openPNJ: true});
}

export function onOpenModalPJ () {
    this.setState(this.statePJ ={ openPJ: true });
}

export default class ListEntity extends Component {
    _isMounted = false;
    state={etat:true};
    constructor(props) {
        super(props);

        // eslint-disable-next-line
        onCloseModalPJ = onCloseModalPJ.bind(this);
        // eslint-disable-next-line
        onOpenModalPJ = onOpenModalPJ.bind(this);
        // eslint-disable-next-line
        onCloseModalObjet = onCloseModalObjet.bind(this);
        // eslint-disable-next-line
        onOpenModalObjet = onOpenModalObjet.bind(this);
        // eslint-disable-next-line
        onCloseModalPNJ = onCloseModalPNJ.bind(this);
        // eslint-disable-next-line
        onOpenModalPNJ = onOpenModalPNJ.bind(this);
    }

    componentWillMount() {
        console.log('will mount');

    }

    componentDidMount() {

        console.log('will did mount');
        this._isMounted = true;
    }

    componentWillUnmount() {
        console.log(' will unmount');
        this._isMounted = false;
    }

    componentDidCatch(error, errorInfo) {
        console.log('did catch');
    }

    stateObjet = {
        openObjet: false,
    };

    statePNJ = {
        openPNJ: false,
    };

    statePJ = {
        openPJ: false,
    };

    render() {

        const { openObjet } = this.stateObjet;
        const { openPNJ } = this.statePNJ;
        const { openPJ } = this.statePJ;

        return (
            <div className="ListEntity" style={listeEntites}>
                <h3>Objet</h3>
                <div className="section box" style={listeEntitesBoite}>
                    <ListObjet activite={selection}/>
                </div>
                <div>
                    <Button variant="outlined" className="btn-creation" disabled={activites.length===0} color="primary" onClick={onOpenModalObjet}>
                        Creer Objet
                    </Button>
                    <Dialog
                        open={openObjet}
                        onClose={onCloseModalObjet}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Creer Objet</DialogTitle>
                        <DialogContent>
                            <CreateObjet/>
                        </DialogContent>
                        <DialogActions>
                        </DialogActions>
                    </Dialog>
                </div>
                <h3>PNJ</h3>
                <div className="section box" style={listeEntitesBoite}>
                    <ListPNJ activite={selection}/>
                </div>
                <div>
                    <Button variant="outlined" color="primary" disabled={activites.length===0} className="btn-creation" onClick={onOpenModalPNJ}>
                        Creer PNJ
                    </Button>
                    <Dialog
                        open={openPNJ}
                        onClose={onCloseModalPNJ}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title" >Creer PNJ</DialogTitle>
                        <DialogContent>
                            <CreatePNJ/>
                        </DialogContent>
                        <DialogActions>
                        </DialogActions>
                    </Dialog>
                </div>
                <h3>PJ</h3>
                <div className="section box" style={listeEntitesBoite}>
                    <ListPJ activite={selection}/>
                </div>
                <div>
                    <Button variant="outlined" color="primary" disabled={activites.length===0} className="btn-creation" onClick={onOpenModalPJ}>
                        Creer PJ
                    </Button>
                    <Dialog
                        open={openPJ}
                        onClose={onCloseModalPJ}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Creer PJ</DialogTitle>
                        <DialogContent>
                            <CreatePJ/>
                        </DialogContent>
                        <DialogActions>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
};