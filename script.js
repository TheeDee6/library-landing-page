
// get ids and values
    const displayArea = document.getElementById('displayArea');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('searchInput');

    // default displays
    const defaultDisplays = ['Fourth Wing', 'The Women'];

    // Handle search form submission
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputValue = searchInput.value.trim();
        displayArea.innerHTML = '';
        fetchRequest(inputValue);
        searchInput.value = '';
    });

    async function fetchRequest(bookTitle) {
        const formatString = bookTitle.toUpperCase();
        const apiParam = encodeURIComponent(formatString);
        const url = `https://all-books-api.p.rapidapi.com/title/${apiParam}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'c2e3d52b3cmsh6a43b23b0a94b92p122436jsnc37d3fa97dc8',
                'x-rapidapi-host': 'all-books-api.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            displayResponse(result);
            // console.log(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            displayArea.innerHTML += `<p>Failed to load data for ${bookTitle}.</p>`;
        }
    }

    
        function displayResponse(data) {
            const title = data.bookTitle;
            const image = data.bookImage;
            const description = data.bookDescription;
            const author = data.bookAuthor;
            const publisher = data.bookPublisher;
            const buyHere = data.amazonBookUrl;
            const isbn = data.bookIsbn;
            const displayContent = `
                    <div class="card">
                        <h4>${title}</h4>
                        <p>${author}</p>
                        <p>${publisher}</p>
                        <p>${isbn}</p>
                        <p>${description}</p>
                        <img src="${image}" alt="${title}" height="73">
                        <p><a href="${description}">Buy Here </a></p>
                    </div>
            `;
            displayArea.innerHTML += displayContent;
        }

        // Fetch weather data for default cities on page load
            defaultDisplays.forEach(data => fetchRequest(data));
