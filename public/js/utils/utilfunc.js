export const $= (sel, base=document)=>base.querySelector(sel);
export const getID= (id, base=document)=>base.getElementById(id);
export const $All= (sel, base=document)=>base.querySelectorAll(sel);