function PulsingMarker({selectedMission, top, left, locationId }) {
    return (
        <div
            className='mission-point'
            style={{
                top: `${top}%`,
                left: `${left}%`,
                position:'absolute',
                transform: "translate(-50%, -50%)"
            }}
        >
            <svg width="20" height="20" viewBox="0 0 40 40">
                <circle cx="20" cy="20" fill="none" r="10" stroke={`${selectedMission===locationId?'red':'grey'}`} strokeWidth="2">
                    <animate attributeName="r" from="8" to="20" dur="1.5s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                </circle>
                <circle cx="20" cy="20" fill={`${selectedMission===locationId?'red':'grey'}`} r="5" />
            </svg>
        </div>
    );
}

export default PulsingMarker;