// latest url sent to the server - can be used to update upon page number change
let currentUrl = '';

// variable to store the current page number
let currentActivePage = 1

//initially hide the results container
$('.results-container').hide();


// ajax call
function callServer(url, data) {
    $.ajax({
        type: 'POST',
        url,
        dataType: 'json',
        data,
        success: function (response) {
            if (typeof response.results !== 'undefined') {
                createResults(response)
                createButtons(response.total_pages)
            } else {
                displayDetails(response)
            }
        },
        error: function (error) {
            console.error("An error occurred:", error);
        }
    });

}

//event handler for the search button click
$(document.forms[0]).on('submit', function (e) {
    e.preventDefault();
    const page = 1; //initially get the results from page 1
    const searchBoxValue = $('#searchBox').val();
    const url = $(this).attr('action').replace(':id', encodeURIComponent(searchBoxValue)).replace(':page', encodeURIComponent(page));
    currentUrl = $(this).attr('action').replace(':id', encodeURIComponent(searchBoxValue))
    callServer(url);
});

// event handler to update the results on genre selection
$('#genre').on('change', function (e) {
    const path = '/genre/:id/:page'
    const page = 1;
    const genre = $(this).val();
    const url = path.replace(':id', encodeURIComponent(genre)).replace(':page', encodeURIComponent(page));
    currentUrl = path.replace(':id', encodeURIComponent(genre));
    callServer(url);
});


// url updated on page number clicks
function onPageNumberClick() {

    $('.page-numbers').on('click', function () {

        const currentPage = parseInt($(this).val(), 10);
        currentActivePage = currentPage;
        const url = currentUrl.replace(':page', encodeURIComponent(currentPage))
        callServer(url)

    });
}

// create page buttons
function createButtons(totalPage) {
    $('.page-number-div').empty();
    let totalPages = totalPage;
    const maxVisibleButtons = 5;
    const currentPage = currentActivePage;
    if (totalPage > 500) {
        totalPages = 500;
    }

    if (totalPage > 1 && totalPages !== 1) {
        const pageDiv = $('<div>').addClass('page-number-div')
        $('.results-container').append(pageDiv)


        if (totalPages > maxVisibleButtons) {
            let startPage = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
            const endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);

            if (endPage - startPage < maxVisibleButtons) {
                startPage = endPage - maxVisibleButtons + 1;
            }

            if (startPage > 1) {
                const firstPageButton = $('<button>').addClass('page-numbers').attr('value', 1).html('1');
                $('.page-number-div').append(firstPageButton)
            }

            if (startPage > 2) {
                const ellipsisStart = $('<span>').html('...');
                $('.page-number-div').append(ellipsisStart)
            }

            for (let i = startPage; i <= endPage; i += 1) {
                const pageSelect = $('<button>').addClass('page-numbers').attr('value', i).html(i);
                if (i === currentActivePage) {
                    pageSelect.addClass('active-page');
                }
                $('.page-number-div').append(pageSelect)
            }

            if (endPage < totalPages - 1) {
                const ellipsisEnd = $('<span>').html('...');
                $('.page-number-div').append(ellipsisEnd)
            }

            if (endPage < totalPages) {
                const lastPage = totalPages;
                const lastPageButton = $('<button>').addClass('page-numbers').attr('value', lastPage).html(lastPage);
                $('.page-number-div').append(lastPageButton)
            }
        }

    } else {
        for (let i = 1; i <= totalPages; i += 1) {
            const pageSelect = $('<button>').addClass('page-numbers').attr('value', i).html(i);
            if (i === currentActivePage) {
                pageSelect.addClass('activePage');
            }
            $('.page-number-div').append(pageSelect)
        }
    }

    onPageNumberClick();
}

function createResults(data) {
    $('.results-container').empty();
    $('.search-results').empty();
    if (data.total_results > 0) {
        //show the results container
        $('.results-container').show();

        // 'x' for closing the results container
        const header = `<span class="close-x">&#x2715</span>
            <div class="search-results"></div>`

        $('.results-container').append(header)


        for (const movie of data.results) {
            if (movie.poster_path) {
                // if movie have a poster path and image
                image = `http://image.tmdb.org/t/p/w154/${movie.poster_path}`
            } else {
                // else a placeholder image is used
                image = 'images/ihcoaih.jpeg'
            }

            // display the movie and title
            const results = `<div class="results-container-two container">
                    <img class="movie-detail" 
                    title="${movie.title}" src="${image}" alt="image"
                        data-movie-id="${movie.id}">
                    <p title="${movie.title}" class="movie-detail" data-movie-id="${movie.id}">${movie.title}</p>
            </div>`

            $('.search-results').append(results)
        }
    } else {
        // if there are no results available
        $('.results-container').show();
        const header = `<span class="close-x">&#x2715</span>`
        const noResultsMessage = $('<p class=" d-inline-block">').text('No Results Found!!!')
        $('.results-container').append(header);
        $('.results-container').append(noResultsMessage);

    }
    clickToGetDetails();
    closeResults();
}

// event handle to close the results upon clicking the 'x'
function closeResults() {
    $('.close-x').on('click', function () {
        $('.results-container').hide();
        $('.search-results').empty();
        $('.results').empty();
        $('.page-number-div').empty();

    });
}

// function to  get the id of the movie to display the details
function clickToGetDetails() {
    $('.movie-detail').on('click', function () {
        let url = '/details/:id'
        const movieId = parseInt($(this).attr('data-movie-id'))
        url = url.replace(':id', encodeURIComponent(movieId));
        callServer(url)
    })
}