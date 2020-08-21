import React, {Component} from "react";

import {selection} from "../data/data"
import Button from "@material-ui/core/Button/index";
import {download} from "../fonctions/helper/AppHelper";



export default class TelechargerActivite extends Component {


    render() {
        let data={};
        if (selection.id!=null) data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(download(selection.id)));
        return (
            <a href={"data: " + data} download="activite.json">
                <Button variant="outlined" onclick={console.log("test download")} className="buttonMain" color="primary">
                    JSON
                </Button>
            </a>
        );
    }
}