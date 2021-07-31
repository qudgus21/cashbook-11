import { getCookie } from "./cookie";

const isEmpty = (str: any): boolean => (typeof str == 'undefined' || str == null || str== "");

export const isEmptyJWTToken = (): boolean => isEmpty(getCookie('JWT'));