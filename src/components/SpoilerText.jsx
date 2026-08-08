import { useState } from "react"

export default function SpoilerText(props) {
    const [hidden, setHidden] = useState(true);
    const [clicked, setClicked] = useState(false);

    const toggleHidden = () => setHidden(!hidden);
    const toggleClicked = () => {
        setClicked(!clicked);
        setHidden(clicked);
    }

    return (
        <div className={hidden ? "spoiler-hidden" : "spoiler-not-hidden"} onClick={toggleClicked} onMouseOver={hidden && !clicked ? toggleHidden : undefined} onMouseOut={!hidden && !clicked ? toggleHidden : undefined}>
            {props.children}
        </div>
    )
}