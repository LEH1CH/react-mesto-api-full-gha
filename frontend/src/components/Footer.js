function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">&#64; {currentYear} Усманов Алексей</p>
    </footer>
  );
}

export default Footer;
