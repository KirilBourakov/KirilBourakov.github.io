import {useThree} from "@react-three/fiber";
import {Box, Flex} from "@react-three/flex";
import DestroyedPlanetGroup from "./DestroyedPlanetGroup.tsx";
import SunGroup from "./SunGroup.tsx";
import ShipGroup from "./ShipGroup.tsx";

export default function MainLayout() {
    const { viewport } = useThree()

    return (
        <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-start"
            paddingTop={1.5}
            paddingRight={3}
            paddingBottom={1.5}
            paddingLeft={3}
            width={viewport.width}
            height={viewport.height}
            position={[-viewport.width / 2, viewport.height / 2, 0]}
        >
            <Box flexDirection="column" height={viewport.height} justifyContent="space-between" >
                <Box>
                    <SunGroup />
                </Box>

                <Box>
                    <ShipGroup />
                </Box>

            </Box>

            <Box  alignSelf="flex-end" flexDirection="column">
                <DestroyedPlanetGroup />
            </Box>

        </Flex>
    )
}