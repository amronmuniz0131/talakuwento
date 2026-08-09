import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import background from './components/mountains.png'
import house from './components/house.png'
import tree from './components/tree.png'
import fog from './components/fog.png'
import clouds from './components/clouds.png'

export default function Makiling() {
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
        </div>
    )
}
