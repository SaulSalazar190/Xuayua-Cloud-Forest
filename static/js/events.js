/* ==========================================================================
   DYNAMIC COMMUNITY EVENTS - GOOGLE SHEETS & FALLBACKS
   ========================================================================== */

// Local fallback events list in case sheet fetch fails
const localFallbackEvents = {
    es: [
        {
            title: "Próximamente nuevos eventos",
            date: "-",
            place: "Juayúa",
            desc: "Consulta nuevamente pronto.",
            img: "https://plus.unsplash.com/premium_photo-1661963718103-0de1844b6076?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ],
    en: [
        {
            title: "New events coming soon",
            date: "-",
            place: "Juayúa",
            desc: "Please check back soon.",
            img: "https://plus.unsplash.com/premium_photo-1661963718103-0de1844b6076?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ]
};

// Configuration of the public Google Sheet (published as CSV)
const GOOGLE_SHEET_CSV_URL = "https://opensheet.elk.sh/1NkATxu_wiJIm-9pdj7iGn-4qdxgNrNfd-6ekaVm6nq4/Eventos";

async function initDynamicEvents() {
    const loader = document.getElementById('events-loader');
    const wrapper = document.getElementById('events-wrapper');

    if (!loader || !wrapper) return;

    try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) {
            throw new Error("Unable to fetch Google Sheets");
        }
        const data = await response.json();
        console.log(data);

        if (!data || data.length === 0) {
            throw new Error("No events found");
        }

        renderEvents(data, wrapper, loader);
    } catch (error) {
        console.warn("Google Sheets API failed. Falling back to local events database.", error);
        renderEvents(localFallbackEvents[currentLanguage], wrapper, loader, true);
    }
}
function renderEvents(eventsList, wrapper, loader, isLocal = false) {
    wrapper.innerHTML = "";
    
    eventsList.forEach(event => {
        let title = event.title;
        let date = event.date;
        let place = event.place;
        let desc = event.desc;
        const img = event.img;

        if (!isLocal) {
            title = currentLanguage === 'es' ? event.title : event.titleEn;
            date = currentLanguage === 'es' ? event.date : event.dateEn;
            place = currentLanguage === 'es' ? event.place : event.placeEn;
            desc = currentLanguage === 'es' ? event.desc : event.descEn;
        }

        const card = document.createElement('article');
        card.className = 'event-card glass-panel';
        card.innerHTML = `
            <img src="${img}" alt="${title}" class="event-img" loading="lazy">
            <div class="event-details">
                <div class="event-meta">
                    <span class="event-date"><i class="fa-regular fa-calendar"></i> ${date}</span>
                    <span class="event-place"><i class="fa-solid fa-location-dot"></i> ${place}</span>
                </div>
                <h3>${title}</h3>
                <p>${desc}</p>
            </div>
        `;
        wrapper.appendChild(card);
    });

    loader.style.display = 'none';
    wrapper.style.display = 'grid';
    wrapper.style.opacity = '0';
    setTimeout(() => {
        wrapper.style.transition = 'opacity 0.5s ease';
        wrapper.style.opacity = '1';
    }, 50);
}

// Rerender events on language switches
document.addEventListener('languageChanged', () => {
    initDynamicEvents();
});
initDynamicEvents();
