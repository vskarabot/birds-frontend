import { FillLayer, LineLayer, ShapeSource } from "@rnmapbox/maps";
import * as turf from "@turf/turf";

interface CoordinateProp {
    lon: number,
    lat: number,
};

export default function Circle ({coordinates, radius}: {coordinates: CoordinateProp, radius: number}) {

    // set 500 to user choice
    const circleGeoJSON = turf.circle([coordinates.lon, coordinates.lat], radius, { steps: 64, units: 'kilometers'});

    return (
        <ShapeSource id={"shape"} shape={circleGeoJSON}>
            <LineLayer
                id={"circle-line"}
                style={{
                    lineWidth: .5,
                    lineColor: 'white',

                }}
            />
            <FillLayer
                id={"circle-fill"}
                style={{
                    fillColor: '#c0c0c055'
                }}
            />
        </ShapeSource>
    );
};