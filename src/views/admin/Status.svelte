<script>

</script>

<div class="admin-status">
    <h2>Åpne/steng løyper og heiser</h2>
    <div class="premade">
        <button>Helgekjøring</button>
        <button>Kveld</button>
        <button>Uke</button>
    </div>
    <div class="zones">
        <p>Soner</p>
        <div class="zone">
            <div class="dropdown">
                <h4>Vangslia</h4>
                <p class="small-info">5/5 heiser</p>
                <p class="small-info">11/11 løyper</p>
                <i class="fas fa-angle-down"></i>
            </div>
            <div class="zone-content"> <!-- Hidden by default -->
                <div class="lifts">
                    <h3>Heiser i Vangslia</h3>
                    <p>Åpne alle</p>
                    <p>Steng alle</p>
                </div>
                <div class="list">
                    <div class="list-item">
                        <p>A</p>
                        <p>Pomaen</p>
                        <p>Åpen</p>
                        <button>*</button>
                    </div>
                    <div class="list-item">
                        <p>A</p>
                        <p>Pomaen</p>
                        <p>Åpen</p>
                        <button>*</button>
                    </div>
                </div>
                <div class="slopes">
                    <h3>Løyper i Vangslia</h3>
                    <p>Åpne alle</p>
                    <p>Steng alle</p>
                    <div class="list">
                        <div class="list-item">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="zone">
            <div class="dropdown">
                <h4>Hovden</h4>
                <p class="small-info">5/5 heiser</p>
                <p class="small-info">11/11 løyper</p>
                <i class="fas fa-angle-down"></i>
            </div>
            <div class="zone-content"> <!-- Hidden by default -->

            </div>
        </div>
    </div>
</div>

<style>
    .premade > button {
        border: none;
        border-radius: 3px;
        background: #FFFFFF;
        padding: 8px;
        color: #2C3B6C;
    }
    .zone {
        background: #ffffff;
        padding: 8px;
        margin-bottom: 8px;
    }
    .dropdown {
        display: flex;
        justify-content: space-between;
    }
    .lifts, .slopes {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
    }
    .lifts, .slopes > p {
        text-decoration: underline;
    }
    .list {
        min-height: 64px;
        background: #F4F8FF;
    }
    .list:nth-child(even) {
        background: #FFFFFF;
    }
    .list-item {
        display: flex;
        justify-content: space-between;
    }
</style>