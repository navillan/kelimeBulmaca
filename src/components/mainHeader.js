

function MainHeader() {
  return (
    <header className="main-header">
      <h1>Kelime Bulmaca</h1>
      <p className="main-header-rules">
        *Her tahminde 5 harfli bir kelime girin.
        {"\n"}*Doğru harfler doğru yerde yeşil renkle gösterilir.
        {"\n"}*Doğru harfler yanlış yerde sarı renkle gösterilir.
        {"\n"}*Kullanılmayan her bir satır için fazladan 1 puan kazanırsınız.
        {"\n"}*7 tahminde kelimeyi bulmaya çalışın. İyi eğlenceler!
      </p>
    </header>
  );
}
export default MainHeader;