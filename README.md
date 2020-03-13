

## Dog Image Repository 

Utilizing the React library I built multiple components for information to be utilized in browser. 

A small loading component that allows for smooth transitions while gathering data. 

A BreedSelect component that is a functional component which has most of methods handled by the Breed container. 

Made api call for name of dogs at componentMount, and instead of making call for all images (they are a lot), I made requests based on user input. That was the filtration system I used. It allowed for the least amount of data consumption, and I cached calls once they were called in order to speed up processes. Used flex and flex-wrap in order to acheive mobile responsivity without bootstrap.

I published site for easier access, but was not able to run tests.

Site could be found here for review: https://vrchavez.github.io/tech-challenge/
