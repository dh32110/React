import PropTypes from "prop-types";
import styles from "./Button.module.css"; // create react app으로 만들면 css 코드를 js의 object로 바꿔준다.

function Button ({text}){
   return <button className={styles.btn}>{text}</button>
}

Button.propTypes= {
   text: PropTypes.string.isRequired,
}

export default Button;