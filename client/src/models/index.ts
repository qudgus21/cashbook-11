import DateStore from "./date-store";
import FilterStore from "./filter-store";

const dateStore = new DateStore(new Date());
const filterStore = new FilterStore();

export { dateStore, filterStore };