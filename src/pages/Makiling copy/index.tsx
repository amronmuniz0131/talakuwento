
import background from './components/mountains.png'
import house from './components/house.png'
import tree from './components/tree.png'
import birds from '../../images/bird.gif'
import clouds from './components/clouds.png'
export default function Makiling() {
    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col bg-cover bg-no-repeat relative" style={{ backgroundImage: `url(${background})` }}>
            <img src={house} alt="" className="bottom-0 right-[-200px] object-contain h-1/2 absolute" />
            <img src={tree} alt="" className="bottom-[-50px] left-0 object-contain h-1/2 absolute" />
            <img src={clouds} alt="" className="top-[50px] left-0 object-contain absolute" />
            {/* <img src={birds} alt="" className="h-20 w-20 scale-x-[-1] animate-move-bird" /> */}
        </div>
    );
}