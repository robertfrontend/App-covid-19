const dcarga = `
<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
`;

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

            // reteenmos los datos        
            htmlTotal += `
                    <div>
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
                    <div>
                        <p class="text-success" >
                        ${Intl.NumberFormat().format(recovered)}
                        </p>
                        <h3>Recuperados</h3>
                    </div>
            `;
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
                datos.forEach(paises => {
    
                    const {countryregion, confirmed, deaths, recovered} = paises;
    
                    htmlRes += `
                        <div class="card text-dark" id="tarjeta" >
                            <div class="card-body">
                                <div >
                                    <h4 class="card-title">
                                        <span class="">
                                        </span>
                                        ${countryregion}
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
                                </div>
                            </div>
                        </div>          
                    `;
                });
                document.querySelector('.resultados-paises').innerHTML = htmlRes;
                document.querySelector('.d-carga ').innerHTML = ''
    
            });
    }// fin function todosLosPaises
}


