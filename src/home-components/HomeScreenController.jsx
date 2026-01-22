import CommunityGrid from "./CommunityGrid.jsx";

function HomeScreenController({acquiredResourcesList}) {
    return (
        <div className="home-screen">
            <div className='resources-display'>
                {acquiredResourcesList.map(obj=>{
                    return <div key={obj.name}>{obj.name}: {obj.amount}</div>
                })}
            </div>
            <CommunityGrid/>
        </div>
    )
}
export default HomeScreenController
