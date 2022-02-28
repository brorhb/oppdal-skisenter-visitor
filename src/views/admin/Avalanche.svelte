<script>
import { toast } from '../../stores/Toast'
import OFetch from '../../helpers/fetch';
import config from '../../helpers/config';

let checked = [false, false, false, false]
const check = (position) => {
    checked.forEach((c, i) => {
        if(!(i == position)) checked[i] = false;
    })
    checked[position] = !checked[position];
}
const updateAvalanche = async () => {
    let numberOfChecked = 0;
    let index = 0;
    checked.forEach((c,i) => {
        if(c) {
            numberOfChecked++;
            index = i;
        }
    });
    if(numberOfChecked === 1 ){
        try {
            const res = await OFetch(
                `${config.BASE_URL}/admin/panoramasign/avalanche`,
                "PATCH", { color: index }
            )
            console.log(res);
            // TODO: handle response - vis hvilke tavler som ble og ikke ble oppdatert
        } catch(err) {
            console.warn(err)
            toast.setToast("Kunne ikke oppdatere løypetavler", 'error')
        }
    } else {
        toast.setToast("Et alternativ må velges", 'error');
    }
}
</script>

<div class="admin-avalanche">
    <h2>Skredvarsel på tavler</h2>
    <!--<p>Nullstilles hver natt</p>-->
    <div class="settings-container">
        <div class="avalanche-setting" on:click="{() => check(0)}">
            <div class="wrapper">
                <input type="checkbox"  bind:checked="{checked[0]}"/>
                <h4>Grønn (trygt)</h4>
            </div>
            <div class="avalanche-color green"></div>
        </div>
        <div class="avalanche-setting" on:click="{() => check(1)}">
            <div class="wrapper">
                <input type="checkbox" bind:checked="{checked[1]}"/>
                <h4>Gul (litt farlig)</h4>
            </div>
            <div class="avalanche-color yellow"></div>
        </div>
        <div class="avalanche-setting" on:click="{() => check(2)}">
            <div class="wrapper">
                <input type="checkbox" bind:checked="{checked[2]}"/>
                <h4>Rødt (utrygt)</h4>
            </div>
            <div class="avalanche-color red"></div>
        </div>
        <div class="avalanche-setting" on:click="{() => check(3)}">
            <div class="wrapper">
                <input type="checkbox" bind:checked="{checked[3]}"/>
                <h4>Slå av</h4>
            </div>
            <div class="avalanche-color gray"></div>
        </div>
    </div>
    <button on:click="{updateAvalanche}">Oppdater</button>
</div>

<style>
    .admin-avalanche {
        display: flex;
        flex-direction: column;
        margin: 2rem 0 0 0;
    }
    .settings-container {
        margin: 2rem 0 2rem 0;
    }
    .avalanche-setting {
        display: flex;
        justify-content: space-between;
        border: 2px solid #2C3B6C;
        border-radius: 8px;
        align-items: center;
        padding: 1rem;
        margin: 1rem 0 1rem 0;
        cursor: pointer;
    }
    .avalanche-setting:hover {
        background: rgb(216, 216, 216);
    }
    .avalanche-setting > .wrapper {
        display: flex;
    }
    .wrapper > input{
        margin: 0 1rem 0 0;
        cursor: pointer;
    }
    .avalanche-color {
        width: 87px;
        height: 25px;
        border-radius: 2px;

    }
    .green {
        background: #2FC93E;
    }
    .yellow {
        background: #FFD15B;
    }
    .red {
        background: #FF3B3B;
    }
    .gray {
        background: #A0A0A0;
    }
    .admin-avalanche > button {
        max-width: 94px;
        min-height: 38px;
        background: #E48D42;
        border-radius: 25px;
        color: #FFFFFF;
        border: none;
    }
    @media only screen and (max-width: 800px) {
        .admin-avalanche {
            padding: 1rem;
        }
    }
</style>