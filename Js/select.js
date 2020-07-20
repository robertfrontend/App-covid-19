const apiSelect = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest';
fetch(apiSelect)
    .then(res => {
        return res.json()
    })
    .then(datos => {

        htmlSelect = '';

        htmlSelect =`
            <option value="0" id="todos" >Selecionar Pais</option>
        `; 

        // Mostrar los paises en el Select
        datos.forEach(paises => {

            // destructuring para mostrar los paises en el select
            const {countryregion, countrycode, provincestate } = paises

            if(countrycode !== undefined) {
                htmlSelect += `
                    <option id="" value='${countrycode["iso2"]},${countrycode["iso3"]}'>
                        ${countryregion} ${provincestate}
                    </option>
                `;
            }
        })

        document.getElementById('selecionPaises').innerHTML = htmlSelect

        const select = document.querySelector('#selecionPaises')
        select.addEventListener('change', () => {
            
            const valorSelect = select.value;

            valoresISO =valorSelect.split(',')

            valorISO1 = valoresISO[0]

            valorISO2 = valoresISO[1]

            // obtener el ISO selecionado
            const linkBusc = 
            `https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?iso2=${valorISO1}&iso3=${valorISO2}`
            
            fetch(linkBusc)
            .then(respuesta => {
                return respuesta.json()
            })
            
            .then(data => {
                let htmlResultss = '';

                data.forEach(resultPais => {

                    // destructuring de la api
                    const {countryregion, countrycode, confirmed,deaths,recovered,
                        provincestate} = resultPais

                            htmlResultss += `
                            <div class="card text-dark" id="tarjeta" >
                            <div class="card-body">
                                <div >
                                    <h4 class="card-title">
                                        <span class="">
                                        </span>
                                        ${countryregion}
                                    </h4>
                                    <h5>
                                        <span>
                                            Provincia/Estado
                                        </span>
                                        ${provincestate}
                                    </h5> 
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
                })
                document.querySelector('.resultados-paises').innerHTML = htmlResultss;
            })

            // enviar error
            .catch(() => {
                if(status === 400){
                    alert('Hubo un error')
                }
            })

            // Mostrar boton de resetear la pagina
            // cuando  se seleciona un pais
            let restart = document.querySelector('.restart')
            function setResetear() {
                setTimeout(() => {
                    restart.classList.add('restartOpen')
                },2000)
            }
            
            setResetear();

        } )
    })