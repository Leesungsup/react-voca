import {useState} from "react"
import styles from "./Hello.module.css"
function Hello(){
  return (
    <div>
      <p>Hello</p>
      <div className={styles.box}>Hello</div>
  </div>
  )
}

export default Hello;