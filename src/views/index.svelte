<script>
  import Links from "./Links.svelte";
  import Safety from "./Safety.svelte";
  import Statuses from "./Statuses.svelte";
  import Weather from "../components/WeatherAndCameras.svelte";
  import { onMount } from "svelte";
  import config from "../helpers/config";
  import AddToHomeScreen from "a2hs.js";
  import PullToRefresh from "pulltorefreshjs";

  const createUUID = () => {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  };

  const getUUID = () => {
    const uuid = localStorage.getItem("uuid");
    if (uuid) {
      return uuid;
    }
    const newUUID = createUUID();
    localStorage.setItem("uuid", newUUID);
    return newUUID;
  };

  onMount(() => {
    PullToRefresh.init({
      mainElement: "body",
      instructionsPullToRefresh: "Dra ned for å oppdatere",
      instructionsReleaseToRefresh: "Slipp for å oppdatere",
      instructionsRefreshing: "Oppdaterer...",
      onRefresh() {
        window.location.reload();
      },
    });
    AddToHomeScreen({
      brandName: "Oppdal Skisenter",
      logoImage: `
        <svg width="50" height="50" viewport="0 0 50 50" preserveAspectRatio="xMinYMin meet">
          <image height="50" width="50" href="../../assets/512x512.png"></image>
        </svg>
      `,
      htmlContent:
        'Installer <strong>Løypetavla</strong> på iOS enheten din: Trykk på "del" og "Legg til på Hjem-skjermen"',
    });
    fetch(`${config.BASE_URL}/analytics`, {
      method: "POST",
      body: JSON.stringify({
        url: window.location.href,
        uuid: getUUID(),
        referrer: window.document.referrer,
      }),
    });
  });
</script>

<div>
  <Weather />
  <Statuses />
  <Safety />
  <Links />
</div>
