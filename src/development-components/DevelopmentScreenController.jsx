import React from 'react'

function DevelopmentScreenController({developmentType}) {

    const DevelopmentTypeTitleNames={

        'weapon':'Weapons Development',
        'aid':'Aid Development',
        'base':'Base Development',
    }

    return (
        <div className='main-development-container '>
            <div className='development-type-name'>{DevelopmentTypeTitleNames[developmentType]}</div>
            <section className='items-development-box'>
                <div className='item-type-list'>list of item types</div>
                <section className='items-of-specific-type'>all items of the specified type</section>

            </section>
        </div>
    )
}

export default DevelopmentScreenController
