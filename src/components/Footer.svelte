<footer class="footer">
    <div class="contact-information">
        <h2>Kontakt oss</h2>
        <div>
            <p class="footer-big">Tlf: +47 72 40 44 80</p>
            <p class="footer-small">E-post: post@oppdalskisenter.no</p>
        </div>
        <div>
            <p class="footer-big">Gondolbane, Hovden</p>
            <p class="footer-small">Gamle Kongeveg 53, 7340 Oppdal</p>
        </div>
        <div>
            <p class="footer-big">Servicesenter Vangslia</p>
            <p class="footer-small">Kjerkvegen 112, 7340 Oppdal</p>
        </div>
        <div>
            <a target="_blank" href="https://facebook.com/oppdal/"><i class="fab fa-facebook"></i></a>
            <a target="_blank" href="https://instagram.com/oppdal_skisenter/"><i class="fab fa-instagram"></i></a>
            <p class="footer-small">Oppdal skisenter &copy; 2021</p>
        </div>
    </div>
    <div class="map">
        <div id="map"></div>
    </div>
</footer>


<style>
    .footer {
        margin-top: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #4C546D;
        color: #F4F8FF;
        min-height: 730px;
    }
    .contact-information > h2, div, div > p, div > a{
        color: #F4F8FF;
    }
    .contact-information {
        width: 100%;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
    }

    .footer-big {
        font-family: Work Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
    }
    .footer-small {
        font-family: Work Sans;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
    }
    .contact-information > div > a > i {
        font-size: 36px;
    }
    @media only screen and (max-width: 600px) {
        .footer {
            flex-direction: column;
            text-align: center;
        }
  }
</style>