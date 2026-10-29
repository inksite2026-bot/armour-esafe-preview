import {useEffect,useRef,useState} from 'react';
import {accounts,emptyNotes,initialNotes,totals} from '../transaction';
export function usePremiumSession(){
 const [screen,setScreen]=useState(0),[lang,setLang]=useState('en'),[userId,setUserId]=useState(''),[account,setAccount]=useState<number|null>(null),[notes,setNotes]=useState(initialNotes),[fields,setFields]=useState(['','','']),[activeField,setActiveField]=useState(0),[error,setError]=useState(''),[modal,setModal]=useState<'cancel'|'confirm'|null>(null),[collecting,setCollecting]=useState(false),[counting,setCounting]=useState(false),[stamp,setStamp]=useState(new Date()),[reference,setReference]=useState('');
 const committed=useRef(false),timer=useRef<ReturnType<typeof setTimeout>|null>(null),pending=useRef(emptyNotes());
 const t=(en:string,ms:string)=>lang==='en'?en:ms;
 const stopTimer=()=>{if(timer.current)clearTimeout(timer.current);timer.current=null;pending.current=emptyNotes();setCounting(false)};
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current)},[]);
 const go=(n:number)=>{setError('');setScreen(n);if(n===7){setCollecting(false);setStamp(new Date())}};
 const reset=()=>{stopTimer();setScreen(0);setLang('en');setUserId('');setAccount(null);setNotes(initialNotes());setFields(['','','']);setActiveField(0);setError('');setModal(null);setCollecting(false);setReference('');committed.current=false};
 const next=()=>{if(screen===2&&userId!=='1001'){setError(t('Please enter demo User ID 1001.','Sila masukkan ID Pengguna demo 1001.'));return}if(screen===3&&account===null){setError(t('Select a deposit account first.','Pilih akaun deposit dahulu.'));return}go(screen+1)};
 const keypad=(key:string)=>{setError('');setUserId(v=>key==='clear'?'':key==='delete'?v.slice(0,-1):(v+key).replace(/\D/g,'').slice(0,4))};
 const keyboard=(key:string)=>{if(key==='next'){setActiveField(v=>(v+1)%3);return}setFields(values=>values.map((v,i)=>i!==activeField?v:key==='clear'?'':key==='delete'?v.slice(0,-1):(v+key).slice(0,i===2?100:40)))};
 const insert=(n:number)=>{if(!collecting||screen!==6||modal)return;pending.current[n]++;setCounting(true);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>{const batch=pending.current;pending.current=emptyNotes();setNotes(current=>Object.fromEntries(Object.keys(current).map(k=>[k,current[+k]+batch[+k]])));setCounting(false);timer.current=null},650)};
 const jump=(n:number)=>{stopTimer();setCollecting(false);setModal(null);if(n>=3)setUserId('1001');if(n>=4)setAccount(v=>v??0);if(n===8){setReference('DEMO-PREVIEW');setStamp(new Date())}committed.current=false;go(n)};
 const finish=()=>{if(committed.current||totals(notes).amount===0||counting||collecting)return;committed.current=true;setReference(`DEMO-${crypto.randomUUID().slice(0,8).toUpperCase()}`);setStamp(new Date());setModal(null);go(8)};
 return {screen,lang,setLang,userId,setUserId,account,setAccount,notes,setNotes,fields,setFields,activeField,setActiveField,error,modal,setModal,collecting,setCollecting,counting,stamp,reference,t,go,reset,next,keypad,keyboard,insert,jump,finish,...totals(notes),selected:accounts[account??0]};
}
export type PremiumSession=ReturnType<typeof usePremiumSession>;
