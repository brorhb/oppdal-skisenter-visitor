<div class="links">
    <div class="max-width-wrapper">
        <h2>Gå videre</h2>
        <div class="group-container">
            <div class="group">
                <img src="../../assets/rest.png" alt="oppdalskisenter-logo"/>
                <h3>Finn informasjon om åpningstider og parkering</h3>
                <p>Planlegg turen din til Oppdal Skisenter! Her finner du informasjon om parkering, åpningstider og løypekart. </p>
                <button on:click="{() => window.location.href = 'https://www.oppdalskisenter.no/%C3%A5pningstider'}">Les mer</button>
            </div>
            <div class="group">
                <img src="../../assets/ski.png" alt="oppdalskisenter-logo"/>
                <h3>Skikjøringen blir enda morsommere når du utvikler ferdighetene dine</h3>
                <p>Vi har instruktører for deg som ønsker å finpusse på teknikken eller vil prøve noe nytt som snowboard eller telemark. </p>
                <button on:click="{() => window.location.href = 'https://www.oppdalskisenter.no/skiskole'}">Les mer</button>
            </div>
            <div class="group">
                <img src="../../assets/nav.png" alt="oppdalskisenter-logo"/>
                <h3>Sjekk ut spisestedene i skisenteret</h3>
                <p>The Hill 1125, har blitt en av Oppdals nye attraksjoner. Her serveres italiensk pizza, bakt i vedfyrt pizzaovn...</p>
                <button on:click="{() => window.location.href = 'https://www.oppdalskisenter.no/mat-og-drikke'}">Les mer</button>
            </div>
        </div>
    </div>
</div> 

<style>
.links {
    background: #F4F8FF;
    padding: 4.5rem 0 4.5rem 0;
    margin: 4rem auto 4rem auto;
}
.links > div > h2 {
    padding: 0 0 1rem 0;
}
.group-container {
    display: flex;
    margin: 0 1rem 0 1rem;
}
.group {
    display: flex;
    flex-direction: column;
}
.group > h3 {
    padding: 1rem 0 0.5rem 0;
}

.group > img {
    max-width: 355px;
    height: auto;
}
.group > button {
    width: 110px;
    height: 40px;
    border: none;
    background: #DBE3F5;
    border-radius: 25px;
    font-size: 16px;
    color: #2C3B6C;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0 1rem 0;
}

@media only screen and (max-width: 1000px) {
    .group-container {
        flex-direction: column;
    }
    .links > div > h2 {
        padding: 0 0 1rem 0;
        margin: 0 1rem 0 1rem;
    }
    .group > img {
        max-width: 100%;
        height: auto;
    }
}
</style>