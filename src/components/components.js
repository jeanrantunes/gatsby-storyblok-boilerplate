import Page from "./page";
import Grid from "./grid";
import Teaser from "./teaser";
import Feature from "./feature";
import NavItem from "./nav_item";
import Form from "./contact_form";
import ComponentNotFound from "./component_not_found";

const ComponentList = {
  page: Page,
  grid: Grid,
  teaser: Teaser,
  feature: Feature,
  nav_item: NavItem,
  contact_form: Form,
};

const Components = (type) => {
  if (typeof ComponentList[type] === "undefined") {
    return ComponentNotFound;
  }
  return ComponentList[type];
};

export default Components;
