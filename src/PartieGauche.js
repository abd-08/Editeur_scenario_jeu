import React, { Component } from 'react';
import DemoTree from "./navigation/Navigation";

class PartieGauche extends Component {
    render() {
        return (
            <div className="Navigation">  {/* affichage del'arbre des activité, scénario, ect */}
                <div>
                    <DemoTree/>
                </div>
            </div>
        );
    }
}

export default PartieGauche;