const linkTotal = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief';

fetch(linkTotal)
    .then(res => {
        return res.json();
    })
    .then(data => {
        htmlTotal = '';        
        htmlTotal += `
                <p class="text-warning" >
                    <span>Confirmados:</span>
                    ${data.confirmed}
                </p>
                <p class="text-danger">
                    <span>Muertes:</span>
                    ${data.deaths}
                </p>
                <p class="text-success" >
                    <span>Recuperados:</span>
                    ${data.recovered}
                </p>
        `;
        document.querySelector('.total').innerHTML = htmlTotal;
    });


//link de la api
const linkApi = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest'

// llamar api
fetch(linkApi)
    .then(respuesta => {
        return respuesta.json();
    })
    .then(datos => {
        htmlRes = '';

        datos.forEach(paises => {
            htmlRes += `
                <div class="card text-dark"  id="tarjeta" >
                    <div class="card-body">
                        <div >
                            <h4 class="card-title">
                                <span class="">
                                </span>
                                ${paises.countryregion}
                            </h4>                     
                        </div>
                        <div class="" id="da">
                            <p class="card-text text-warning ">
                                <span class="">Confirmados:</span>
                                ${paises.confirmed} 
                            </p>
                            <p class="card-text text-danger">
                                <span class="">Muertes: </span>
                                ${paises.deaths} 
                            </p>
                            <p class="card-text  text-success " >
                                <span class="">Recuperados:</span>
                                ${paises.recovered} 
                            </p>
                        </div>
                    </div>
                </div>
            
            `;
        });
        document.querySelector('.paises').innerHTML = htmlRes;
    });



    // <a href="#" class="card-link">Card link</a>
    // <a href="#" class="card-link">Another link</a>

const btnDominicana = document.querySelector('#btnDom')
btnDominicana.addEventListener('click', domRespuesta)

const linkDom = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?iso2=DO&iso3=DOM'

function domRespuesta() {
    fetch(linkDom)
        .then(respuesta => {
            return respuesta.json();
        } )
        .then(data => {
            let htmlDOP = '';

            data.forEach(domi => {
                htmlDOP += `
                    <div class="card text-white" id="tarjeta" >
                    <div class="card-body">
                        <div >
                            <h4 class="card-title">
                                <span class="">
                                </span>
                                ${domi.countryregion}
                            </h4>                      
                        </div>
                        <div class="" id="da">
                            <p class="card-text m-0 text-warning ">
                                <span class=" text-white">Confirmados:</span>
                                ${domi.confirmed} 
                            </p>
                            <p class="card-text m-0 text-danger">
                                <span class=" text-white">Muertes: </span>
                                ${domi.deaths} 
                            </p>
                            <p class="card-text r m-0 text-success " >
                                <span class=" text-white">Recuperados:</span>
                                ${domi.recovered} 
                            </p>
                        </div>
                    </div>
                </div>
                `;
            }) 
            document.querySelector('.paises').innerHTML = htmlDOP
        })

}