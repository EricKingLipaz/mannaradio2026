const xhr = new XMLHttpRequest()

const bibleBooks = document.querySelector(".bible-books")
const bibleChapters = document.querySelector(".bible-chapters")
const verses = document.querySelector(".verse")

const mtBook = document.querySelector("#mtBook")
const mtChapter = document.querySelector("#mtChapter")

xhr.onload = function(){
    if(this.status === 200){
        let resObj = JSON.parse(this.responseText)

        bibleBooks.innerHTML = ''
        bibleChapters.innerHTML = ''

        for(let i = 0; i <= 49; i++){
            verses.innerHTML += `
                <h4 class="verse-num">${i + 1}</h4>
                <p class="verse-text">${resObj[0].chapters[0][i]}</p>
            `
            bibleChapters.innerHTML += `
                <option>${i + 1}</option>
            `
        }

        for(let i = 0; i < resObj.length; i++){
            bibleBooks.innerHTML += `
                <option>${resObj[i].name}</option>
            `
            bibleBooks.addEventListener("change", function(){
                mtBook.value = bibleBooks.options[bibleBooks.selectedIndex].index
                mtChapter.value = resObj[mtBook.value].chapters.length
                verses.innerHTML = ''
                bibleChapters.innerHTML = ''

                for(let i = 1; i <= mtChapter.value; i++){
                    bibleChapters.innerHTML += `
                        <option>${i}</option>
                    `
                }

                for(let i = 0; i < resObj[mtBook.value].chapters[0].length; i++){
                    verses.innerHTML += `
                        <h4 class="verse-num">${i + 1}</h4>
                        <p class="verse-text">${resObj[mtBook.value].chapters[0][i]}</p>
                    `
                }
            })

            bibleChapters.addEventListener("change", function(){
                mtChapter.value = bibleChapters.options[bibleChapters.selectedIndex].index
                verses.innerHTML = ''

                for(let i = 0; i < resObj[mtBook.value].chapters[mtChapter.value].length; i++){
                    verses.innerHTML += `
                        <h4 class="verse-num">${i + 1}</h4>
                        <p class="verse-text">${resObj[mtBook.value].chapters[mtChapter.value][i]}</p>
                    `
                }
            })

        }
    }else{
        console.warn("Did Not Receive 200 OK from Response")
    }

}

xhr.open("get", "js/libraries/en_kjv.json")
xhr.send()