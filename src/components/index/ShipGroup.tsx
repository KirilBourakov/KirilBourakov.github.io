import Ship from "../models/Ship.tsx";
import {HoverRing} from "../HoverRing.tsx";
import {useState} from "react";
import {useCursor} from "@react-three/drei";
import {Vector3} from "three";
import {LabelGroup} from "../LabelGroup.tsx";

export default function ShipGroup() {
    const [hover, setHover] = useState(false);

    useCursor(hover);

    function handleClick() {
        console.log("clicked");
    }

    return (
        <group position={[0, 2, -10]}  >
            <group>
                <Ship
                    scale={hover ? .95 : .9}
                    rotation={[Math.PI, .4, 0]}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                />


                <HoverRing
                    hover={hover}
                    innerRadius={2.8}
                    outerRadius={3.1}
                    position={new Vector3(1,-.5,0)}
                />
            </group>

            <LabelGroup
                hover={hover}
                setHover={setHover}
                handleClick={handleClick}
                linePoints={[
                    new Vector3(0, -.5, 0),
                    new Vector3(0, -4.4, 0),
                    new Vector3(-0.5, -4.4, 0)
                ]}
                htmlPos={new Vector3(-3, -4, 0)}
                text={"[ PROJECTS ]"}
            />
        </group>

    )
}