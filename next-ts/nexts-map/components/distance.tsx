const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;

const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

type DistanceProps = {
  leg: google.maps.DirectionsLeg;
};


export default function Distance( {leg}: DistanceProps){
    if (!leg.distance || !leg.duration) return null;
    

    return <div>
        <p>
            This position is <span className="highlight">{leg.distance.text}</span> away. 
        </p>
    </div>
}