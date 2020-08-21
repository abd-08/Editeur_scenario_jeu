import React, { Component } from "react";

import TreeView from "devextreme-react/tree-view";

import * as Constants from "../configuration_app/Constants";

import {activites, selection, supprimerActivite, supprimerScenario} from "../data/data";
import {remplissageStockage, update} from "../App";
import { mise_a_jour_na, rechercheNav} from "../fonctions/helper/NavigationHelper";
import {compositions} from "../types/TypeComposition";
import {download, liste_entite} from "../fonctions/helper/AppHelper";
import {ajouterActivite} from "../fonctions/helper/ActiviteHelper";
import {ajouterTache} from "../fonctions/helper/TacheHelper";
import {ajouterQuete} from "../fonctions/helper/QueteHelper";
import {ajouterScenario} from "../fonctions/helper/ScenarioHelper";
import FileInput from "../FileInput";



//fonction qui met a jour la navigation
export function update_navigation (){
    let nav = mise_a_jour_na();
    this.setState({p:nav});
}



class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom:'test',
            value: "contains",
            p:[],
        };

        this.itemClicked = this.itemClicked.bind(this);
        update_navigation = update_navigation.bind(this);

    }



    recherche=(id)=>{
        // renvoie la liste des nodes et des links
        return  rechercheNav(id);
    };


    itemClicked(e) {

        for(let i=0;i<selection.nodes.length;i++) selection.nodes[i].color=Constants.GRAPH_NODES_DEFAULT_COLOR;

        let search =this.recherche(e.itemData.id);
        let tab = search.tab;
        let i = search.i;

        selection.nodes=tab[i].nodes;
        selection.links=tab[i].links;
        selection.node=null;
        selection.link=null;
        selection.nom=tab[i].nom;
        selection.idPere=tab[i].idPere;
        selection.id=tab[i].id;
        selection.description=tab[i].description;
        selection.type = tab[i].type;
        selection.listeEntites = liste_entite(selection);

        if (tab[i].type === compositions.ACTIVITE){
            selection.idPere=null;
            selection.listeEntites=tab[i].listeEntites;
        }
        update();
        update_navigation();
        console.log(download(selection.id));
    }

    componentWillMount() {
        update_navigation();
    }

    supprimer(){
        supprimerActivite(selection.id);
        for(let i =0 ; i<selection.nodes.length;i++){
            supprimerScenario(selection.nodes[i].id);
        }
        selection.id=null;
        selection.nodes=[];
        selection.listeEntites=[];
        update_navigation();
        update();

    }

    modifier(){
        ///focntion qui modifie le nom d'une activite
        selection.nom  = 'test';
        let search = rechercheNav(selection.id);
        let tab = search.tab;
        let i = search.i;
        tab[i].nom='test';
        update_navigation();
    }


    ajouter(){
        let res = 'Activite ';
        let nb = activites.length+1;
        let i = activites.findIndex(x=>x.nom===res+nb);
        while (i!==-1){
            nb=nb+1;
            i = activites.findIndex(x=>x.nom===res+nb);
        }
        ajouterActivite(res+nb,'');
        update_navigation();

        remplissageStockage();

        let monObjet = JSON.parse(localStorage.getItem("Activites"));
        console.log('json objett');
        console.log(monObjet.length);
    }


    //on gére ouverture et fermeture du modal


    onChange(e){
        let files = e.target.files;
        let reader=new FileReader();
        console.log(files[0]);
        reader.readAsBinaryString(files[0]);
        //reader.onload

        console.log(reader);
        console.log(reader.result);

    }

     previewFiles() {

        let preview = document.querySelector('#preview');
        let files   = document.querySelector('input[type=file]').files;

        function readAndPreview(file) {

            // Veillez à ce que `file.name` corresponde à nos critères d’extension
            if ( /\.(json|JSON)$/i.test(file.name) ) {
                let reader = new FileReader();

                reader.addEventListener("load", function () {
                    let image = new Image();
                    image.height = 100;
                    image.title = file.name;
                    image.src = this.result;
                    preview.appendChild( image );
                }, false);

                reader.readAsDataURL(file);
            }
        }

        if (files) {
            [].forEach.call(files, readAndPreview);
        }

    }


    query(e) {

        //var vFile = document.getElementById("myfile").files[0];
        let vFile = e.target.files[0];
        let vReader = new FileReader();
        vReader.readAsText(vFile);
        vReader.onload = function(pEvent) {
            // String Input
            let vContent = pEvent.target.result;
            console.log(vContent)
            // JSON to object
            let vJson = JSON.parse(vContent);

            activites.push(vJson.activite);
           // scenarios.push(vJson.scenarios[0]);
            //quetes.push(vJson.quetes[0]);
            ajouterScenario(vJson.scenarios[0]);
            //ajouterQuete(vJson.quetes[0]);
           // ajouterTache(vJson.taches[0]);
            //taches.push(vJson.taches);
            console.log(vJson);
            console.log(vJson.scenarios);
            console.log("chargement terminer");

        };

        update_navigation();update();
        console.log("chargement nav");
    }

    render() {
        return (
            <React.Fragment>
                <FileInput/>
                <TreeView
                    id={ "treeview" }
                    items={ this.state.p }
                    height={ Constants.NAV_DEFAULT_HEIGHT }
                    width={ Constants.NAV_DEFAULT_WIDTH }
                    searchMode= { Constants.NAV_DEFAULT_SEARCH_MODE }
                    searchEnabled={ Constants.NAV_DEFAULT_SEARCH_ENABLE }
                    selectionMode={'single'}
                    selectByClick={true}
                    onItemClick={ this.itemClicked }
                />
                <button onClick={ this.supprimer}  hidden={selection.type!==compositions.ACTIVITE || activites.length===0}>del</button>
                <button onClick={this.modifier} hidden={true}>mod</button>
                <button  onClick={this.ajouter}>add</button>


            </React.Fragment>
        );
    }
}

export default Navigation;