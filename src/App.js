import React, { Component } from 'react';
import {Graph} from 'react-d3-graph';
import NewDescription from "./NewDescription";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from '@material-ui/core/Grid';

import CreateLien from "./creation/CreateLien";
import CreateScenario from "./creation/CreateScenario";

import * as Constants from "./configuration_app/Constants";
import { graphConfig } from './configuration_app/graphe';
import {grapheStyle} from "./styles/styles";

import PartieGauche from "./PartieGauche";
import TelechargerActivite from "./conversion/TelechargerActivite";
import {activites, scenarios, selection, quetes, taches} from "./data/data";
import {rechercheNav} from "./fonctions/helper/NavigationHelper";


/* met à jour le graphe */

export function update () {
    if (this._isMounted) {
        this.setState({data : selection});

    }

}

export function remplissageStockage() {

    localStorage.setItem('Activites', JSON.stringify(activites));
    localStorage.setItem('Taches', JSON.stringify(taches));
    localStorage.setItem('Scenarios', JSON.stringify(scenarios));
    localStorage.setItem('Quetes', JSON.stringify(quetes));
    localStorage.setItem('Selection', JSON.stringify(selection));

}

export function onCloseModalLien () {
    this.setState(this.stateLien ={openLien: false})
}

export function onCloseModalScenario(){
    this.setState(this.stateActivite = {openScenario: false});
}


export  function lunch(ApplicationName)
{
  // let w = new ActiveXObject("WScript.Shell");
   // w.run(ApplicationName);
    return true;
}
/*
function smoothCurveRadius(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(dx * dx + dy * dy);
}*/

const LINE_TYPES = {
    STRAIGHT: "STRAIGHT",
    CURVE_SMOOTH: "CURVE_SMOOTH",
    CURVE_FULL: "CURVE_FULL",
};

function straightLineRadius() {
    return 0;
}

const RADIUS_STRATEGIES = {
    [LINE_TYPES.STRAIGHT]: straightLineRadius,
};

function getRadiusStrategy(type) {
    return RADIUS_STRATEGIES[type] || RADIUS_STRATEGIES[LINE_TYPES.STRAIGHT];
}

export function buildLinkPathDefinition({ source = {}, target = {} }, type = LINE_TYPES.STRAIGHT) {
    const { x: sx, y: sy } = source;
    const { x: tx, y: ty } = target;
    const validType = LINE_TYPES[type] || LINE_TYPES.STRAIGHT;
    const radius = getRadiusStrategy(validType)(sx, sy, tx, ty);

    return `M${sx},${sy}A${radius},${radius} 0 0,1 ${tx},${ty}`;
}

class App extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.stateData = {
            data: selection,
        };
        // eslint-disable-next-line
        update = update.bind(this);
        // eslint-disable-next-line
        onCloseModalLien = onCloseModalLien.bind(this);
        // eslint-disable-next-line
        onCloseModalScenario = onCloseModalScenario.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    stateActivite = {
        openScenario: false          // permet ouverture et fermeture du modal activité
    };

    stateLien ={
        openLien: false
    };

    //on gére ouverture et fermeture du modal
    onOpenModalScenario = () =>{
        this.setState(this.stateActivite ={ openScenario: true});

    };

    onOpenModalLien = () =>{
        this.setState(this.stateLien ={ openLien: true});

    };


    onClickNode = (nodeId) => {
        //fonction qui met une couleur sur le noeud sélectionner du graphe

        for (let i=0;i<selection.nodes.length;i++){
            selection.nodes[i].color=Constants.GRAPH_NODES_DEFAULT_COLOR;
            if (selection.nodes[i].id==nodeId){
                selection.node=selection.nodes[i];
                selection.nodes[i].color=Constants.GRAPH_NODES_SELECTED_COLOR;
            }
        }

        let search = rechercheNav(nodeId);
        let tab = search.tab;
        let i = search.i;
        selection.node= tab[i];
        update();

    };

    //action si fond du graphe cliquer, permet de réinitialiser le node cliquer (retour sur entité)
    onClickGraph = () => {
        //losrqu'on clique sur le graphe on reinitialise la couleur du dernier élément
        for (let i=0;i<selection.nodes.length;i++){
            selection.nodes[i].color=Constants.GRAPH_NODES_DEFAULT_COLOR;
        }
        selection.node=null;
        update();

    };



    render() {
        const { data } = this.stateData;
        const { openScenario } = this.stateActivite;
        const { openLien } = this.stateLien;

        return (

            <Grid
        container
        direction="row"
        justify="center"
        alignItems="stretch"
        className="App">

                {/*************************/}
                <Grid item xs={2}>
                    <PartieGauche/>
                </Grid>
                {/*************************/}

                {/*************************/}
                <Grid item xs={7}>
                <div className="Graphe" style={grapheStyle} >
                    {/* modal pour créer une activité */}
                    <div className="entete">
                        <div className="actionsGraphe">
                            <Button variant="outlined" className="buttonMain" disabled={activites.length===0} color="primary" onClick={this.onOpenModalScenario}>
                                +
                            </Button>
                            <Button variant="outlined" className="buttonMain" disabled={activites.length===0||selection.nodes.length<2 } color="primary" onClick={this.onOpenModalLien}>
                                Lien
                            </Button>

                            <a href="#" onClick={lunch('explorer.exe')}>Explorer</a>
                        </div>

                        <div className={"entete"}>
                            <button onClick={remplissageStockage} hidden={true}>save</button>
                            <TelechargerActivite/>
                        </div>

                        <Dialog
                            open={openScenario}
                            onClose={onCloseModalScenario}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">{"Nouveau"}</DialogTitle>
                            <DialogContent>
                                <CreateScenario/>
                            </DialogContent>
                            <DialogActions>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                            open={openLien}
                            onClose={onCloseModalLien}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Nouveau Lien</DialogTitle>
                            <DialogContent>
                                <CreateLien/>
                            </DialogContent>
                            <DialogActions>
                            </DialogActions>
                        </Dialog>
                    </div>
                    {
                        /* ici le graphe, il gére tout le drag and drop, le dessin des liens ect*/
                        this.stateData.data.nodes.length !== 0 ?
                        (
                            <Graph
                                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                                data={data }
                                config={graphConfig}
                                onClickNode={this.onClickNode}
                                onClickGraph={this.onClickGraph}
                            />
                        )
                       :
                        (
                            <div></div>
                        )
                    }
                </div>
                </Grid>
                {/*************************/}

                {/*************************/}
                {/* affichage de la partie droite, description du noeud séléctioner ou liste des entités */}
                <Grid item xs={3}>
                <div className="Description">
                    <NewDescription/>
                </div>
                </Grid>
                {/*************************/}
            </Grid>





        );
    }
}


export default App;