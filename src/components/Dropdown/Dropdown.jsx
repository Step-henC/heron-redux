import { uniqueId } from 'lodash';
import './dropdown.css'
export default function Dropdown({items, title, theme}) {


  return (
    <div className="dropdown">
  <button className={theme === 'white' ? "dropbtn-white" : "dropbtn"}>{title} &#x25BC;</button>
  <div className="dropdown-content">
   { items.map((item) => <a key={uniqueId('drpdn')} href={item.url}>{item.label}</a>) }
  </div>
</div>
  )
}