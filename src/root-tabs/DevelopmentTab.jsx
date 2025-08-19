import React, {useState} from 'react'
import DevelopmentTabHeader from "../development-components/DevelopmentTabHeader.jsx";
import DevelopmentScreenController from "../development-components/DevelopmentScreenController.jsx";


function DevelopmentTab() {
    const [tab, setTab] = useState('weapon');
    const onTabClick = (typeName) => {
        setTab(typeName);

    }
    return (
        <div className='development-tab'>
           <DevelopmentTabHeader />
            <section className='development-tab-body'>
                <ul className='development-type-tab-list'>
                    <li><button onClick={()=>onTabClick('weapon')} className={tab==='weapon'?'bg-[#AA076B] text-white':''}>Weapon</button></li>
                    <li><button onClick={()=>onTabClick('aid')} className={tab==='aid'?'bg-[#AA076B] text-white':''}>Aid</button></li>
                    <li><button onClick={()=>onTabClick('base')} className={tab==='base'?'bg-[#AA076B] text-white':''}>Base</button></li>
                </ul>
                <DevelopmentScreenController developmentType={tab}/>
            </section>
        </div>
    )
}

export default DevelopmentTab
