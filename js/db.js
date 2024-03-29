//offline data
db.enablePersistence().catch(err => {
    if (err.code == 'failed-precondition') {
        //could be multiple tabs opened at once
        console.err('Persistence failed')
    } else if (err.code == 'unimplemented') {
        //no browser support
        console.log('persistence is not available')
    }
})

//real-time listener
db.collection('recipes').onSnapshot((snapshot) => {
    console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        console.log(change, change.doc.data(), change.doc.id);
        if (change.type === "added") {
            renderRecipe(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            removeRecipe(change.doc.id)
        }
    });
});

//adding recipes
const form = document.querySelector('form')
form.addEventListener('submit', evt => {
    evt.preventDefault()
    const recipe = {
        title: form.title.value,
        ingredients: form.ingredients.value
    }
    db.collection('recipes').add(recipe)
        .catch(err => console.log(err))

    form.title.value = ''
    form.ingredients.value = ''
})

const recipeContainer = document.querySelector('.recipes')
recipeContainer.addEventListener('click', evt => {
    if (evt.target.tagName === 'I') {
        const id = evt.target.getAttribute('data-id')
        db.collection('recipes').doc(id).delete()
    }
})