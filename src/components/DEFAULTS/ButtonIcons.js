import React from 'react'
import { FaEdit } from "react-icons/fa";
import { VscSaveAs } from "react-icons/vsc";
import { VscSaveAll } from "react-icons/vsc";
import { HiPlus, HiX } from "react-icons/hi";

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
export function PlusIcon() {
    return (
        <>
         <HiPlus />
         <div className="display__edit-all-text"> ADD</div>
        </>
    )
}
export function CloseIcon() {
    return (
        <>
            <HiX />
        </>
    )
}
