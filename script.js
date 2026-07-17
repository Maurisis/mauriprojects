const projectsContainer = document.getElementById("projects");
const searchInput = document.getElementById("search");
const template = document.getElementById("project-template");


let projects = [];


// Cargar proyectos

async function loadProjects(){

    try{

        const response = await fetch("proyectos.json");

        projects = await response.json();


        displayProjects(projects);


    }catch(error){

        console.error("Error cargando proyectos:", error);

        projectsContainer.innerHTML = `
            <p>
            No se pudieron cargar los proyectos.
            </p>
        `;

    }

}



// Mostrar proyectos

function displayProjects(list){


    projectsContainer.innerHTML = "";


    if(list.length === 0){

        projectsContainer.innerHTML = `

        <div class="empty">

            <h2>No se encontraron proyectos</h2>

            <p>
            Prueba con otra búsqueda.
            </p>

        </div>

        `;

        return;

    }



    list.forEach(project =>{


        const card = template.content.cloneNode(true);


        const image = card.querySelector("img");
        const title = card.querySelector("h2");
        const description = card.querySelector(".description");
        const tags = card.querySelector(".tags");
        const version = card.querySelector(".version");
        const button = card.querySelector(".download");



        image.src = project.imagen;
        image.alt = project.nombre;


        title.textContent = project.nombre;


        description.textContent = project.descripcion;


        version.textContent = project.version || "";



        button.href = project.link;



        // Crear etiquetas

        if(project.tags){


            project.tags.forEach(tag =>{


                const span = document.createElement("span");

                span.className = "tag";

                span.textContent = tag;


                tags.appendChild(span);


            });


        }



        projectsContainer.appendChild(card);


    });


}



// Buscador

searchInput.addEventListener("input",()=>{


    const text = searchInput.value
        .toLowerCase()
        .trim();



    const filtered = projects.filter(project =>{


        const content = `

        ${project.nombre}

        ${project.descripcion}

        ${(project.tags || []).join(" ")}

        `.toLowerCase();



        return content.includes(text);


    });



    displayProjects(filtered);


});




// Iniciar página

loadProjects();