import React from 'react';
import '../stylings/breed.css'


function BreedSelect(props) {
    console.log(props.activeList)
    return (
        <div>
        <h1>Breeds</h1>
        <p>Please select breed to display image</p>
        <ul className={"breed-grid"}>
            {Object.keys(props.list).map((breed) => (
                <li key={breed}>
                    <span> {breed.toUpperCase()} </span>
                    <input
                        name="breedToggle"
                        type="checkbox"
                        onChange={(e) => props.onToggleBreed(breed, '', e.target.checked)} />
                    <ul>
                        {props.list[breed].map((value) => (
                            
                            <li>
                                <span>
                                    {value.toUpperCase()}
                                    <input
                                    name="breedToggle"
                                    type="checkbox"
                                    onChange={(e) => props.onToggleBreed(breed, value, e.target.checked)} />
                                </span>
                                <ul>
                                    {(props.activeList.find((name)=> name === breed+value) && localStorage.getItem(breed+value)) && (
                                    localStorage.getItem(breed+value).split(',').map((img) => (
                                        <li><img style={{height: 90, width: 90}} 
                                        src={img.replace('"', '').replace('[', '').replace(']', '')
                                        .replace(/\\/g, '').replace('"', '')} /></li>
                                    )))}
                                </ul>
                            </li>
                        ))}
                        {props.activeList.find((name)=> name === breed) && (
                            localStorage.getItem(breed).split(',').map((img) => (
                                <li><img style={{height: 90, width: 90}} 
                                src={img.replace('"', '').replace('[', '').replace(']', '')
                                .replace('"', '').replace(/\\/g, '').replace('"', '')} /></li>
                            )))}
                    </ul>
                </li>     
            ))}
        </ul>
        </div>
    )
}

export default BreedSelect;