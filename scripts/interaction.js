var aleatorio = Math.round(Math.random()*5);

  function togglePokeball(event) {
    event.preventDefault();
    console.log(aleatorio);

    const pokeball = document.getElementById('pokeball-1');
    if (pokeball.classList.contains('open')) {
      pokeball.classList.remove('open');
      retrieve.restart();
    } else {
      pokeball.classList.add('open');
      spawn.restart();
    }
  }

  const spawn = gsap
  .timeline(
    {
      onStart: function() {
        document.querySelector('.summon').classList.remove('hidden');
        document.querySelector('.summon').style.filter = 'url(#spawn-line)';
        document.querySelector('.pokemon img').style.filter = 'url(#spawn-pokemon)';
      },
      onComplete: function() {
        document.querySelector('.summon').classList.add('hidden');
        document.querySelector('.summon').style.filter = 'none';
        document.querySelector('.pokemon img').style.filter = 'none';
      },
      paused: true,
    },
  ) 
  .set('.path', {
    attr: {
      'stroke-dashoffset': '100%',
    },
  })
  .to('.path', 
      {
    delay: 0.2,
    duration: 0.2,
    attr: {
      'stroke-dashoffset': '0%',
    },
  },
  )
  .to('.path',
      {
    duration: 0.2,
    attr: {
      'stroke-dashoffset': '-100%',
    },
  },
  )
  .from('.pokemon img', 
        {
    duration: 0.2,
    scale: 0,
  },
  0.4,
  )
  .to('#pokemon-displacement',
      {
    duration: 0.8,
    attr: {
      scale: 0
    },
    ease: 'none'
  },
  0.2
  )
  .to('#pokemon-turbulence',
      {
    duration: 0.8,
    attr: {
      baseFrequency: 0.03
    },
    ease: 'none'
  },
  0.2
  )
  .from('.tags',
        {
    opacity: 0,
  },
  0.4
  );

  const retrieve = gsap
  .timeline(
    {
      onStart: function() {
        document.querySelector('.summon').classList.remove('hidden');
        document.querySelector('.summon').style.filter = 'url(#retrieve-line)';
        document.querySelector('.pokemon img').style.filter = 'url(#retrieve-pokemon)';
      },
      onComplete: function() {
        document.querySelector('.summon').classList.add('hidden');
        document.querySelector('.summon').style.filter = 'none';
        document.querySelector('.pokemon img').style.filter = 'none';
      },
      paused: true,
    },
  )
  .set('.path', {
    attr: {
      'stroke-dashoffset': '-100%',
    },
  })
  .to('.tags',
      {
    opacity: 0,
  }
  )
  .from('#retrieve-displacement',
        {
    duration: 0.3,
    attr: {
      scale: 0
    }
  },
  0,
  )
  .from('#retrieve-turbulence',
        {
    duration: 0.3,
    attr: {
      baseFrequency: 0
    }
  },
  0
  )
  .to('.pokemon img', 
      {
    scale: 0,
    duration: 0.2
  },
  0.3,
  )
  .to('.path', 
      {
    duration: 0.2,
    attr: {
      'stroke-dashoffset': '0%',
    },
  },
  0.35
  )
  .to('.path',
      {
    duration: 0.2,
    attr: {
      'stroke-dashoffset': '100%',
    },
  },
  0.45
  );


  const button = document.getElementById('toggle-button');
  button.addEventListener('click', togglePokeball);

  const name = document.querySelector('.name');
  const number = document.querySelector('.number');
  const species = document.querySelector('.species');
  const descrip = document.querySelector('.descrip');
  const fire = document.querySelector('.fire');
  const flying = document.querySelector('.flying');
  const height = document.querySelector('.height');
  const weight = document.querySelector('.weight');
  const image = document.querySelector('.image');


  if(aleatorio==1){
    name.innerText = "Pikachu";
    number.innerText = "#025";
    species.innerText = "Pokemon eléctrico";
    descrip.innerText = "Cuanto más potente es la energía eléctrica que genera este Pokémon, más suaves y elásticas se vuelven las bolsas de sus mejillas.";
    fire.innerText = "Eléctrico";
    flying.innerText = "Estático";
    height.innerText = "0,4";
    weight.innerText = "6,0 Kg";
    image.setAttribute("src", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png");
  }

  
  if(aleatorio==2){
    name.innerText = "Blastoise";
    number.innerText = "#009";
    species.innerText = "Pokemon de agua";
    descrip.innerText = "Para acabar con su enemigo, lo aplasta con el peso de su cuerpo. En momentos de apuro, se esconde en el caparazón.";
    fire.innerText = "Agua";
    flying.innerText = "Torrente";
    height.innerText = "1,6 m";
    weight.innerText = "85,5 Kg";
    image.setAttribute("src", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png");
  }

  
  if(aleatorio==3){
    name.innerText = "Rattata";
    number.innerText = "#019";
    species.innerText = "Pokemon normal";
    descrip.innerText = "Es propenso a hincar los incisivos en cualquier cosa que se le ponga por delante. Si se ve alguno, seguramente haya cuarenta cerca.";
    fire.innerText = "Fuga";
    flying.innerText = "Agallas";
    height.innerText = "0,3 m";
    weight.innerText = "3,5 Kg";
    image.setAttribute("src", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png");
  }

  if(aleatorio==3){
    name.innerText = "Vulpix";
    number.innerText = "#037";
    species.innerText = "Pokemon de fuego";
    descrip.innerText = "De pequeño, tiene seis colas de gran belleza. A medida que crece, le van saliendo más.";
    fire.innerText = "Fuego";
    flying.innerText = "Absorbe";
    height.innerText = "0.6 m";
    weight.innerText = "9,9 Kg";
    image.setAttribute("src", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/037.png");
  }

  if(aleatorio==5){
    name.innerText = "Persian";
    number.innerText = "#053";
    species.innerText = "Pokemon normal";
    descrip.innerText = "Trabar amistad con este Pokémon es una ardua tarea debido a su enorme orgullo. Cuando algo no le place, saca las uñas de inmediato.";
    fire.innerText = "Experto";
    flying.innerText = "Flexibilidad";
    height.innerText = "1 m";
    weight.innerText = "32 Kg";
    image.setAttribute("src", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/053.png");
  }

  if(aleatorio==6){
    name.innerText = "Psyduck";
    number.innerText = "#054";
    species.innerText = "Pokemon de agua";
    descrip.innerText = "Siempre padece dolores de cabeza. Tras desatar sus misteriosos poderes, la jaqueca remite unos instantes.";
    fire.innerText = "Humedad";
    flying.innerText = "Aclimatación";
    height.innerText = "0,8 m";
    weight.innerText = "19,6 Kg";
    image.setAttribute("src", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png");
  }
