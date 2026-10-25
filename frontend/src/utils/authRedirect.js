import {useNavigate } from "react-router-dom";

export function authPath(path,data,target){
    const payload = new URLSearchParams(data);
    if(target && target!=="/") payload.set("redirect",target);
    const query = payload.toString();
    return query?`${path}?${query}`:path;

}