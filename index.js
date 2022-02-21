function sleep(timeInMillisenconds){
    return new Promise((resolve, reject) => {
          setTimeout(resolve, timeInMillisenconds)  
    })
}

const getShows = async () => {
    const loaderContainer = document.querySelector('#loader-container');
    loaderContainer.classList.remove('hidden')
     const value = document.querySelector('#search-input').value;
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${value}`);
    const shows = await response.json();

    const showDOMElements = shows.filter(shlomo => shlomo.show?.image).
    map(showElement => {
        const div = document.createElement('div');
        div.classList.add('single-show');
        const nameDiv = document.createElement('div');
        nameDiv.textContent = showElement.show.name;
        div.append(nameDiv);
        const image = document.createElement('img');
        image.setAttribute('src',showElement.show.image.medium );
        div.append(image);
        return div;
    });

    
    await sleep(5000);

    loaderContainer.classList.add('hidden')

    showDOMElements.forEach(element => {
        document.querySelector('#results-area').append(element);
        
    });
    
      
    // const promise = fetch(`https://api.tvmaze.com/search/shows?q=${value}`);
    // promise.then(response => response.json())
    // .then(shows => {
    //     const htmlString = shows.map(show => `<div
    //  class="single-show">
    // <div class="show-name">${show.show.name}</div>
    //     <img src="${show.show.image?.medium}"/>
    // </div>`).join('');

    // document.querySelector('#results-area').
    //     innerHTML = htmlString;
    // });


}

document.querySelector('#search-button').addEventListener('click',(evt) => {
    console.log('click event', evt);
    getShows();
} );