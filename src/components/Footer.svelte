<footer class="footer">
    <div class="contact-information">
        <div class="oppdal-title">Kontakt oss</div>
        <div>Tlf: +47 72 40 44 80</div>
        <div>E-post: post@oppdalskisenter.no</div>
    </div>
    <div class="footer-icons">
        <a target="_blank" href="https://facebook.com/oppdal/"><i class="fab fa-facebook"></i></a>
        <a target="_blank" href="https://instagram.com/oppdal_skisenter/"><i class="fab fa-instagram"></i></a>
        <div>Oppdal skisenter &copy; 2021</div>
    </div>
</footer>


<style>
    .footer {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        background: #004a7c;
        color: #fff;
        padding: 20px;
    }
    .footer-icons > a {
        font-size: 50px;
        color: #fff;
        margin-left: 15px;
    }
    .footer-icons {
        text-align: center;
    }
    .contact-information > div{
        padding: 0 0 5px 0;
    }
    @media only screen and (max-width: 600px) {
        .footer {
            flex-direction: column;
            text-align: center;
        }
        .footer > div {
            margin-bottom: 20px;
        }
  }
</style>