<script>
    import { navigateTo } from 'svelte-router-spa';
    import { toast } from '../../stores/Toast'
    const logout = () => {
        localStorage.removeItem('user');
        navigateTo(`/login`)
    }
    const panoramaSignTurnOff = async () => {
        try {
            const res = await OFetch(
                `${config.BASE_URL}/admin/panoramasign/clear-relays`,
                "PATCH"
            )
            toast.setToast('Tavle slått av', 'success')
        } catch(err) {
            console.warn(err)
            toast.setToast('Noe gikk galt', 'error')
        }
    }
</script>


<div class="admin-home">
    <h1>Admin</h1>
    <div class="button-container">
        <div class="home-button" on:click="{() => navigateTo("/admin/status")}">
            <div class="home-button-left">
                <img src="../../../assets/toggle.svg" class="home-icons" alt="toggle-ikon">
                <div class="big-paragraph">Åpne/steng løyper og heiser</div>
            </div>
            <i class="fas fa-angle-right"></i>
        </div>
        <div class="home-button" on:click="{() => navigateTo("/admin/snoforhold")}">
            <div class="home-button-left">
                <img src="../../../assets/snowflake.svg" class="home-icons" alt="snowflake-ikon">
                <div class="big-paragraph">Oppdater snøforhold</div>
            </div>
            <i class="fas fa-angle-right"></i>
        </div>
        <div class="home-button" on:click="{() => navigateTo("/admin/meldinger")}">
            <div class="home-button-left">
                <img src="../../../assets/message.svg" class="home-icons" alt="message-ikon">
                <div class="big-paragraph">Oppdater meldinger</div>
            </div>
            <i class="fas fa-angle-right"></i>
        </div>
        <div class="home-button" on:click="{() => navigateTo("/admin/skredvarsel")}">
            <div class="home-button-left">
                <img src="../../../assets/table.svg" class="home-icons" alt="table-ikon">
                <div class="big-paragraph">Skredvarsel på tavler</div>
            </div>
            <i class="fas fa-angle-right"></i>
        </div>
    </div>

    <div class="medium-button">
        <img src="../../../assets/onoff.svg" alt="toggle-ikon">
        <div class="small-info" on:click="{panoramaSignTurnOff}">Sett tavler på mørk</div>
    </div>
    <div class="small-button-container">
        <div class="small-button" on:click="{() => navigateTo('/admin/instillinger')}">
            Innstillinger
        </div>
        <div class="small-button" on:click="{logout}">
            Logg av
        </div>
    </div>
</div>


<style>
    .admin-home {
        display: flex;
        flex-direction: column;
        padding: 4rem 1rem 1rem 1rem;
    }
    .admin-home > h1 {
        font-family: Work Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 35.8879px;
        line-height: 42px;
        color: #2C3B6C;
        margin: 8px 0;
    }
    .button-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        margin: 1rem 0 4rem 0;
    }
    .home-button {
        min-width: 400px;
        min-height: 70px;
        display: flex;
        justify-content: space-between;
        background: #FFFFFF;
        padding: 22px;
        margin: 8px 20px 8px 0;
        cursor: pointer;
        align-items: center;
    }
    .home-button-left {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .home-button-left > img  {
        padding-right: 1rem;
    }
    .home-button > * {
        margin: 8px;
    }
    .home-icons {
        width: 50px;
        height: auto;
    }
    .medium-button {
        max-height: 50px;
        max-width: 200px;
        display: flex;
        justify-content: flex-start;
        background: #FFFFFF;
        padding: 22px;
        margin-bottom: 4rem;
        cursor: pointer;
        align-items: center;
    }
    .medium-button > img {
        padding-right: 1rem;
    }
    .small-button-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 4rem;
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
    @media only screen and (max-width: 800px) {
        .home-button {
            min-width: auto;
            width: 100%;
            margin: 0.5rem 0;
            padding: 1rem;
        }
    }
</style>