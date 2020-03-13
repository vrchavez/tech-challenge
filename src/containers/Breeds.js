import React, {useState} from 'react';
import Loading from './Loading';
import BreedSelect from '../components/BreedSelect';


class Breeds extends React.Component { 
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            breeds: [],
            activeBreeds: [],
        }
        this.handleToggleBreed = this.handleToggleBreed.bind(this);
    }


    // Handles toggle of checkbox. If clicked, gets breed if not in local storage.
    handleToggleBreed(breedMaster, breedChild, isVisible) {
        // If checkbox is clicked, remove from active list 
        if (!isVisible) {
            if (breedChild !== '') {
                this.setState((currentState) => {
                    const currentBreeds = currentState.activeBreeds;
                    return {
                        activeBreeds: currentBreeds.filter((breed) => breed !== breedMaster+breedChild),
                    }
                })
            } else {
                const breedList = this.state.breeds[breedMaster];
                if (breedList.length > 0) {
                    var currentBreeds = this.state.activeBreeds;
                        for (var dog in breedList) {
                            var index = currentBreeds.indexOf(breedList[dog]);
                            currentBreeds.splice(index,1)
                            if(+dog === breedList.length-1) {
                                this.setState((currentState) => {
                                    return {
                                        activeBreeds: currentBreeds
                                    }
                                });
                            }
                        }

                } else {
                    this.setState((currentState) => {
                        const currentBreeds = currentState.activeBreeds;
                        return {
                            activeBreeds: currentBreeds.filter((breed) => breed !== breedMaster),
                        }
                    })
                }
            }
        } else {
            // If checkbox is not true, we check to see if we already made api call.
            if(localStorage.getItem(breedMaster)) {
                if (breedChild !== '') {
                    this.setState((currentState) => {
                        return {
                            activeBreeds: currentState.activeBreeds.concat(breedMaster+breedChild),
                        }
                    })
                } else {
                    
                    // Check if there is list.
                    var breedContainer = [];
                    var breedList = this.state.breeds[breedMaster];
                    if (breedList.length > 0) {
                        for (var breed in breedList) {
                            breedContainer.push(breedMaster+breedList[breed])
                            if (breedList.length-1 === +breed) {
                                this.setState((currentState) => {
                                    return {
                                        activeBreeds: currentState.activeBreeds.concat(breedContainer),
                                    }
                                })
                            }
                        }
                    } else {
                        this.setState((currentState) => {
                            return {
                                activeBreeds: currentState.activeBreeds.concat(breedMaster),
                            }
                        })
                    }
                }

            // If it's not in local storage, we make a call for images of breedMaster.
            // In this else, we also store images for breedChild, if there are any.
            }else {
                const encodedURI = encodeURI(`https://dog.ceo/api/breed/${breedMaster}/images`)
                fetch(encodedURI)
                .then(res => res.json())
                .then(
                    (result) => {
                        // Sorry, here I see if there are child breeds, if there is, I divide all of the images into set breed.
                        // If there isn't, I set the masterBreed as main handler of all images.
                        var breedList = this.state.breeds[breedMaster];
                        // Check if there is list.
                        if (breedList.length > 0 && result.message.length > 0 && breedChild !== '') {
                            console.log(breedList.length + 'her');
                            // Iterate through list when found and filter the image strings, then make array with clean images.
                            for(var breed in breedList) {
                                var receiveMessage = JSON.stringify(result.message);
                                var cleanImages1 = receiveMessage.replace('"', '').replace('[', '').replace(']', '').replace('"', '');
                                var cleanImages2 = cleanImages1.replace('[', '').replace(/\\/g, '').replace('"', ''); 
                                var images = JSON.stringify(cleanImages2).split(',');          
                                var container = [];
                                // In this iteration, I check if breed is in image url, then set in local if it is.
                                for (var i = 0; i < images.length; i++) {
                                    if(images[i].includes(breedList[breed])) {
                                        container.push(images[i]);
                                    }
                                    if (i === images.length -1) {
                                        localStorage.setItem(breedMaster + breedList[breed], container);
                                        this.setState((currentState) => {
                                            return {
                                                activeBreeds: currentState.activeBreeds.concat(breedMaster+breedChild),
                                            }    
                                        });
                                        localStorage.setItem(breedMaster, true);
                                    }
                                }
                            }
                        } else {
                            var breedContainer = []
                            var breedListX = this.state.breeds[breedMaster];
                            if (breedListX.length > 0) {
                                console.log('her');
                                for(var breedX in breedListX) {
                                    var receiveMessageX = JSON.stringify(result.message);
                                    var cleanImages1X = receiveMessageX.replace('"', '').replace('[', '').replace(']', '').replace('"', '');
                                    var cleanImages2X = cleanImages1X.replace('[', '').replace(/\\/g, '').replace('"', ''); 
                                    var imagesX = JSON.stringify(cleanImages2X).split(',');          
                                    var containerX = [];
                                    // In this iteration, I check if breed is in image url, then set in local if it is.
                                    for (var iX = 0; iX < imagesX.length; iX++) {
                                        if(imagesX[iX].includes(breedListX[breedX])) {
                                            containerX.push(imagesX[iX]);
                                        }
                                        if (iX === imagesX.length -1) {
                                            localStorage.setItem(breedMaster + breedListX[breedX], containerX);
                                        }
                                    }
                                    //console.log('her ' + breedMaster+breedList[breed])
                                    breedContainer.push(breedMaster+breedListX[breedX])
                                    console.log(breedContainer);
                                    if(+breedX === breedListX.length-1) {
                                        this.setState((currentState) => {
                                            return {
                                                activeBreeds: currentState.activeBreeds.concat(breedContainer),
                                            }    
                                        });
                                        localStorage.setItem(breedMaster, true);
                                    }
                                }
                            } else {
                                localStorage.setItem(breedMaster, JSON.stringify(result.message));
                                this.setState((currentState) => {
                                    return {
                                        activeBreeds: currentState.activeBreeds.concat(breedMaster),
                                    }
                                    
                                })
                            }

                        } 
                    },
                    (error) => {
                    this.setState({
                        loading: true,
                        error
                    });
                    }
                )
                }   

        }
    }

    componentDidUpdate() {
        console.log("---DidUpdate" + this.state.breeds);
    }

    // Make api call once component is mounted, we get the list of all the breeds. If had more time would have cached this too.
    componentDidMount() {
        fetch("https://dog.ceo/api/breeds/list/all")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    breeds: result.message,
                    loading: false,
                });        
            },
            (error) => {
            this.setState({
                loading: true,
                error
            });
            }
        )
    }

    render() {
        if (this.state.loading) {
            return <Loading/>
        } else {
            return <BreedSelect activeList={this.state.activeBreeds} onToggleBreed={this.handleToggleBreed} list={this.state.breeds} />
        }
        
    }

}

export default Breeds;