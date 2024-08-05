let characterDetails;
let counter = 1;
const searchBox = document.querySelector("input");

const fetchDetails = async (value) => {
    try {
        const config = { params: { name: value } }
        const response = await axios.get("https://dattebayo-api.onrender.com/characters", config);
        console.log(response.data);
        characterDetails = response.data.characters;
        console.log(characterDetails)
    }
    catch (e) {
        const img = document.createElement("img");
        img.classList.add("not-found");
        img.src = "https://www.hostinger.in/tutorials/wp-content/uploads/sites/2/2018/06/Error-404-on-Mozilla-Firefox.png";
        document.querySelector("main").append(img);
    }
}

const addDetails = function () {
    let main = document.createElement("main");
    document.body.append(main);
    if (characterDetails.length === 0) {
        console.log(0);
        const img = document.createElement("img");
        img.classList.add("not-found");
        img.src = "https://www.hostinger.in/tutorials/wp-content/uploads/sites/2/2018/06/Error-404-on-Mozilla-Firefox.png";
        main.append(img);
        return;
    }
    for (let result of characterDetails) {
        if (counter > 4) {
            main = document.createElement("main");
            document.body.append(main);
            counter = 1;
        }
        counter++;
        const section = document.createElement("section");
        let secFirst;
        const figcap = document.createElement("figcaption");

        try {
            secFirst = document.createElement("figure");
            secFirst.classList.add("sec-first");

            const img = document.createElement("img");
            if (result.images.length !== 0)
                img.src = result.images[0];
            else
                throw "yo";

            secFirst.append(img);
            secFirst.append(figcap);
            section.append(secFirst);
        }
        catch (e) {
            secFirst = document.createElement("div");
            secFirst.classList.add("sec-div");
            section.append(secFirst);
            secFirst.after(figcap);
            secFirst.innerHTML = "No image found";
            secFirst.style.border = "0.1px solid white";
            main.append(section);
        }
        finally {
            figcap.innerText = result.name;
            main.append(section);

            const newDiv = document.createElement("div");
            newDiv.classList.add("below-divs");
            newDiv.innerText = "Family/Creators";
            section.append(newDiv)
            const newUl = document.createElement("ul");

            if (result.family && Object.keys(result.family).length > 0) {
                for (let key of Object.keys(result.family)) {
                    const newLi = document.createElement("li");
                    newLi.innerText = `${key[0].toUpperCase()}${key.slice(1)}: ${result.family[key]}`;
                    newUl.append(newLi);
                    newDiv.after(newUl)
                    figcap.classList.add("divcap");
                }
            }
            else {
                figcap.classList.add("divcap");
                const h2 = document.createElement("h2");
                h2.innerText = "No Family found"
                section.append(h2);
            }

            const newDiv2 = document.createElement("div");
            newDiv2.classList.add("below-divs");
            newDiv2.innerText = "Jutsu";
            section.append(newDiv2);

            if (result.jutsu) {
                const para = document.createElement("p");
                for (let i = 0; i < result.jutsu.length; i++) {
                    if (i == result.jutsu.length - 1)
                        para.append(`${result.jutsu[i]}`);
                    else
                        para.append(`${result.jutsu[i]}, `);
                }
                section.append(para);
            }
            else {
                const h2 = document.createElement("h2");
                h2.innerText = "No Jutsu found"
                section.append(h2);
            }

            if (checkOverflow(section))
                fixOverflow(section);
        }
    }
    removeSectionOverflows();
}

function removeSectionOverflows() {
    const sections = document.querySelectorAll("section");
    for (let section of sections)
        if (checkOverflow(section))
            fixOverflow(section);
}

function checkOverflow(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function fixOverflow(element) {
    if (checkOverflow(element)) {
        element.classList.add('overflow');
    }
}

const clearDetails = function () {
    let mains = document.querySelectorAll("main");
    for (let main of mains)
        main.remove();
    counter = 1;
}

document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    await fetchDetails(searchBox.value);

    clearDetails();
    addDetails();
});
