
<div class="admin-home">
    <h1>Admin</h1>
    <div class="button-container">
        <div class="button">
            <i class="fas fa-toggle-on"></i>
            <h2>Åpne/steng løyper og heiser</h2>
            <i class="fas fa-angle-right"></i>
        </div>
        <div class="button">
            <i class="fas fa-toggle-on"></i>
            <h2>Oppdater snøforhold</h2>
            <i class="fas fa-angle-right"></i>
        </div>
        <div class="button">
            <i class="fas fa-toggle-on"></i>
            <h2>Oppdater meldinger</h2>
            <i class="fas fa-angle-right"></i>
        </div>
        <div class="button">
            <i class="fas fa-toggle-on"></i>
            <h2>Skredvarsel på tavler</h2>
            <i class="fas fa-angle-right"></i>
        </div>
    </div>
    <div class="medium-button">
        <div class="button">
            <i class="fas fa-toggle-on"></i>
            <h2>Sett tavler på mørk</h2>
        </div>
    </div>
    <div class="small-button-container">
        <div class="small-button">
            Innstillinger
        </div>
        <div class="small-button">
            Logg av
        </div>
    </div>
</div>


<style>
    .admin-home {
        display: flex;
        flex-direction: column;
    }
    .admin-home > h1 {
        font-family: Work Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 35.8879px;
        line-height: 42px;
        color: #2C3B6C;
        margin: 8px;
    }
    .button-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .button {
        min-width: 38%;
        display: flex;
        justify-content: space-evenly;
        background: #FFFFFF;
        padding: 22px;
        margin: 8px;
        cursor: pointer;
        
    }
    .button > * {
        margin: 8px;
    }
    .button > i {
        font-size: 28px;
        color: #2C3B6C;
    }
    .button > h2 {
        font-family: Work Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 19.1402px;
        line-height: 22px;
        color: #2C3B6C;
    }
    .medium-button {
        max-width: 215px;
    }
    .small-button-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .small-button {
        font-family: Work Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14.3552px;
        line-height: 17px;
        text-decoration-line: underline;
        color: #2C3B6C;
        cursor: pointer;
    }
    @media only screen and (max-width: 600px) {
        .button {
            width: 100%;
        }
        .medium-button > .button {
            max-width: 180px;
            height: 40px;
        }
    }


</style>