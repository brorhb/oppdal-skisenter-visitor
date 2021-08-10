<div class="links">
        <h2>Gå videre</h2>
        <div class="group-container">
        <div class="group">
            <img src="../../assets/info.png" alt="oppdalskisenter-logo"/>
            <h3>Finn informasjon om åpningstider og parkering</h3>
            <p>Planlegg turen din til Oppdal Skisenter! Her finner du informasjon om parkering, åpningstider og løypekart. </p>
            <button>Les mer</button>
        </div>
        <div class="group">
            <img src="../../assets/nav.png" alt="oppdalskisenter-logo"/>
            <h3>Vil du ha hjelp til å navigere deg rundt i løypene?</h3>
            <p>Vi har lagt til løypene våre i open street map, så det blir enklere for deg å finne frem i bakken. </p>
            <button>Les mer</button>
        </div>
        <div class="group">
            <img src="../../assets/rest.png" alt="oppdalskisenter-logo"/>
            <h3>Sjekk ut spisestedene i skisenteret</h3>
            <p>The Hill 1125, har blitt en av Oppdals nye attraksjoner. Her serveres italiensk pizza, bakt i vedfyrt pizzaovn...</p>
            <button>Les mer</button>
        </div>
    </div>
</div> 

<style>
    .links {
        background: #F4F8FF;
        border-radius: 9px;
    }
    .links > h2 {
        padding: 16px;
    }
    .group-container {
        display: flex;
        align-items: center;
    }
    .group {
        display: flex;
        flex-direction: column;
    }
    .group > * {
        padding: 16px;
    }
    .group > img {
        max-width: 355px;
        height: auto;
    }
    .group > button {
        width: 110px;
        height: 40px;
        background: #DBE3F5;
        border-radius: 25px;
        font-size: 16px;
        color: #2C3B6C;
        display: flex;
        align-items: center;
        margin-left: 16px;
    }

    @media only screen and (max-width: 1000px) {
        .group-container {
            flex-direction: column;
            align-items: default;
            align-items: flex-end;
        }
        
    }
</style>