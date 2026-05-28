/* ==========================================================================
   INTERACTIVE MAP CIRCUITS - RUTA DE LAS FLORES
   ========================================================================== */

const townDetails = {
    es: {
        nahuizalco: {
            title: "Nahuizalco",
            tag: "PUEBLO ARTESANAL",
            desc: "Famoso por su rica tradición en artesanías tejidas de mimbre, tule y madera. Destaca por su mercado nocturno único iluminado con velas tradicionales y su profunda herencia indígena náhuat.",
            weather: "20°C - 25°C",
            feats: ["Mercado nocturno tradicional con velas", "Talleres de artesanía de mimbre y madera", "Centro de desarrollo cultural indígena"]
        },
        salcoatitan: {
            title: "Salcoatitán",
            tag: "ARTE Y GASTRONOMÍA",
            desc: "Ubicado a poca distancia de Juayúa. Es célebre por sus deliciosos platillos a base de yuca sancochada o frita servida en hojas de huerta, y su histórico templo colonial y centenario árbol de ceiba.",
            weather: "19°C - 24°C",
            feats: ["Especialidad en platillos típicos de Yuca", "Galerías de arte y artesanía local", "Iglesia colonial histórica de San Miguel"]
        },
        juayua: {
            title: "Juayúa",
            tag: "UBICACIÓN PRINCIPAL",
            desc: "El centro vital del circuito turístico. Es famoso por sus increíbles atractivos de aventura natural como Los Chorros de la Calera, los recorridos de buggies y el renombrado Festival Gastronómico de fin de semana.",
            weather: "18°C - 23°C",
            feats: ["Festival gastronómico semanal", "Cascadas de agua pura natural", "Tours en buggies y cafetales"]
        },
        apaneca: {
            title: "Apaneca",
            tag: "AVENTURA EXTREMA",
            desc: "El pueblo a mayor altitud de El Salvador (1,455 msnm). Ofrece un clima sumamente fresco y neblinoso, ideal para el cultivo de café de alta gama. Famoso por su laberinto natural y su mirador de cristal.",
            weather: "15°C - 20°C",
            feats: ["Atracción turística El Laberinto de Albania", "Laguna Verde cráter volcánico", "Miradores de cristal panorámicos"]
        },
        ataco: {
            title: "Concepción de Ataco",
            tag: "PINTORESCO Y MURALES",
            desc: "Un destino de ensueño caracterizado por sus coloridos y expresivos murales urbanos que adornan fachadas completas. Es muy popular por sus acogedoras cafeterías gourmet y sus tiendas de telares de pedal.",
            weather: "17°C - 22°C",
            feats: ["Grandiosos murales pintorescos de arte urbano", "Cafés y baristas premiados internacionalmente", "Talleres de telares artesanales de pedal"]
        }
    },
    en: {
        nahuizalco: {
            title: "Nahuizalco",
            tag: "CRAFT VILLAGE",
            desc: "Famous for its rich tradition of hand-woven wicker, tule, and wood crafts. Highlighted by its unique candle-lit night market and deep indigenous Pipil-Nahuat heritage.",
            weather: "20°C - 25°C",
            feats: ["Traditional candle-lit night market", "Wicker and wood craft workshops", "Indigenous cultural preservation center"]
        },
        salcoatitan: {
            title: "Salcoatitán",
            tag: "ART & GASTRONOMY",
            desc: "Located just minutes from Juayúa. It is celebrated for its delicious traditional cassava (yuca) dishes served on banana leaves, its colonial church, and an iconic centennial ceiba tree.",
            weather: "19°C - 24°C",
            feats: ["Cassava (Yuca) traditional food specialty", "Local art galleries and mural spots", "Historic colonial church of San Miguel"]
        },
        juayua: {
            title: "Juayúa",
            tag: "MAIN CABIN HUB",
            desc: "The vital heart of the tourist route. It is famous for its incredible natural adventure sites like the Chorros de la Calera waterfalls, buggy rentals, and the renowned weekend Gastronomic Festival.",
            weather: "18°C - 23°C",
            feats: ["Weekly street food festival", "Pure cold natural spring waterfalls", "Buggy tours & historic coffee farms"]
        },
        apaneca: {
            title: "Apaneca",
            tag: "HIGH ADVENTURE",
            desc: "The highest town in El Salvador (1,455m). It enjoys a refreshing, misty climate perfect for premium high-altitude coffee cultivation. Famous for its giant pine maze and glass-bottom viewpoints.",
            weather: "15°C - 20°C",
            feats: ["Albania's natural pine maze adventure", "Laguna Verde volcanic crater lagoon", "Panoramic glass skywalk viewpoints"]
        },
        ataco: {
            title: "Concepción de Ataco",
            tag: "PICTURESQUE COFFEE TOWN",
            desc: "A dreamlike destination characterized by colorfully painted urban murals that decorate entire building facades. Highly popular for its cozy gourmet coffee houses and traditional hand-loom textile workshops.",
            weather: "17°C - 22°C",
            feats: ["Stunning urban wall murals", "Award-winning specialty barista cafes", "Traditional pedal-loom textile shops"]
        }
    }
};

function initInteractiveMap() {
    const mapTowns = document.querySelectorAll('.map-town');

    mapTowns.forEach(town => {
        town.addEventListener('click', () => {
            mapTowns.forEach(t => t.classList.remove('active'));
            town.classList.add('active');

            const townName = town.getAttribute('data-town');
            updateMapInfo(townName);
        });
    });

    // Listen to custom language toggles
    document.addEventListener('languageChanged', (e) => {
        const activeTown = document.querySelector('.map-town.active');
        if (activeTown) {
            updateMapInfo(activeTown.getAttribute('data-town'));
        }
    });
}

function updateMapInfo(townKey) {
    const data = townDetails[currentLanguage][townKey];
    if (!data) return;

    const infoBox = document.getElementById('town-info-box');
    if (!infoBox) return;
    
    // Smooth transition
    infoBox.style.opacity = '0';
    infoBox.style.transform = 'translateY(10px)';

    setTimeout(() => {
        infoBox.querySelector('#town-info-tag').textContent = data.tag;
        infoBox.querySelector('h3').textContent = data.title;
        infoBox.querySelector('p').textContent = data.desc;
        infoBox.querySelector('div[style*="color"]').innerHTML = `<i class="fa-solid fa-cloud-sun"></i> ${data.weather}`;
        
        const featElements = infoBox.querySelectorAll('.town-feature span');
        if (featElements.length === 3 && data.feats.length === 3) {
            featElements[0].textContent = data.feats[0];
            featElements[1].textContent = data.feats[1];
            featElements[2].textContent = data.feats[2];
        }

        infoBox.style.opacity = '1';
        infoBox.style.transform = 'translateY(0)';
    }, 250);
}
