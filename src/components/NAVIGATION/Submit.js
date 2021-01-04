import React, { useContext } from 'react'
import { GrDocumentPdf } from "react-icons/gr"
import { BiPrinter } from "react-icons/bi"
import { FiExternalLink } from "react-icons/fi";
import { FaCheck} from 'react-icons/fa'
import { GlobalContext } from '../App'
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import ReactPDF from '@react-pdf/renderer';



export default function Submit() {
const { 
  handlePrint,
  submitParameters
} = useContext(GlobalContext)
  
  return (
    <>
    
    
    <div className="header">
      <div className="header__input-container submit"> 
      <button className="btn-secondary header__apply-btn" onClick={() =>handlePrint() }> <GrDocumentPdf /> DOWNLOAD  / <BiPrinter /> PRINT </button>
      
        
      {/* <button className="btn-secondary header__apply-btn"> Print <BiPrinter /></button> */}
      <div></div>
      <button className="btn-secondary header__apply-btn"> Link <FiExternalLink /></button>
      <div></div>
      <div className="header__submit">Review sheet for accuracy and submit</div>
      <button className="btn-secondary header__apply-btn" onClick={() => submitParameters()} ><FaCheck /> SUBMIT</button>
        

      </div>
    </div>
    </>
  )
}
