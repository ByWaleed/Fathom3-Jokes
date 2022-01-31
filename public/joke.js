window.addEventListener('load', function () {
    const setup = document.getElementById('setup')
    const punchline = document.getElementById('punchline')
    const punchline_btn = document.getElementById('punchline_btn')
    const category = document.getElementById('category')

    getJoke()
}, false);

const getJoke = () => {
    setLoading()
    fetch('/random')
        .then((response) => response.json())
        .then((joke) => showJoke(joke))
}

const showJoke = (joke) => {
    setup.innerHTML = joke.setup
    punchline.innerHTML = joke.punchline
    category.innerHTML = joke.category

    punchline.style.display = 'none'
    punchline_btn.style.display = 'block'
}

const showPunchline = () => {
    punchline.style.display = 'block'
    punchline_btn.style.display = 'none'
}

const setLoading = () => {
    setup.innerHTML = "Getting a new joke..."
    punchline.style.display = 'none'
    punchline_btn.style.display = 'none'
}
