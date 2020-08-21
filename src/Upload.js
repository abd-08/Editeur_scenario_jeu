import React, { Component } from 'react';
import {activites,scenarios,taches,quetes} from "./data/data";
import {ajouterScenario} from "./fonctions/helper/ScenarioHelper";
import {ajouterQuete} from "./fonctions/helper/QueteHelper";
import {ajouterTache} from "./fonctions/helper/TacheHelper";
import {NaptrRecord as utils} from "node/dns";


function startRead() {
    // obtain input element through DOM

    var file = document.getElementById('file').files[0];
    if(file){
        getAsText(file);
    }
}

function getAsText(readFile) {

    var reader = new FileReader();

    // Read file into memory as UTF-16
    reader.readAsText(readFile, "UTF-16");

    // Handle progress, success, and errors
    reader.onprogress = updateProgress;
    reader.onload = loaded;
    reader.onerror = errorHandler;
}

function updateProgress(evt) {
    if (evt.lengthComputable) {
        // evt.loaded and evt.total are ProgressEvent properties
        var loaded = (evt.loaded / evt.total);
        if (loaded < 1) {
            // Increase the prog bar length
            // style.width = (loaded * 200) + "px";
        }
    }
}

function loaded(evt) {
    // Obtain the read file data
    var fileString = evt.target.result;
    // Handle UTF-16 file dump
    if(utils.regexp.isChinese(fileString)) {
        //Chinese Characters + Name validation
    }
    else {
        // run other charset test
    }
    // xhr.send(fileString)
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        // The file could not be read
    }
}


class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nom:'test',
            value: "contains",
            p:[],
        };
    }


    query(e) {
        //var vFile = document.getElementById("myfile").files[0];
        let vFile = e.target.files[0];
        let vReader = new FileReader();
        vReader.readAsText(vFile);
        //vReader.onload = this.lire(pEvent);


        vReader.onload = function (pEvent) {
            let vContent = pEvent.target.result;
            console.log(vContent);
            let vJson = JSON.parse(vContent);
            activites.push(vJson.activite);
            ajouterScenario(vJson.scenarios[0]);
            ajouterQuete(vJson.quetes[0]);
            ajouterTache(vJson.taches[0]);
            console.log(vJson);
            console.log(vJson.scenarios);
            console.log("chargement terminer");
        };

        console.log('upload -------------')
        console.log(vReader);
        console.log('upload -------------')
    }

    render() {
        return (
            <div >
                <input type='file' name='file' accept={".json"} onChange={(e)=>this.query(e)} multiple/>
            </div>
        );
    }
}

export default Upload;
