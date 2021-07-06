<footer class="footer">
    <div class="contact-information">
        <div class="oppdal-title footer-title">Kontakt oss:</div>
        <div class="information contact-info">Tlf: +47 72 40 44 80</div>
        <div class="information contact-info">E-post: post@oppdalskisenter.no</div>
    </div>
    <div class="footer-icons">
        <a target="_blank" href="https://facebook.com/oppdal/"><i class="fab fa-facebook"></i></a>
        <a target="_blank" href="https://instagram.com/oppdal_skisenter/"><i class="fab fa-instagram"></i></a>
        <div class="information copyright">Oppdal skisenter &copy; 2021</div>
    </div>
</footer>


<style>
    .footer {
        margin-top: auto;
        display: flex;
        justify-content: space-between;
        background: #004a7c;
        color: #fff;
        padding: 1rem 3rem;
    }
    .footer-title {
        padding-bottom: 0.5rem;
    }
    .footer-icons > a {
        font-size: 50px;
        color: #fff;
        margin-left: 15px;
    }
    .contact-info {
        color: #fff;
        padding-left: 1rem;
    }
    .copyright {
        color: #fff;
        padding-top: 0.5rem;
    }

    .footer-icons {
        text-align: center;
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