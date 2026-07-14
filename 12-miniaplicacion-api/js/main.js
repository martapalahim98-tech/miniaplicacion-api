/* 
*Miniapliczcio de cerca de productes amb DummyJSON
*/

async function buscarProductes() {
    
    const cerca = prompt('Quin producte vols cercar')?.trim();

    if (!cerca){
        console.log('No s\'ha introduit ca criteri de cerca');
        return;
    }

    const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(cerca)}`;

    try{
        console.log('Cercant productes...')

        const resposta = await fetch(url);

        if (!resposta){
            throw new Error('Error en la petició');
        }

        const dades = await resposta.json();

        if(dades.products.length === 0){
            console.log('No sha trobat cap producte');
            return;
        }

        console.log(`Sha trobat ${dades.products.length} productes \n`);

        dades.products.forEach(producte => {console.log(`
            Nom: ${producte.title}
            Preu: ${producte.price}
            Stock: ${producte.stock}
            Valoració: ${producte.rating}
            --------------------------------
            `)
            
        });

    } catch (error){
        console.error(error);
        console.log('No s\'han pogut obtenir les dades');
    }
}


buscarProductes();