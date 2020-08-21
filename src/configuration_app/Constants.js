/************************************************************/

// la navigation

export const NAV_DEFAULT_HEIGHT = window.innerHeight - 0.05 * window.innerHeight;
export const NAV_DEFAULT_WIDTH = 0.15 * window.innerWidth;
export const NAV_DEFAULT_SEARCH_MODE = "contains"; // influence les résultats de la barre de recherche
export const NAV_DEFAULT_SEARCH_ENABLE = true;

/************************************************************/

// la partie droite

export const DROITE_DEFAULT_HEIGHT = 0.93 * 1080;
export const DROITE_DEFAULT_WIDTH = 0.2 * 1920;

// liste entités

export const ENTITE_BOX_DEFAULT_HEIGHT = 0.18 * window.innerHeight;
export const ENTITE_BOX_DEFAULT_WIDTH = 0.2 * window.innerWidth;

/************************************************************/

/************************************************************/

// le graphe
export const GRAPH_HEIGHT = 0.91 * window.innerHeight;
export const GRAPH_WIDTH = window.innerWidth - (NAV_DEFAULT_WIDTH + DROITE_DEFAULT_WIDTH);
export const GRAPH_DEFAULT_ZOOM = 5;
export const GRAPH_MAX_ZOOM = 8;
export const GRAPH_MIN_ZOOM = 1;

// les noeuds
export const GRAPH_NODES_DEFAULT_COLOR = "#c5cbe3";
export const GRAPH_NODES_SELECTED_COLOR = "#4056a1";
export const GRAPH_NODES_DEFAULT_FONT_COLOR = "#4542f4";
export const GRAPH_NODES_DEFAULT_FONT_SIZE = 8;
export const GRAPH_NODES_DEFAULT_SIZE = 200;
export const GRAPH_NODES_DEFAULT_SYMBOL_TYPE = "circle";

// les liens
export const GRAPH_LINKS_DEFAULT_COLOR = "#7675b7";
export const GRAPH_LINKS_DEFAULT_FONT_COLOR = "black";
export const GRAPH_LINKS_DEFAULT_FONT_SIZE = 8;