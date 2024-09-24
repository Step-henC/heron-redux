
import './togglestyle.css'

export default function ToggleSwitch({checked, onChange}){




  return (


    <label className="switch">
<input type="checkbox" onChange={() => onChange()} checked={checked}/>
<span className="slider round"></span>
</label>

  )
}