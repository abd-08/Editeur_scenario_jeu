import React from "react";

const Entity = ({Entite}) => {

    // affichage d'une entité avec son nom et sa description
        return(
            <div className="card z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <div className="card-title ">
                        <span className="card-title">{Entite.id}</span>
                    </div>
                    <div className="card-action">
                        <span key={Entite.name}>{Entite.description}</span>
                    </div>
                </div>
            </div>
        )

};

export default Entity