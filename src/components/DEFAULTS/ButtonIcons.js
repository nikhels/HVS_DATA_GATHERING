import React from 'react'
import { FaEdit } from "react-icons/fa";
import { VscSaveAs } from "react-icons/vsc";
import { VscSaveAll } from "react-icons/vsc";

export function EditIcon() {
    return (
        <>
         <FaEdit />   
        </>
    )
}
export function SaveIcon() {
    return (
        <>
         <VscSaveAs />   
        </>
    )
}
export function SaveAllIcon() {
    return (
        <>
         <VscSaveAll />
         <div className="display__edit-all-text"> SAVE</div>
        </>
    )
}
