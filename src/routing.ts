import {useEffect,useState} from 'react';
// Hash routing so GitHub Pages (no SPA rewrites) never serves a 404 for a deep link.
const base=import.meta.env.BASE_URL;
export const asset=(path:string)=>`${base}${path}`;
export const route=(path:string)=>`#${path}`;
export const frameRoute=(path:string)=>`${base}#${path}`;
// Legacy path URLs (e.g. localhost:5173/designs, /option-1?embedded) are rewritten to their hash form.
const legacy=window.location.pathname.slice(base.length-1);
if(!window.location.hash&&/^\/(designs|compare|option-[123])$/.test(legacy))window.history.replaceState(null,'',`${base}#${legacy}${window.location.search}`);
function read(){const [path,query='']=(window.location.hash.replace(/^#/,'')||'/').split('?');return {path,embedded:new URLSearchParams(query).has('embedded')}}
export function useRoute(){const [current,setCurrent]=useState(read);useEffect(()=>{const update=()=>{setCurrent(read());window.scrollTo(0,0)};window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update)},[]);return current}
