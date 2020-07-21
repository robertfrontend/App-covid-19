const dcarga = `
<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
`;

class MyClass {
    myHtml(confirmed,deaths,recovered) {
        htmlTotal += `
                <div class="">
                    <p class="text-warning">
                        ${Intl.NumberFormat().format(confirmed)}
                    </p>
                    <h3>Casos Confirmados</h3>
                </div>
                <div>
                    <p class="text-danger" >
                        ${Intl.NumberFormat().format(deaths)}
                    </p>
                    <h3>Muertes</h3>

                </div>
                <div >
                    <p class="text-success" >
                    ${Intl.NumberFormat().format(recovered)}
                    </p>
                    <h3>Recuperados</h3>
                </div>
        `;
    };
    todosPaises(countryregion, provincestate, confirmed, deaths,recovered, lastupdate) {
        htmlRes += `
            <div class="card text-dark" id="tarjeta">
                <div class="card-body">
                    <div >
                        <h4 class="card-title">
                            <span class="">
                            </span>
                            ${countryregion} ${(provincestate.trim()!=="")? `(${provincestate})`:""}
                        </h4>                     
                    </div>
                    <div class="" id="da">
                        <p class="card-text text-warning ">
                            <span class="text-light">Confirmados:</span>
                            ${Intl.NumberFormat().format(confirmed)} 
                        </p>
                        <p class="card-text text-danger">
                            <span class="text-light">Muertes: </span>
                            ${Intl.NumberFormat().format(deaths)} 
                        </p>
                        <p class="card-text  text-success " >
                            <span class="text-light">Recuperados:</span>
                            ${Intl.NumberFormat().format(recovered)} 
                        </p>
                        <p class="card-text  text-primary " >
                            <span class="text-light">Actualizado:</span>
                            ${lastupdate} 
                        </p>
                    </div>
                </div>
            </div>          
        `;
    }
};

window.onload = () => {
    // mostrar el total del mundo

    // link de la api
    const linkTotal = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief';
    // spiner de carga
    document.querySelector('.d-carga ').innerHTML = dcarga;

    fetch(linkTotal)
        .then(res => {
            return res.json();
        })
        .then(data => {

            const {confirmed, deaths, recovered} = data
            htmlTotal = '';

            const newHtml = new MyClass();

            newHtml.myHtml(
                confirmed, 
                deaths, 
                recovered
            );

            // mandamos los datos al html
            document.querySelector('.total').innerHTML = htmlTotal;
        });


    // mostrar todos los paises
    todosLosPaises();
    
    function todosLosPaises() {
        //link de la api
        const linkApi = 
        `https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest`;

        // llamar api
        fetch(linkApi)
            .then(respuesta => {
                return respuesta.json();
            })
            .then(datos => {
                htmlRes = ''
                const countriesList = []; //array que contendra los nombres de los paises//
                datos.forEach(paises => {
                    countriesList.push(paises.countryregion); //agregabdo paises al array 

                    const {countryregion,provincestate, confirmed, deaths, recovered} = paises;
                    
                    const newHtml = new MyClass();

                    let lastupdate = paises.lastupdate;

                    //ultima actualización fecha y hora
                    //lastupdate = `${lastupdate.substring(0,10)}, ${lastupdate.substring(11,19)}`;

                    //ultima actualación solo fecha
                    lastupdate = `${lastupdate.substring(0,10)}`;

                    newHtml.todosPaises(
                        countryregion, provincestate, confirmed,
                        deaths, recovered, lastupdate
                    )

                });

                //contabilizando paises y paises con algunas pronvincias
                const numberOfCountriesWithProvinces = countriesList.length;
                console.log(numberOfCountriesWithProvinces);
                document.getElementById("number-of-countries-with-provinces").innerHTML = `${numberOfCountriesWithProvinces}`;

                //solo se estan contabilizando los paises , no se estan contando las provincias
                const countriesListWithoutRepetition = new Set(countriesList); //agregando paises a un set para eliminar los repetidos
                const numberOfCountries = countriesListWithoutRepetition.size; //obteniendo cantidad de paises
                document.getElementById("number-of-countries").innerHTML = `${numberOfCountries}`;

                document.querySelector('.resultados-paises').innerHTML = htmlRes;
                document.querySelector('.d-carga ').innerHTML = ''
    
            });



    }// fin function todosLosPaises
}

function clickTarjetas() {
    let tarjeta = document.querySelector('#tarjeta')

    tarjeta.addEventListener('click', (e) => {
        e.preventDefault();
        if(e.target) {
            e.target.parentElement.parentElement.remove()
        }
    })
}

setTimeout(() => {
    clickTarjetas()
},1000)